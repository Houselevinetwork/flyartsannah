import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SaveSearchRequest {
  tripType: 'oneway' | 'roundtrip' | 'multicity';
  originCode: string;
  destinationCode?: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  infants?: number;
  travelClass?: string;
  currencyCode?: string;
  resultsCount?: number;
  searchMetadata?: any;
  legs?: Array<{
    origin: string;
    destination: string;
    date: string;
  }>;
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
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    let userId: string | null = null;

    // If authorization header is present, try to get the user
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (!error && user) {
        userId = user.id;
      }
    }

    const body: SaveSearchRequest = await req.json();
    
    // Validate required fields
    if (!body.tripType || !body.originCode || !body.departureDate) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: tripType, originCode, departureDate' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Saving search for user:', userId, 'tripType:', body.tripType);

    // Save the flight search
    const { data: searchData, error: searchError } = await supabase
      .from('flight_searches')
      .insert({
        user_id: userId,
        trip_type: body.tripType,
        origin_code: body.originCode,
        destination_code: body.destinationCode,
        departure_date: body.departureDate,
        return_date: body.returnDate,
        adults: body.adults || 1,
        children: body.children || 0,
        infants: body.infants || 0,
        travel_class: body.travelClass || 'ECONOMY',
        currency_code: body.currencyCode || 'USD',
        results_count: body.resultsCount || 0,
        search_metadata: body.searchMetadata
      })
      .select()
      .single();

    if (searchError) {
      console.error('Error saving flight search:', searchError);
      return new Response(
        JSON.stringify({ error: 'Failed to save search', details: searchError.message }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // If it's a multicity search, save the legs
    if (body.tripType === 'multicity' && body.legs && body.legs.length > 0) {
      const legs = body.legs.map((leg, index) => ({
        search_id: searchData.id,
        leg_number: index + 1,
        origin_code: leg.origin,
        destination_code: leg.destination,
        departure_date: leg.date
      }));

      const { error: legsError } = await supabase
        .from('multicity_legs')
        .insert(legs);

      if (legsError) {
        console.error('Error saving multicity legs:', legsError);
        // Don't fail the whole request, just log the error
      }
    }

    console.log('Search saved successfully with ID:', searchData.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        searchId: searchData.id,
        data: searchData
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in save-search function:', error);
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