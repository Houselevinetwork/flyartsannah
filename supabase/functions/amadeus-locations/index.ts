import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// In-memory token cache
let cachedToken: string | null = null;
let tokenExpiry = 0;

interface AmadeusLocation {
  iataCode?: string;
  name: string;
  address?: {
    cityName?: string;
    countryName?: string;
  };
  subType: string;
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

async function searchLocations(term: string): Promise<any[]> {
  const token = await getAmadeusToken();
  
  const url = new URL('https://test.api.amadeus.com/v1/reference-data/locations');
  url.searchParams.set('subType', 'AIRPORT,CITY');
  url.searchParams.set('keyword', term);
  url.searchParams.set('page[limit]', '10');

  console.log('Searching locations with URL:', url.toString());

  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to search locations:', response.status, errorText);
    throw new Error(`Failed to search locations: ${response.status}`);
  }

  const data = await response.json();
  console.log('Amadeus response:', JSON.stringify(data, null, 2));

  // Transform to simplified format
  return (data.data || []).map((location: AmadeusLocation) => ({
    iataCode: location.iataCode || '',
    name: location.name,
    cityName: location.address?.cityName || '',
    countryName: location.address?.countryName || '',
    type: location.subType,
  }));
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const term = url.searchParams.get('term');

    if (!term || term.length < 2) {
      return new Response(
        JSON.stringify({ error: 'Search term must be at least 2 characters' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Searching for locations with term:', term);
    const locations = await searchLocations(term);

    return new Response(
      JSON.stringify({ data: locations }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in amadeus-locations function:', error);
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