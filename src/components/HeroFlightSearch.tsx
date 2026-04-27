import React, { useEffect, useState } from "react";
import {
  Plane,
  Search,
  Hotel,
  Package,
  ArrowRight,
  ChevronDown,
  Calendar,
  Users,
  X,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { type Location, searchLocations } from "@/lib/amadeus-api";
import { LuxuryLoadingAnimation } from "./LuxuryLoadingAnimation";
import { LuxuryCalendar } from "./LuxuryCalendar";
import { DestinationModal } from "./DestinationModal";

// Load Poppins
const link = document.createElement("link");
link.href =
  "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

type MultiCityLeg = {
  origin?: Location | null;
  destination?: Location | null;
  departureDate?: Date | null;
};

export const ReservationCard = ({
  onSearchActive,
}: {
  onSearchActive?: (active: boolean) => void;
}) => {
  const navigate = useNavigate();

  const [serviceType, setServiceType] = useState<"flight" | "hotel" | "package">("flight");
  const [tripType, setTripType] = useState<"oneway" | "roundtrip" | "multicity">("roundtrip");
  const [showTripMenu, setShowTripMenu] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showTravellerModal, setShowTravellerModal] = useState(false);

  const [originQuery, setOriginQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");
  const [originResults, setOriginResults] = useState<Location[]>([]);
  const [destinationResults, setDestinationResults] = useState<Location[]>([]);
  const [selectedOrigin, setSelectedOrigin] = useState<Location | null>({
    iataCode: "NBO",
    name: "Jomo Kenyatta Airport",
    cityName: "Nairobi",
    countryName: "Kenya",
    type: "AIRPORT",
  });
  const [selectedDestination, setSelectedDestination] = useState<Location | null>(null);
  const [showOriginSearch, setShowOriginSearch] = useState(false);
  const [showDestinationSearch, setShowDestinationSearch] = useState(false);
  const [isLoadingOrigin, setIsLoadingOrigin] = useState(false);
  const [isLoadingDestination, setIsLoadingDestination] = useState(false);
  const [isLoadingHotel, setIsLoadingHotel] = useState(false);

  const [cabinClass, setCabinClass] = useState<"economy" | "business" | "first">("economy");
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [showLuxuryCalendar, setShowLuxuryCalendar] = useState(false);
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);

  // Hotel search state
  const [hotelDestinationQuery, setHotelDestinationQuery] = useState("");
  const [hotelDestinationResults, setHotelDestinationResults] = useState<Location[]>([]);
  const [selectedHotelDestination, setSelectedHotelDestination] = useState<Location | null>(null);
  const [showHotelDestinationSearch, setShowHotelDestinationSearch] = useState(false);
  const [hotelCheckInDate, setHotelCheckInDate] = useState<string | null>(null);
  const [hotelCheckOutDate, setHotelCheckOutDate] = useState<string | null>(null);
  const [hotelGuests, setHotelGuests] = useState<number>(1);
  const [showHotelDateModal, setShowHotelDateModal] = useState(false);

  const [multiCityLegs, setMultiCityLegs] = useState<MultiCityLeg[]>([
    { origin: null, destination: null, departureDate: null },
    { origin: null, destination: null, departureDate: null },
  ]);

  const addLeg = () => {
    setMultiCityLegs([...multiCityLegs, { origin: null, destination: null, departureDate: null }]);
  };

  const removeLeg = (index: number) => {
    if (multiCityLegs.length > 2) {
      setMultiCityLegs(multiCityLegs.filter((_, i) => i !== index));
    }
  };

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      if (!originQuery || originQuery.trim().length < 2) {
        setOriginResults([]);
        setIsLoadingOrigin(false);
        return;
      }
      setIsLoadingOrigin(true);
      try {
        const res = await searchLocations(originQuery.trim());
        if (mounted) {
          setOriginResults(res);
          setIsLoadingOrigin(false);
        }
      } catch (e) {
        console.error("Origin search error", e);
        if (mounted) setIsLoadingOrigin(false);
      }
    };
    const t = setTimeout(run, 250);
    return () => {
      mounted = false;
      clearTimeout(t);
    };
  }, [originQuery]);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      if (!destinationQuery || destinationQuery.trim().length < 2) {
        setDestinationResults([]);
        setIsLoadingDestination(false);
        return;
      }
      setIsLoadingDestination(true);
      try {
        const res = await searchLocations(destinationQuery.trim());
        if (mounted) {
          setDestinationResults(res);
          setIsLoadingDestination(false);
        }
      } catch (e) {
        console.error("Destination search error", e);
        if (mounted) setIsLoadingDestination(false);
      }
    };
    const t = setTimeout(run, 250);
    return () => {
      mounted = false;
      clearTimeout(t);
    };
  }, [destinationQuery]);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      if (!hotelDestinationQuery || hotelDestinationQuery.trim().length < 2) {
        setHotelDestinationResults([]);
        setIsLoadingHotel(false);
        return;
      }
      setIsLoadingHotel(true);
      try {
        const res = await searchLocations(hotelDestinationQuery.trim(), "CITY");
        if (mounted) {
          setHotelDestinationResults(res);
          setIsLoadingHotel(false);
        }
      } catch (e) {
        console.error("Hotel destination search error", e);
        if (mounted) setIsLoadingHotel(false);
      }
    };
    const t = setTimeout(run, 250);
    return () => {
      mounted = false;
      clearTimeout(t);
    };
  }, [hotelDestinationQuery]);

  const handleServiceTypeChange = (type: "flight" | "hotel" | "package") => {
    setServiceType(type);
    if (type === "hotel" || type === "package") {
      onSearchActive?.(true);
    } else {
      onSearchActive?.(false);
    }
  };

  const increment = (setter: (v: number) => void, current: number) => setter(current + 1);
  const decrement = (setter: (v: number) => void, current: number) => setter(Math.max(0, current - 1));

  const handleSearch = () => {
    if (serviceType === "hotel") {
      if (!selectedHotelDestination || !hotelCheckInDate || !hotelCheckOutDate) {
        console.warn("Please select destination and dates for hotel search");
        return;
      }

      const params = new URLSearchParams({
        cityCode: selectedHotelDestination.iataCode,
        cityName: selectedHotelDestination.cityName,
        checkInDate: hotelCheckInDate || '',
        checkOutDate: hotelCheckOutDate || '',
        guests: String(hotelGuests),
      });

      navigate(`/hotel-results?${params.toString()}`);
      return;
    }

    if (serviceType !== "flight") return;
    if (!selectedOrigin || !selectedDestination || !departureDate) {
      console.warn("Please pick origin, destination and departure date");
      return;
    }

    const params = new URLSearchParams({
      tripType,
      origin: selectedOrigin.iataCode,
      originCity: selectedOrigin.cityName,
      destination: selectedDestination.iataCode,
      destinationCity: selectedDestination.cityName,
      departureDate: departureDate ? departureDate.toISOString().split('T')[0] : '',
      ...(tripType === "roundtrip" && returnDate ? { returnDate: returnDate.toISOString().split('T')[0] } : {}),
      adults: String(adults),
      children: String(children),
      infants: String(infants),
      cabin: cabinClass,
    });

    if (tripType === "multicity") {
      const legsPayload = multiCityLegs.map((leg) => ({
        origin: leg.origin?.iataCode ?? "",
        destination: leg.destination?.iataCode ?? "",
        departureDate: leg.departureDate ? leg.departureDate.toString() : "",
      }));
      params.append("legs", JSON.stringify(legsPayload));
    }

    navigate(`/search-results?${params.toString()}`);
  };

  const renderLocationLabel = (loc: Location) =>
    `${loc.cityName ? loc.cityName + " — " : ""}${loc.name ?? ""} (${loc.iataCode})`;

  const totalTravellers = adults + children + infants;

  return (
    <div
      className="relative w-[90%] lg:w-[75%] mx-auto my-8 px-1 sm:px-4 font-[Poppins]"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {/* Floating Service Type Bar */}
      <div className="absolute -top-6 left-4 md:left-8 flex items-center gap-2 bg-card/95 backdrop-blur-md shadow-premium rounded-full border border-border px-3 py-1.5 z-20">
        <div className="relative">
          <button
            onClick={() => {
              handleServiceTypeChange("flight");
              setShowTripMenu(!showTripMenu);
            }}
            className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-medium flex items-center gap-1.5 transition-all ${
              serviceType === "flight"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
          >
            <Plane className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Flight</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          {/* Trip Type Dropdown */}
          {showTripMenu && serviceType === "flight" && (
            <div className="absolute top-full left-0 mt-2 bg-card shadow-xl rounded-xl border border-border overflow-hidden z-50 min-w-[160px] animate-slide-down">
              <button
                onClick={() => {
                  setTripType("oneway");
                  setShowTripMenu(false);
                }}
                className={`w-full px-4 py-3 text-left text-sm hover:bg-muted transition-colors ${
                  tripType === "oneway" ? "bg-primary/10 text-primary font-semibold" : ""
                }`}
              >
                One-way
              </button>
              <button
                onClick={() => {
                  setTripType("roundtrip");
                  setShowTripMenu(false);
                }}
                className={`w-full px-4 py-3 text-left text-sm hover:bg-muted transition-colors ${
                  tripType === "roundtrip" ? "bg-primary/10 text-primary font-semibold" : ""
                }`}
              >
                Round trip
              </button>
              <button
                onClick={() => {
                  setTripType("multicity");
                  setShowTripMenu(false);
                }}
                className={`w-full px-4 py-3 text-left text-sm hover:bg-muted transition-colors ${
                  tripType === "multicity" ? "bg-primary/10 text-primary font-semibold" : ""
                }`}
              >
                Multi-city
                <span className="block text-xs text-muted-foreground mt-0.5">Coming soon</span>
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => handleServiceTypeChange("hotel")}
          className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-medium flex items-center gap-1.5 transition-all ${
            serviceType === "hotel"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-muted"
          }`}
        >
          <Hotel className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span className="hidden sm:inline">Hotel</span>
        </button>

        <button
          onClick={() => {
            handleServiceTypeChange("package");
            setShowDestinationModal(true);
          }}
          className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-medium flex items-center gap-1.5 transition-all ${
            serviceType === "package"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-muted"
          }`}
        >
          <Package className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span className="hidden sm:inline">Package</span>
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-card/95 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-premium border border-border overflow-hidden pt-8 md:pt-10">
        <div className="p-4 md:p-6">
          {serviceType === "flight" && tripType !== "multicity" && (
            <>
              {/* Origin & Destination - Horizontal on mobile */}
              <div className="flex flex-row items-center gap-2 md:gap-3">
                <div
                  onClick={() => {
                    setShowOriginSearch(true);
                    setOriginQuery("");
                  }}
                  className="flex-1 bg-background rounded-xl p-2.5 md:p-3 shadow-sm border border-border cursor-pointer hover:border-accent transition-all"
                >
                  {selectedOrigin ? (
                    <>
                      <div className="text-xl md:text-2xl font-bold text-foreground">
                        {selectedOrigin.iataCode}
                      </div>
                      <div className="text-[10px] md:text-xs text-muted-foreground truncate">
                        {selectedOrigin.cityName}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-xs md:text-sm font-semibold text-foreground">FROM</div>
                      <div className="text-[10px] md:text-xs text-muted-foreground">Select origin</div>
                    </>
                  )}
                </div>

                <div className="flex items-center justify-center w-6 h-6 md:w-10 md:h-10 rounded-full bg-accent/10 flex-shrink-0">
                  <ArrowRight className="w-3 h-3 md:w-5 md:h-5 text-accent" />
                </div>

                <div
                  onClick={() => {
                    setShowDestinationSearch(true);
                    setDestinationQuery("");
                  }}
                  className="flex-1 bg-background rounded-xl p-2.5 md:p-3 shadow-sm border border-border cursor-pointer hover:border-accent transition-all"
                >
                  {selectedDestination ? (
                    <>
                      <div className="text-xl md:text-2xl font-bold text-foreground">
                        {selectedDestination.iataCode}
                      </div>
                      <div className="text-[10px] md:text-xs text-muted-foreground truncate">
                        {selectedDestination.cityName}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-xs md:text-sm font-semibold text-foreground">TO</div>
                      <div className="text-[10px] md:text-xs text-muted-foreground">Select destination</div>
                    </>
                  )}
                </div>
              </div>

              {/* Compact Controls - Horizontal on mobile */}
              <div className="mt-2 md:mt-3 flex flex-row items-stretch gap-2">
                <button
                  onClick={() => setShowLuxuryCalendar(true)}
                  className="flex-1 bg-background rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-2.5 border border-border hover:border-accent transition-all flex items-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent" />
                  <div className="text-left flex-1">
                    <div className="text-[10px] md:text-xs text-muted-foreground">
                      {tripType === "roundtrip" ? "Dates" : "Departure"}
                    </div>
                    <div className="text-xs md:text-sm font-medium">
                      {departureDate ? (
                        <>
                          {departureDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                          {tripType === "roundtrip" && returnDate && (
                            <> - {returnDate.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}</>
                          )}
                        </>
                      ) : (
                        "Select date"
                      )}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setShowTravellerModal(true)}
                  className="flex-1 bg-background rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-2.5 border border-border hover:border-accent transition-all flex items-center gap-2"
                >
                  <Users className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent" />
                  <div className="text-left flex-1">
                    <div className="text-[10px] md:text-xs text-muted-foreground">
                      Travellers • {cabinClass === "economy" ? "Economy" : cabinClass === "business" ? "Business" : "First"}
                    </div>
                    <div className="text-xs md:text-sm font-medium">
                      {totalTravellers} {totalTravellers === 1 ? "Person" : "People"}
                    </div>
                  </div>
                </button>

                <button
                  onClick={handleSearch}
                  className="bg-accent text-accent-foreground px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl font-semibold hover:opacity-90 transition-all inline-flex items-center justify-center gap-2 shadow-lg text-sm md:text-base"
                >
                  <Search className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>Search</span>
                </button>
              </div>
            </>
          )}

          {serviceType === "flight" && tripType === "multicity" && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Plane className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Multi-city Coming Soon</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Contact us for a personalized quote
              </p>
              <div className="flex gap-3 justify-center">
                <button className="px-6 py-2.5 rounded-xl bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-all">
                  Contact Us
                </button>
                <button 
                  onClick={() => setTripType("roundtrip")}
                  className="px-6 py-2.5 rounded-xl border border-border hover:bg-muted transition-all"
                >
                  Back to Round trip
                </button>
              </div>
            </div>
          )}

          {serviceType === "hotel" && (
            <>
              {/* Hotel Destination */}
              <div
                onClick={() => {
                  setShowHotelDestinationSearch(true);
                  setHotelDestinationQuery("");
                }}
                className="bg-background rounded-xl p-2.5 md:p-3 shadow-sm border border-border cursor-pointer hover:border-accent transition-all mb-3"
              >
                {selectedHotelDestination ? (
                  <>
                    <div className="text-xl md:text-2xl font-bold text-foreground">
                      {selectedHotelDestination.iataCode}
                    </div>
                    <div className="text-[10px] md:text-xs text-muted-foreground truncate">
                      {selectedHotelDestination.cityName}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-xs md:text-sm font-semibold text-foreground">DESTINATION</div>
                    <div className="text-[10px] md:text-xs text-muted-foreground">Select city</div>
                  </>
                )}
              </div>

              {/* Hotel Dates & Guests - Horizontal */}
              <div className="flex flex-row items-center gap-2 md:gap-3 mb-3">
                <div
                  onClick={() => setShowHotelDateModal(true)}
                  className="flex-1 bg-background rounded-xl p-2.5 md:p-3 shadow-sm border border-border cursor-pointer hover:border-accent transition-all"
                >
                  <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground mb-1">
                    <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="font-medium">Dates</span>
                  </div>
                  <div className="text-[10px] md:text-xs text-foreground font-medium">
                    {hotelCheckInDate && hotelCheckOutDate
                      ? `${new Date(hotelCheckInDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(hotelCheckOutDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                      : "Select dates"}
                  </div>
                </div>

                <div
                  onClick={() => setShowTravellerModal(true)}
                  className="flex-1 bg-background rounded-xl p-2.5 md:p-3 shadow-sm border border-border cursor-pointer hover:border-accent transition-all"
                >
                  <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground mb-1">
                    <Users className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="font-medium">Guests</span>
                  </div>
                  <div className="text-[10px] md:text-xs text-foreground font-medium">
                    {hotelGuests} {hotelGuests === 1 ? "Guest" : "Guests"}
                  </div>
                </div>
              </div>

              {/* Hotel Search Button */}
              <button
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold text-sm md:text-base py-3 md:py-3.5 rounded-xl shadow-premium hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 md:w-5 md:h-5" />
                <span>Search Hotels</span>
              </button>
            </>
          )}

          {serviceType === "package" && (
            <div className="text-center py-8 text-muted-foreground">
              Package search coming soon
            </div>
          )}
        </div>
      </div>

      {/* Luxury Calendar */}
      {showLuxuryCalendar && (
        <LuxuryCalendar
          departureDate={departureDate}
          returnDate={returnDate}
          onDepartureSelect={(date) => setDepartureDate(date)}
          onReturnSelect={(date) => setReturnDate(date)}
          tripType={tripType}
          onClose={() => setShowLuxuryCalendar(false)}
        />
      )}

      {/* Hotel Date Selection Modal */}
      {showHotelDateModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 pt-20"
          onClick={() => setShowHotelDateModal(false)}
        >
          <div
            className="w-[70vw] max-w-[1000px] bg-card/95 backdrop-blur-md shadow-premium rounded-2xl border border-border overflow-hidden animate-slide-down"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Select Dates</h3>
                <button
                  onClick={() => setShowHotelDateModal(false)}
                  className="p-1 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    value={hotelCheckInDate ?? ""}
                    onChange={(e) => setHotelCheckInDate(e.target.value || null)}
                    className="w-full p-3 border border-border rounded-xl bg-background text-foreground"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    value={hotelCheckOutDate ?? ""}
                    onChange={(e) => setHotelCheckOutDate(e.target.value || null)}
                    className="w-full p-3 border border-border rounded-xl bg-background text-foreground"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setShowHotelDateModal(false)}
                  className="px-6 py-2 rounded-xl border border-border hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowHotelDateModal(false)}
                  className="px-6 py-2 rounded-xl bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Traveller Selection Modal */}
      {showTravellerModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 pt-20"
          onClick={() => setShowTravellerModal(false)}
        >
          <div
            className="w-[70vw] max-w-[1000px] bg-card/95 backdrop-blur-md shadow-premium rounded-2xl border border-border overflow-hidden animate-slide-down"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  {serviceType === "hotel" ? "Select Guests" : "Select Travellers"}
                </h3>
                <button
                  onClick={() => setShowTravellerModal(false)}
                  className="p-1 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {serviceType === "hotel" ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Guests</div>
                      <div className="text-xs text-muted-foreground">Number of guests</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setHotelGuests(Math.max(1, hotelGuests - 1))}
                        className="w-8 h-8 rounded-full border border-border hover:bg-muted flex items-center justify-center"
                      >
                        −
                      </button>
                      <div className="w-8 text-center font-medium">{hotelGuests}</div>
                      <button
                        onClick={() => setHotelGuests(hotelGuests + 1)}
                        className="w-8 h-8 rounded-full border border-border hover:bg-muted flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Adults</div>
                    <div className="text-xs text-muted-foreground">12+ years</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decrement(setAdults, adults)}
                      className="w-8 h-8 rounded-full border border-border hover:bg-muted flex items-center justify-center"
                    >
                      −
                    </button>
                    <div className="w-8 text-center font-medium">{adults}</div>
                    <button
                      onClick={() => increment(setAdults, adults)}
                      className="w-8 h-8 rounded-full border border-border hover:bg-muted flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Children</div>
                    <div className="text-xs text-muted-foreground">2-11 years</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decrement(setChildren, children)}
                      className="w-8 h-8 rounded-full border border-border hover:bg-muted flex items-center justify-center"
                    >
                      −
                    </button>
                    <div className="w-8 text-center font-medium">{children}</div>
                    <button
                      onClick={() => increment(setChildren, children)}
                      className="w-8 h-8 rounded-full border border-border hover:bg-muted flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Infants</div>
                    <div className="text-xs text-muted-foreground">Under 2 years</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decrement(setInfants, infants)}
                      className="w-8 h-8 rounded-full border border-border hover:bg-muted flex items-center justify-center"
                    >
                      −
                    </button>
                    <div className="w-8 text-center font-medium">{infants}</div>
                    <button
                      onClick={() => increment(setInfants, infants)}
                      className="w-8 h-8 rounded-full border border-border hover:bg-muted flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Cabin Class Selection - only for flights */}
                {serviceType === "flight" && (
                  <div className="pt-4 border-t border-border">
                    <div className="font-medium mb-3">Select Cabin Class</div>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setCabinClass("economy")}
                        className={`px-4 py-3 rounded-lg border transition-all ${
                          cabinClass === "economy"
                            ? "border-primary bg-primary/10 text-primary font-semibold"
                            : "border-border hover:bg-muted"
                        }`}
                      >
                        Economy
                      </button>
                      <button
                        onClick={() => setCabinClass("business")}
                        className={`px-4 py-3 rounded-lg border transition-all ${
                          cabinClass === "business"
                            ? "border-primary bg-primary/10 text-primary font-semibold"
                            : "border-border hover:bg-muted"
                        }`}
                      >
                        Business
                      </button>
                      <button
                        onClick={() => setCabinClass("first")}
                        className={`px-4 py-3 rounded-lg border transition-all ${
                          cabinClass === "first"
                            ? "border-primary bg-primary/10 text-primary font-semibold"
                            : "border-border hover:bg-muted"
                        }`}
                      >
                        First
                      </button>
                    </div>
                  </div>
                )}
              </div>
              )}

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setShowTravellerModal(false)}
                  className="px-6 py-2 rounded-xl border border-border hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowTravellerModal(false)}
                  className="px-6 py-2 rounded-xl bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ORIGIN SEARCH MODAL */}
      {showOriginSearch && (
        <div
          className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 pt-20"
          onClick={() => setShowOriginSearch(false)}
        >
          <div
            className="w-[70vw] max-w-[1000px] bg-card/95 backdrop-blur-md shadow-premium rounded-2xl border border-border overflow-hidden animate-slide-down"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Select Origin</h3>
                <button
                  onClick={() => setShowOriginSearch(false)}
                  className="p-1 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <input
                autoFocus
                type="text"
                value={originQuery}
                onChange={(e) => setOriginQuery(e.target.value)}
                placeholder="Search origin city or airport (min 2 chars)"
                className="w-full p-3 border border-border rounded-xl bg-background text-foreground mb-3"
              />

              <ul className="max-h-72 overflow-y-auto space-y-1">
                {isLoadingOrigin && originQuery.length >= 2 && (
                  <LuxuryLoadingAnimation />
                )}
                {!isLoadingOrigin && originResults.length === 0 && originQuery.length >= 2 && (
                  <li className="p-3 text-sm text-muted-foreground font-['Cormorant_Garamond']">No destinations match your search</li>
                )}
                {originResults.map((loc) => (
                  <li
                    key={loc.iataCode + loc.name}
                    className="p-3 hover:bg-muted cursor-pointer rounded-lg flex items-center justify-between transition-colors"
                    onClick={() => {
                      setSelectedOrigin(loc);
                      setShowOriginSearch(false);
                    }}
                  >
                    <div>
                      <div className="font-medium">{renderLocationLabel(loc)}</div>
                      <div className="text-xs text-muted-foreground">
                        {loc.type ?? ""} • {loc.countryName}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {loc.type?.toLowerCase().includes("airport") ? (
                        <Plane className="w-5 h-5" />
                      ) : (
                        <span className="text-[10px] px-2 py-1 rounded bg-muted">City</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {selectedOrigin && (
                <div className="mt-4 border-t border-border pt-4">
                  <div className="font-semibold mb-2 text-sm text-muted-foreground">Selected Origin</div>
                  <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                    <Plane className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">{selectedOrigin.name ?? selectedOrigin.cityName}</div>
                      <div className="text-xs text-muted-foreground">{selectedOrigin.iataCode} • {selectedOrigin.countryName}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setShowOriginSearch(false)}
                  className="px-6 py-2 rounded-xl border border-border hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowOriginSearch(false)}
                  className="px-6 py-2 rounded-xl bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
                  disabled={!selectedOrigin}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DESTINATION SEARCH MODAL */}
      {showDestinationSearch && (
        <div
          className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 pt-20"
          onClick={() => setShowDestinationSearch(false)}
        >
          <div
            className="w-[70vw] max-w-[1000px] bg-card/95 backdrop-blur-md shadow-premium rounded-2xl border border-border overflow-hidden animate-slide-down"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Select Destination</h3>
                <button
                  onClick={() => setShowDestinationSearch(false)}
                  className="p-1 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <input
                autoFocus
                type="text"
                value={destinationQuery}
                onChange={(e) => setDestinationQuery(e.target.value)}
                placeholder="Search destination city or airport (min 2 chars)"
                className="w-full p-3 border border-border rounded-xl bg-background text-foreground mb-3"
              />

              <ul className="max-h-72 overflow-y-auto space-y-1">
                {isLoadingDestination && destinationQuery.length >= 2 && (
                  <LuxuryLoadingAnimation />
                )}
                {!isLoadingDestination && destinationResults.length === 0 && destinationQuery.length >= 2 && (
                  <li className="p-3 text-sm text-muted-foreground font-['Cormorant_Garamond']">No destinations match your search</li>
                )}
                {destinationResults.map((loc) => (
                  <li
                    key={loc.iataCode + (loc.name ?? "")}
                    className="p-3 hover:bg-muted cursor-pointer rounded-lg flex items-center justify-between transition-colors"
                    onClick={() => {
                      setSelectedDestination(loc);
                      setShowDestinationSearch(false);
                    }}
                  >
                    <div>
                      <div className="font-medium">{renderLocationLabel(loc)}</div>
                      <div className="text-xs text-muted-foreground">
                        {loc.type ?? ""} • {loc.countryName}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {loc.type?.toLowerCase().includes("airport") ? (
                        <Plane className="w-5 h-5" />
                      ) : (
                        <span className="text-[10px] px-2 py-1 rounded bg-muted">City</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {selectedDestination && (
                <div className="mt-4 border-t border-border pt-4">
                  <div className="font-semibold mb-2 text-sm text-muted-foreground">Selected Destination</div>
                  <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                    <Plane className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">{selectedDestination.name ?? selectedDestination.cityName}</div>
                      <div className="text-xs text-muted-foreground">{selectedDestination.iataCode} • {selectedDestination.countryName}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setShowDestinationSearch(false)}
                  className="px-6 py-2 rounded-xl border border-border hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowDestinationSearch(false)}
                  className="px-6 py-2 rounded-xl bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
                  disabled={!selectedDestination}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HOTEL DESTINATION SEARCH MODAL */}
      {showHotelDestinationSearch && (
        <div
          className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 pt-20"
          onClick={() => setShowHotelDestinationSearch(false)}
        >
          <div
            className="w-[70vw] max-w-[1000px] bg-card/95 backdrop-blur-md shadow-premium rounded-2xl border border-border overflow-hidden animate-slide-down"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Select Hotel Destination</h3>
                <button
                  onClick={() => setShowHotelDestinationSearch(false)}
                  className="p-1 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <input
                autoFocus
                type="text"
                value={hotelDestinationQuery}
                onChange={(e) => setHotelDestinationQuery(e.target.value)}
                placeholder="Search hotel destination city (min 2 chars)"
                className="w-full p-3 border border-border rounded-xl bg-background text-foreground mb-3"
              />

              <ul className="max-h-72 overflow-y-auto space-y-1">
                {isLoadingHotel && hotelDestinationQuery.length >= 2 && (
                  <LuxuryLoadingAnimation />
                )}
                {!isLoadingHotel && hotelDestinationResults.length === 0 && hotelDestinationQuery.length >= 2 && (
                  <li className="p-3 text-sm text-muted-foreground font-['Cormorant_Garamond']">No destinations match your search</li>
                )}
                {hotelDestinationResults.map((loc) => (
                  <li
                    key={loc.iataCode + (loc.name ?? "")}
                    className="p-3 hover:bg-muted cursor-pointer rounded-lg flex items-center justify-between transition-colors"
                    onClick={() => {
                      setSelectedHotelDestination(loc);
                      setShowHotelDestinationSearch(false);
                    }}
                  >
                    <div>
                      <div className="font-medium">{renderLocationLabel(loc)}</div>
                      <div className="text-xs text-muted-foreground">
                        {loc.type ?? ""} • {loc.countryName}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <Hotel className="w-5 h-5" />
                    </div>
                  </li>
                ))}
              </ul>

              {selectedHotelDestination && (
                <div className="mt-4 border-t border-border pt-4">
                  <div className="font-semibold mb-2 text-sm text-muted-foreground">Selected Destination</div>
                  <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                    <Hotel className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">{selectedHotelDestination.name ?? selectedHotelDestination.cityName}</div>
                      <div className="text-xs text-muted-foreground">{selectedHotelDestination.iataCode} • {selectedHotelDestination.countryName}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setShowHotelDestinationSearch(false)}
                  className="px-6 py-2 rounded-xl border border-border hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowHotelDestinationSearch(false)}
                  className="px-6 py-2 rounded-xl bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
                  disabled={!selectedHotelDestination}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Destination Modal */}
      <DestinationModal isOpen={showDestinationModal} onClose={() => setShowDestinationModal(false)} />
    </div>
  );
};

export default ReservationCard;