// src/lib/amadeus-api.ts
import { supabase } from "@/integrations/supabase/client";
import { ReactNode } from "react";

/* 🌍 ------------------------------
   LOCATION TYPES
----------------------------------*/
export interface Location {
  iataCode: string;
  name: string;
  cityName: string;
  countryName: string;
  type: string;
}

/* ✈️ ------------------------------
   FLIGHT SEARCH PARAMS
----------------------------------*/
export interface FlightSearchParams {
  tripType?: "oneway" | "roundtrip" | "multicity";
  origin: string;
  destination?: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  infants?: number;
  travelClass?: string;
  currencyCode?: string;

  // Compatibility
  originLocationCode?: string;
  destinationLocationCode?: string;
}

/* 🧩 ------------------------------
   MULTICITY SEARCH
----------------------------------*/
export interface MulticityLeg {
  origin: string;
  destination: string;
  date: string;
}

export interface MulticitySearchParams {
  legs: MulticityLeg[];
  passengers: {
    adults: number;
    children?: number;
    infants?: number;
  };
  currency?: string;
  travelClass?: string;
}

/* 💾 ------------------------------
   SAVE SEARCH
----------------------------------*/
export interface SaveSearchParams extends FlightSearchParams {
  resultsCount?: number;
  searchMetadata?: any;
  legs?: MulticityLeg[];
}

/* 🛫 ------------------------------
   FLIGHT OFFER
----------------------------------*/
export interface FlightOffer {
  id: string;
  price: {
    total: string;
    currency: string;
  };
  itineraries: any[];
  validatingAirlineCodes?: string[];
  numberOfBookableSeats?: number;
}

/* 🔍 ------------------------------
   LOCATION SEARCH
----------------------------------*/
export async function searchLocations(term: string, p0?: string): Promise<Location[]> {
  try {
    const url = new URL(
      "https://panxglbqfnovnxqohlcb.supabase.co/functions/v1/amadeus-locations"
    );
    url.searchParams.set("term", term);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        (errorData as any).error || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    return data?.data || [];
  } catch (err: unknown) {
    console.error("❌ Error in searchLocations:", err);
    throw new Error(
      err instanceof Error ? err.message : "Unknown error in searchLocations"
    );
  }
}

/* 🛩️ ------------------------------
   SEARCH FLIGHT OFFERS
----------------------------------*/
export async function searchFlightOffers(
  params: FlightSearchParams
): Promise<FlightOffer[]> {
  try {
    const url = new URL(
      "https://panxglbqfnovnxqohlcb.supabase.co/functions/v1/amadeus-flight-offers"
    );

    url.searchParams.set("tripType", params.tripType || "oneway");
    url.searchParams.set(
      "origin",
      params.originLocationCode || params.origin || ""
    );
    url.searchParams.set(
      "destination",
      params.destinationLocationCode || params.destination || ""
    );
    url.searchParams.set("departureDate", params.departureDate);
    url.searchParams.set("adults", params.adults.toString());

    if (params.returnDate && params.tripType === "roundtrip")
      url.searchParams.set("returnDate", params.returnDate);
    if (params.children)
      url.searchParams.set("children", params.children.toString());
    if (params.infants)
      url.searchParams.set("infants", params.infants.toString());
    if (params.travelClass)
      url.searchParams.set("travelClass", params.travelClass);
    if (params.currencyCode)
      url.searchParams.set("currencyCode", params.currencyCode);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        (errorData as any).error || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    return data?.data || [];
  } catch (err: unknown) {
    console.error("❌ Error in searchFlightOffers:", err);
    throw new Error(
      err instanceof Error ? err.message : "Unknown error in searchFlightOffers"
    );
  }
}

/* 🪶 Alias for compatibility */
export const searchFlights = searchFlightOffers;

/* 🏨 ------------------------------
   HOTEL SEARCH
----------------------------------*/
export interface HotelOffer {
  hotel: {
    hotelId: string;
    name: string;
    cityCode: string;
    address?: string;
  };
  offers: Array<{
    id: string;
    price: {
      total: string;
      currency: string;
    };
    room: {
      type: string;
      description?: { text?: string };
    };
    boardType?: string;
    guests: { adults: number; children?: number };
  }>;
}

export async function searchHotels(params: {
  cityCode: string;
  checkInDate: string;
  checkOutDate: string;
  adults?: number;
  roomQuantity?: number;
  currency?: string;
  max?: number;
}): Promise<HotelOffer[]> {
  try {
    const url = new URL(
      "https://panxglbqfnovnxqohlcb.supabase.co/functions/v1/amadeus-hotel-search"
    );

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) url.searchParams.set(key, value.toString());
    });

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        (errorData as any).error || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    return data?.data || [];
  } catch (err: unknown) {
    console.error("❌ Error in searchHotels:", err);
    throw new Error(
      err instanceof Error ? err.message : "Unknown error in searchHotels"
    );
  }
}

/* 🌐 ------------------------------
   MULTICITY FLIGHTS
----------------------------------*/
export async function searchMulticityFlights(
  params: MulticitySearchParams
): Promise<any> {
  try {
    const { data, error } = await supabase.functions.invoke("amadeus-multicity", {
      body: params,
    });

    if (error) throw new Error(error.message || "Failed to search multicity");

    return data;
  } catch (err: unknown) {
    console.error("❌ Error in searchMulticityFlights:", err);
    throw new Error(
      err instanceof Error
        ? err.message
        : "Unknown error in searchMulticityFlights"
    );
  }
}

/* 🏢 ------------------------------
   AIRLINE NAME LOOKUP
----------------------------------*/
export async function searchAirline(code: string): Promise<string> {
  try {
    const url = new URL(
      "https://panxglbqfnovnxqohlcb.supabase.co/functions/v1/amadeus-airlines"
    );
    url.searchParams.set("code", code);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        (errorData as any).error || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    return data?.data?.[0]?.name || code;
  } catch (err: unknown) {
    console.error("❌ Error in searchAirline:", err);
    return code;
  }
}

/* 💾 ------------------------------
   SAVE SEARCH HISTORY
----------------------------------*/
export async function saveSearch(params: SaveSearchParams): Promise<any> {
  try {
    const { data, error } = await supabase.functions.invoke("save-search", {
      body: params,
    });

    if (error)
      throw new Error(error.message || "Failed to save search results");

    return data;
  } catch (err: unknown) {
    console.error("❌ Error in saveSearch:", err);
    throw new Error(
      err instanceof Error ? err.message : "Unknown error in saveSearch"
    );
  }
}

/* 🧮 ------------------------------
   UTILITY HELPERS
----------------------------------*/
export function formatLocation(location: Location): string {
  return location.iataCode
    ? `${location.name} (${location.iataCode})`
    : location.name;
}

export function formatLocationShort(location: Location): string {
  return location.iataCode || location.name;
}

export function formatDateForAPI(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function formatPrice(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}
