import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// In-memory token cache
let cachedToken: string | null = null;
let tokenExpiry = 0;

async function getAmadeusToken(): Promise<string> {
  console.log('Getting Amadeus token, current time:', Date.now(), 'expiry:', tokenExpiry);
  
  if (cachedToken && Date.now() < tokenExpiry) {
    console.log('Using cached token');
    return cachedToken;
  }

  console.log('Fetching new token from Amadeus');
  
  const clientId = Deno.env.get('AMADEUS_CLIENT_ID');
  const clientSecret = Deno.env.get('AMADEUS_CLIENT_SECRET');
  
  if (!clientId || !clientSecret) {
    throw new Error('Amadeus credentials not configured');
  }

  const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to get Amadeus token:', response.status, errorText);
    throw new Error(`Failed to authenticate with Amadeus: ${response.status}`);
  }

  const data = await response.json();
  cachedToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000; // Refresh 60s before expiry
  
  console.log('Got new token, expires at:', new Date(tokenExpiry));
  return cachedToken!;
}

async function searchFlightOffers(params: any): Promise<any> {
  const token = await getAmadeusToken();
  
  const url = new URL('https://test.api.amadeus.com/v2/shopping/flight-offers');
  
  // Add required parameters
  url.searchParams.set('originLocationCode', params.origin);
  url.searchParams.set('destinationLocationCode', params.destination);
  url.searchParams.set('departureDate', params.departureDate);
  url.searchParams.set('adults', params.adults.toString());
  url.searchParams.set('max', '250');
  
  // Add optional parameters
  if (params.returnDate && params.tripType === 'roundtrip') {
    url.searchParams.set('returnDate', params.returnDate);
  }
  if (params.children) {
    url.searchParams.set('children', params.children.toString());
  }
  if (params.infants) {
    url.searchParams.set('infants', params.infants.toString());
  }
  if (params.travelClass) {
    url.searchParams.set('travelClass', params.travelClass);
  }
  if (params.currencyCode) {
    url.searchParams.set('currencyCode', params.currencyCode);
  }

  console.log('Searching flight offers with URL:', url.toString());

  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to search flight offers:', response.status, errorText);
    throw new Error(`Failed to search flight offers: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  console.log('Flight offers found:', data.data?.length || 0);
  
  return data;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    
    // Extract query parameters
    const tripType = url.searchParams.get('tripType');
    const origin = url.searchParams.get('origin');
    const destination = url.searchParams.get('destination');
    const departureDate = url.searchParams.get('departureDate');
    const returnDate = url.searchParams.get('returnDate');
    const adults = parseInt(url.searchParams.get('adults') || '1');
    const children = parseInt(url.searchParams.get('children') || '0');
    const infants = parseInt(url.searchParams.get('infants') || '0');
    const travelClass = url.searchParams.get('travelClass') || 'ECONOMY';
    const currencyCode = url.searchParams.get('currencyCode') || 'USD';

    // Validate required parameters
    if (!tripType || !origin || !destination || !departureDate) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required parameters: tripType, origin, destination, departureDate' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    if (!['oneway', 'roundtrip'].includes(tripType)) {
      return new Response(
        JSON.stringify({ error: 'tripType must be oneway or roundtrip' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    if (tripType === 'roundtrip' && !returnDate) {
      return new Response(
        JSON.stringify({ error: 'returnDate is required for roundtrip searches' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Searching flight offers with params:', {
      tripType, origin, destination, departureDate, returnDate, adults, children, infants
    });

    const searchParams = {
      tripType,
      origin,
      destination,
      departureDate,
      returnDate,
      adults,
      children,
      infants,
      travelClass,
      currencyCode
    };

    const results = await searchFlightOffers(searchParams);

    return new Response(
      JSON.stringify(results),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in amadeus-flight-offers function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    const errorDetails = error instanceof Error ? error.toString() : String(error);
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: errorDetails
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});