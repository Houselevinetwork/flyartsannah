-- Create flight searches table to store search metadata
CREATE TABLE public.flight_searches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  trip_type TEXT NOT NULL CHECK (trip_type IN ('oneway', 'roundtrip', 'multicity')),
  origin_code TEXT NOT NULL,
  destination_code TEXT,
  departure_date DATE NOT NULL,
  return_date DATE,
  adults INTEGER NOT NULL DEFAULT 1,
  children INTEGER DEFAULT 0,
  infants INTEGER DEFAULT 0,
  travel_class TEXT DEFAULT 'ECONOMY',
  currency_code TEXT DEFAULT 'USD',
  results_count INTEGER DEFAULT 0,
  search_metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create multicity legs table for complex itineraries
CREATE TABLE public.multicity_legs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  search_id UUID NOT NULL REFERENCES public.flight_searches(id) ON DELETE CASCADE,
  leg_number INTEGER NOT NULL,
  origin_code TEXT NOT NULL,
  destination_code TEXT NOT NULL,
  departure_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create saved flight offers table
CREATE TABLE public.saved_flight_offers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  search_id UUID REFERENCES public.flight_searches(id) ON DELETE CASCADE,
  offer_data JSONB NOT NULL,
  price_amount DECIMAL(10,2),
  price_currency TEXT DEFAULT 'USD',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.flight_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.multicity_legs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_flight_offers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for flight_searches
CREATE POLICY "Users can view their own searches" 
ON public.flight_searches 
FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can create searches" 
ON public.flight_searches 
FOR INSERT 
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own searches" 
ON public.flight_searches 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for multicity_legs
CREATE POLICY "Users can view multicity legs for their searches" 
ON public.multicity_legs 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.flight_searches 
  WHERE id = multicity_legs.search_id 
  AND (auth.uid() = user_id OR user_id IS NULL)
));

CREATE POLICY "Users can create multicity legs for their searches" 
ON public.multicity_legs 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.flight_searches 
  WHERE id = multicity_legs.search_id 
  AND (auth.uid() = user_id OR user_id IS NULL)
));

-- Create RLS policies for saved_flight_offers
CREATE POLICY "Users can view their own saved offers" 
ON public.saved_flight_offers 
FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can create saved offers" 
ON public.saved_flight_offers 
FOR INSERT 
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can delete their own saved offers" 
ON public.saved_flight_offers 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_flight_searches_updated_at
  BEFORE UPDATE ON public.flight_searches
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_flight_searches_user_id ON public.flight_searches(user_id);
CREATE INDEX idx_flight_searches_created_at ON public.flight_searches(created_at DESC);
CREATE INDEX idx_multicity_legs_search_id ON public.multicity_legs(search_id);
CREATE INDEX idx_saved_flight_offers_user_id ON public.saved_flight_offers(user_id);
CREATE INDEX idx_saved_flight_offers_search_id ON public.saved_flight_offers(search_id);