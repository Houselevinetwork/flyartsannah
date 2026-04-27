import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// In-memory token cache
let cachedToken: string | null = null;
let tokenExpiry = 0;

interface MulticityLeg {
  origin: string;
  destination: string;
  date: string;
}

interface MulticityRequest {
  legs: MulticityLeg[];
  passengers: {
    adults: number;
    children?: number;
    infants?: number;
  };
  currency?: string;
  travelClass?: string;
}

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

async function searchMulticityFlights(request: MulticityRequest): Promise<any> {
  const token = await getAmadeusToken();
  
  // For multicity, we'll search each leg individually and combine results
  // This is a simplified approach - in production, you might want to use
  // Amadeus Flight Offers Search POST API for proper multi-city searches
  console.log('Searching multicity flights for', request.legs.length, 'legs');
  
  const legResults = [];
  
  for (let i = 0; i < request.legs.length; i++) {
    const leg = request.legs[i];
    console.log(`Searching leg ${i + 1}: ${leg.origin} -> ${leg.destination} on ${leg.date}`);
    
    const url = new URL('https://test.api.amadeus.com/v2/shopping/flight-offers');
    url.searchParams.set('originLocationCode', leg.origin);
    url.searchParams.set('destinationLocationCode', leg.destination);
    url.searchParams.set('departureDate', leg.date);
    url.searchParams.set('adults', request.passengers.adults.toString());
    url.searchParams.set('max', '50'); // Limit results per leg
    
    if (request.passengers.children) {
      url.searchParams.set('children', request.passengers.children.toString());
    }
    if (request.passengers.infants) {
      url.searchParams.set('infants', request.passengers.infants.toString());
    }
    if (request.travelClass) {
      url.searchParams.set('travelClass', request.travelClass);
    }
    if (request.currency) {
      url.searchParams.set('currencyCode', request.currency);
    }

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to search leg ${i + 1}:`, response.status, errorText);
      throw new Error(`Failed to search leg ${i + 1}: ${response.status}`);
    }

    const data = await response.json();
    legResults.push({
      legNumber: i + 1,
      origin: leg.origin,
      destination: leg.destination,
      departureDate: leg.date,
      offers: data.data || [],
      meta: data.meta,
      dictionaries: data.dictionaries
    });
    
    // Add a small delay between requests to be respectful to the API
    if (i < request.legs.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  console.log('Multicity search completed, found offers for', legResults.length, 'legs');
  
  return {
    data: legResults,
    searchType: 'multicity',
    totalLegs: request.legs.length,
    passengers: request.passengers
  };
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed. Use POST.' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    const body = await req.json();
    const { legs, passengers, currency = 'USD', travelClass = 'ECONOMY' } = body;

    // Validate request
    if (!legs || !Array.isArray(legs) || legs.length < 2) {
      return new Response(
        JSON.stringify({ error: 'At least 2 legs are required for multicity search' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    if (!passengers || !passengers.adults || passengers.adults < 1) {
      return new Response(
        JSON.stringify({ error: 'At least 1 adult passenger is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate each leg
    for (let i = 0; i < legs.length; i++) {
      const leg = legs[i];
      if (!leg.origin || !leg.destination || !leg.date) {
        return new Response(
          JSON.stringify({ error: `Leg ${i + 1} is missing required fields: origin, destination, date` }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
    }

    console.log('Processing multicity search request:', { 
      legsCount: legs.length, 
      passengers 
    });

    const request: MulticityRequest = {
      legs,
      passengers,
      currency,
      travelClass
    };

    const results = await searchMulticityFlights(request);

    return new Response(
      JSON.stringify(results),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in amadeus-multicity function:', error);
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