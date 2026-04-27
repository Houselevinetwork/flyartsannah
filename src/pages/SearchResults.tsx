import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Plane,
  ChevronDown,
  Wifi,
  Utensils,
  Usb,
  Armchair,
  Info,
  Check,
  X,
} from "lucide-react";
import EnhancedHeader from "@/components/EnhancedHeader";
import ResponsiveFooter from "@/components/ResponsiveFooter";
import FlightDetailsDropdown from "@/components/FlightDetailsDropdown";
import { BookingPanel } from "@/components/BookingPanel";
import { searchFlights, type FlightOffer } from "@/lib/amadeus-api";
import { getAirlineName, getAirlineLogoUrl, getLocationFullName } from "@/lib/airline-names";
import { getExchangeRates } from "@/lib/currency-api";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [flights, setFlights] = useState<FlightOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCabin, setSelectedCabin] = useState<"economy" | "business" | "first">("economy");
  const [expandedFlight, setExpandedFlight] = useState<string | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<FlightOffer | null>(null);
  const [currency, setCurrency] = useState("USD");
  const [conversionRate, setConversionRate] = useState(1);
  const [showSeatSelection, setShowSeatSelection] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMethod, setConfirmationMethod] = useState<"whatsapp" | "email" | null>(null);
  const [contactInfo, setContactInfo] = useState("");

  const tripType = searchParams.get("tripType") || "roundtrip";
  const origin = searchParams.get("origin") || "";
  const originCity = searchParams.get("originCity") || "";
  const destination = searchParams.get("destination") || "";
  const destinationCity = searchParams.get("destinationCity") || "";
  const departureDate = searchParams.get("departureDate") || "";
  const returnDate = searchParams.get("returnDate") || "";
  const adults = parseInt(searchParams.get("adults") || "1");
  const children = parseInt(searchParams.get("children") || "0");
  const infants = parseInt(searchParams.get("infants") || "0");
  const cabin = searchParams.get("cabin") || "economy";

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      try {
        const results = await searchFlights({
          originLocationCode: origin,
          destinationLocationCode: destination,
          departureDate,
          ...(returnDate && { returnDate }),
          adults,
          children,
          infants,
          travelClass: cabin.toUpperCase(),
          origin: ""
        });
        setFlights(results);
      } catch (error) {
        console.error("Flight search error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (origin && destination && departureDate) {
      fetchFlights();
    }
  }, [origin, destination, departureDate, returnDate, adults, children, infants, cabin]);

  useEffect(() => {
    const fetchRate = async () => {
      if (currency !== "USD") {
        const rates = await getExchangeRates();
        const rate = rates[currency] || 1;
        setConversionRate(rate);
      } else {
        setConversionRate(1);
      }
    };
    fetchRate();
  }, [currency]);

  const formatDuration = (duration: string) => {
    const match = duration.match(/PT(\d+)H(\d+)M/);
    return match ? `${match[1]}h ${match[2]}m` : duration;
  };

  const formatTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const convertPrice = (price: string) => {
    return (parseFloat(price) * conversionRate).toFixed(0);
  };

  const handleSelectFlight = (flight: FlightOffer, cabin: "economy" | "business" | "first") => {
    setSelectedFlight(flight);
    setSelectedCabin(cabin);
  };

  const generateSeatMap = () => {
    const rows = selectedCabin === "economy" ? 30 : selectedCabin === "business" ? 8 : 4;
    const seatsPerRow = selectedCabin === "economy" ? 6 : selectedCabin === "business" ? 4 : 4;
    const seats = [];
    for (let row = 1; row <= rows; row++) {
      for (let col = 0; col < seatsPerRow; col++) {
        const seatLetter = String.fromCharCode(65 + col); // A, B, C, etc.
        seats.push(`${row}${seatLetter}`);
      }
    }
    return seats;
  };

  const toggleSeat = (seat: string) => {
    const maxSeats = adults + children + infants;
    setSelectedSeats((prev) => {
      if (prev.includes(seat)) {
        return prev.filter((s) => s !== seat);
      } else if (prev.length < maxSeats) {
        return [...prev, seat];
      }
      return prev;
    });
  };

  const handleConfirmBooking = () => {
    if (!selectedFlight || !confirmationMethod || !contactInfo) return;
    
    const priceMultiplier = selectedCabin === "economy" ? 1 : selectedCabin === "business" ? 2.8 : 4.5;
    const totalPrice = Math.floor(parseFloat(selectedFlight.price.total) * priceMultiplier);
    const itinerary = selectedFlight.itineraries[0];
    
    const bookingDetails = `
🎫 Flight Booking Confirmation

✈️ Flight Details:
${originCity} (${origin}) → ${destinationCity} (${destination})
${getAirlineName(selectedFlight.validatingAirlineCodes[0])}

📅 Departure: ${new Date(itinerary.segments[0].departure.at).toLocaleString()}
📅 Arrival: ${new Date(itinerary.segments[itinerary.segments.length - 1].arrival.at).toLocaleString()}

👥 Passengers: ${adults + children + infants}
💺 Seats: ${selectedSeats.join(", ")}
🎫 Class: ${selectedCabin.charAt(0).toUpperCase() + selectedCabin.slice(1)}

💰 Total: ${currency} ${convertPrice(String(totalPrice))}
    `.trim();

    if (confirmationMethod === "whatsapp") {
      const whatsappMsg = encodeURIComponent(bookingDetails);
      window.open(`https://wa.me/${contactInfo.replace(/\D/g, '')}?text=${whatsappMsg}`, "_blank");
    } else {
      const mailtoLink = `mailto:${contactInfo}?subject=Flight Booking Confirmation&body=${encodeURIComponent(bookingDetails)}`;
      window.location.href = mailtoLink;
    }
    
    setShowConfirmation(false);
    setShowSeatSelection(false);
    setSelectedSeats([]);
    setContactInfo("");
    setConfirmationMethod(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <EnhancedHeader />

      {/* Route Summary */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {originCity} ({origin}) → {destinationCity} ({destination})
              {tripType === "roundtrip" && (
                <span className="text-muted-foreground"> • {destinationCity} ({destination}) → {originCity} ({origin})</span>
              )}
            </h1>
            <p className="text-sm text-muted-foreground">
              {tripType === "oneway" ? "One-way Flight" : "Round Trip Flight"} • {adults + children + infants} Traveller{adults + children + infants > 1 ? "s" : ""} • {cabin.charAt(0).toUpperCase() + cabin.slice(1).toLowerCase()} Class
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-muted-foreground">Searching for flights...</p>
          </div>
        ) : flights.length === 0 ? (
          <div className="text-center py-20">
            <Plane className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No flights found</h2>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
            {/* Left: Flight Results */}
            <div>
              {/* Header with cabin tabs */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  {tripType === "roundtrip" ? "Outbound & Return Flights" : "Outbound Flight"}
                </h2>
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => setSelectedCabin("economy")}
                    className={`text-base font-medium pb-1 transition-colors ${
                      selectedCabin === "economy"
                        ? "border-b-2 border-primary text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Economy
                  </button>
                  <button
                    onClick={() => setSelectedCabin("business")}
                    className={`text-base font-medium pb-1 transition-colors ${
                      selectedCabin === "business"
                        ? "border-b-2 border-primary text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Business
                  </button>
                  <button
                    onClick={() => setSelectedCabin("first")}
                    className={`text-base font-medium pb-1 transition-colors ${
                      selectedCabin === "first"
                        ? "border-b-2 border-primary text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    First
                  </button>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="text-sm border border-border rounded-md px-2 py-1 bg-background"
                  >
                    <option value="USD">USD</option>
                    <option value="KES">KES</option>
                    <option value="GBP">GBP</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              </div>

              {/* Flight Cards */}
              <div className="space-y-3">
                {flights.map((flight) => {
                  const itinerary = flight.itineraries[0];
                  const isExpanded = expandedFlight === flight.id;
                  const priceMultiplier = selectedCabin === "economy" ? 1 : selectedCabin === "business" ? 2.8 : 4.5;
                  const price = String(Math.floor(parseFloat(flight.price.total) * priceMultiplier));

                  return (
                    <div
                      key={flight.id}
                      className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      {/* Main Flight Info */}
                      <div className="p-4 grid grid-cols-[auto_1fr_auto_auto] gap-6 items-center">
                        {/* Time + Airport Code + City */}
                        <div>
                          <div className="text-2xl font-bold">
                            {formatTime(itinerary.segments[0].departure.at)}
                          </div>
                          <div className="text-sm text-muted-foreground font-medium">
                            {itinerary.segments[0].departure.iataCode}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {originCity}
                          </div>
                        </div>

                        {/* Route visualization */}
                        <div className="flex items-center gap-3">
                          <div className="flex-1 border-t-2 border-dotted border-muted-foreground/30" />
                          <div className="flex flex-col items-center">
                            <Plane className="w-5 h-5 text-accent rotate-90" />
                            <div className="text-xs text-muted-foreground mt-1">
                              {itinerary.segments.length === 1
                                ? "Non-stop"
                                : `${itinerary.segments.length - 1} stop`}
                            </div>
                            <div className="text-xs font-medium">
                              {formatDuration(itinerary.duration)}
                            </div>
                          </div>
                          <div className="flex-1 border-t-2 border-dotted border-muted-foreground/30" />
                        </div>

                        {/* Arrival + City */}
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            {formatTime(
                              itinerary.segments[itinerary.segments.length - 1].arrival.at
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground font-medium">
                            {itinerary.segments[itinerary.segments.length - 1].arrival.iataCode}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {destinationCity}
                          </div>
                          {itinerary.segments.length > 1 && (
                            <div className="text-xs text-muted-foreground mt-1">
                              +{Math.floor(Math.random() * 2)} day
                            </div>
                          )}
                        </div>

                        {/* Airline + Price + Actions */}
                        <div className="flex flex-col items-center gap-2 min-w-[140px]">
                          <div className="flex flex-col items-center">
                            <div className="text-xs text-muted-foreground space-y-0.5 text-center mb-2">
                              {itinerary.segments.map((seg, idx) => (
                                <div key={idx}>
                                  {getAirlineName(seg.carrierCode)} {seg.number}
                                </div>
                              ))}
                            </div>
                            <img
                              src={getAirlineLogoUrl(flight.validatingAirlineCodes[0])}
                              alt={getAirlineName(flight.validatingAirlineCodes[0])}
                              className="w-10 h-10 object-contain"
                              onError={(e) => (e.currentTarget.style.display = "none")}
                            />
                          </div>

                          <div className="text-center">
                            <div className="text-xs text-muted-foreground">From {currency}</div>
                            <div className="text-2xl font-bold">{convertPrice(price)}</div>
                            {tripType === "roundtrip" && (
                              <div className="text-xs text-muted-foreground mt-1">Round trip</div>
                            )}
                          </div>

                          {/* Seats Left */}
                          <div className="text-xs text-center">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${
                              (flight.numberOfBookableSeats || 5) <= 3 
                                ? "bg-red-500/10 text-red-600" 
                                : (flight.numberOfBookableSeats || 5) <= 7
                                ? "bg-orange-500/10 text-orange-600"
                                : "bg-green-500/10 text-green-600"
                            }`}>
                              <Info className="w-3 h-3" />
                              {flight.numberOfBookableSeats || 5} seats left
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-muted-foreground justify-center">
                            <Usb className="w-4 h-4" />
                            <Wifi className="w-4 h-4" />
                            <Utensils className="w-4 h-4" />
                            <Armchair className="w-4 h-4" />
                          </div>

                          <button
                            onClick={() => setExpandedFlight(isExpanded ? null : flight.id)}
                            className="text-accent text-sm hover:underline flex items-center gap-1"
                          >
                            View Details
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          <button
                            onClick={() => {
                              handleSelectFlight(flight, selectedCabin);
                              setShowSeatSelection(true);
                            }}
                            className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity text-sm font-medium"
                          >
                            Select & Choose Seats
                          </button>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {isExpanded && <FlightDetailsDropdown segments={itinerary.segments} />}
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => navigate("/")}
                className="mt-6 px-8 py-2 rounded-full border border-border hover:bg-muted transition-colors"
              >
                Back
              </button>
            </div>

            {/* Right: Booking Panel */}
            <div className="lg:block hidden">
              <BookingPanel
                selectedFlight={selectedFlight}
                currency={currency}
                totalPrice={
                  selectedFlight
                    ? parseFloat(
                        convertPrice(
                          String(Math.floor(parseFloat(selectedFlight.price.total) * (selectedCabin === "economy" ? 1 : selectedCabin === "business" ? 2.8 : 4.5)))
                        )
                      )
                    : 0
                }
                selectedCabin={selectedCabin}
              />
            </div>
          </div>
        )}
      </main>

      {/* Confirmation Method Modal */}
      {showConfirmation && selectedFlight && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowConfirmation(false)}
        >
          <div
            className="w-full max-w-md bg-card rounded-2xl border border-border overflow-hidden animate-slide-down p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">How would you like to receive confirmation?</h3>
              <button
                onClick={() => setShowConfirmation(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setConfirmationMethod("whatsapp")}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  confirmationMethod === "whatsapp"
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    W
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">WhatsApp</div>
                    <div className="text-xs text-muted-foreground">Send booking details via WhatsApp</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setConfirmationMethod("email")}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  confirmationMethod === "email"
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    @
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Email</div>
                    <div className="text-xs text-muted-foreground">Send booking details via email</div>
                  </div>
                </div>
              </button>

              {confirmationMethod && (
                <div className="animate-slide-down">
                  <label className="block text-sm font-medium mb-2">
                    {confirmationMethod === "whatsapp" ? "WhatsApp Number" : "Email Address"}
                  </label>
                  <input
                    type={confirmationMethod === "whatsapp" ? "tel" : "email"}
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder={confirmationMethod === "whatsapp" ? "+1234567890" : "email@example.com"}
                    className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              )}

              <button
                onClick={handleConfirmBooking}
                disabled={!confirmationMethod || !contactInfo}
                className="w-full px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 font-medium"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Seat Selection Modal */}
      {showSeatSelection && selectedFlight && (
        <div
          className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 pt-4 sm:pt-10 overflow-y-auto"
          onClick={() => setShowSeatSelection(false)}
        >
          <div
            className="w-[95vw] sm:w-[90vw] max-w-4xl bg-card/95 backdrop-blur-md shadow-premium rounded-2xl border border-border overflow-hidden animate-slide-down my-4 sm:my-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">Select Your Seats</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    {selectedCabin.charAt(0).toUpperCase() + selectedCabin.slice(1)} Class • {adults + children + infants} Passenger{adults + children + infants > 1 ? "s" : ""}
                  </p>
                </div>
                <button
                  onClick={() => setShowSeatSelection(false)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-4 sm:mb-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded border-2 border-border bg-background"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded bg-primary text-primary-foreground flex items-center justify-center">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded bg-muted text-muted-foreground"></div>
                  <span>Occupied</span>
                </div>
              </div>

              {/* Seat Map */}
              <div className="bg-muted/30 rounded-xl p-3 sm:p-6 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto">
                <div className="flex flex-col items-center">
                  {/* Cockpit */}
                  <div className="w-full max-w-md mb-3 sm:mb-4 p-2 sm:p-3 bg-muted rounded-t-full text-center text-xs sm:text-sm font-medium text-muted-foreground">
                    ✈️ Front
                  </div>

                  {/* Seats Grid */}
                  <div className="space-y-2">
                    {Array.from({
                      length: selectedCabin === "economy" ? 30 : selectedCabin === "business" ? 8 : 4,
                    }).map((_, rowIndex) => {
                      const row = rowIndex + 1;
                      const seatsPerRow = selectedCabin === "economy" ? 6 : 4;
                      const leftSeats = selectedCabin === "economy" ? 3 : 2;

                      return (
                        <div key={row} className="flex items-center gap-1 sm:gap-3">
                          <div className="w-6 sm:w-8 text-xs sm:text-sm font-medium text-muted-foreground text-right">
                            {row}
                          </div>
                          <div className="flex gap-1 sm:gap-2">
                            {Array.from({ length: leftSeats }).map((_, colIndex) => {
                              const seatLetter = String.fromCharCode(65 + colIndex);
                              const seatId = `${row}${seatLetter}`;
                              const isOccupied = Math.random() > 0.7;
                              const isSelected = selectedSeats.includes(seatId);

                              return (
                                <button
                                  key={seatId}
                                  onClick={() => !isOccupied && toggleSeat(seatId)}
                                  disabled={isOccupied}
                                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded border-2 transition-all text-xs font-medium ${
                                    isOccupied
                                      ? "bg-muted text-muted-foreground cursor-not-allowed border-muted"
                                      : isSelected
                                      ? "bg-primary text-primary-foreground border-primary"
                                      : "bg-background border-border hover:border-primary active:border-primary"
                                  }`}
                                >
                                  {isSelected && <Check className="w-3 h-3 sm:w-4 sm:h-4 mx-auto" />}
                                </button>
                              );
                            })}
                          </div>
                          <div className="w-4 sm:w-8"></div>
                          <div className="flex gap-1 sm:gap-2">
                            {Array.from({ length: seatsPerRow - leftSeats }).map((_, colIndex) => {
                              const seatLetter = String.fromCharCode(65 + leftSeats + colIndex);
                              const seatId = `${row}${seatLetter}`;
                              const isOccupied = Math.random() > 0.7;
                              const isSelected = selectedSeats.includes(seatId);

                              return (
                                <button
                                  key={seatId}
                                  onClick={() => !isOccupied && toggleSeat(seatId)}
                                  disabled={isOccupied}
                                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded border-2 transition-all text-xs font-medium ${
                                    isOccupied
                                      ? "bg-muted text-muted-foreground cursor-not-allowed border-muted"
                                      : isSelected
                                      ? "bg-primary text-primary-foreground border-primary"
                                      : "bg-background border-border hover:border-primary active:border-primary"
                                  }`}
                                >
                                  {isSelected && <Check className="w-3 h-3 sm:w-4 sm:h-4 mx-auto" />}
                                </button>
                              );
                            })}
                          </div>
                          <div className="w-6 sm:w-8 text-xs sm:text-sm font-medium text-muted-foreground">
                            {row}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {selectedSeats.length > 0 && (
                <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-primary/10 rounded-lg">
                  <div className="font-medium mb-2 text-sm sm:text-base">Selected Seats:</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedSeats.map((seat) => (
                      <span
                        key={seat}
                        className="px-2 sm:px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs sm:text-sm font-medium"
                      >
                        {seat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-end gap-2">
                <button
                  onClick={() => {
                    setShowSeatSelection(false);
                    setSelectedSeats([]);
                  }}
                  className="px-4 sm:px-6 py-2 rounded-xl border border-border hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (selectedSeats.length === adults + children + infants) {
                      setShowSeatSelection(false);
                      setShowConfirmation(true);
                    }
                  }}
                  className="px-6 py-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
                  disabled={selectedSeats.length !== adults + children + infants}
                >
                  Confirm Seats ({selectedSeats.length}/{adults + children + infants})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ResponsiveFooter />
    </div>
  );
};

export default SearchResults;