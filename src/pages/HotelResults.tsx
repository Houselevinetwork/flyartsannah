import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Users, Calendar, Filter, DollarSign, Wifi, Coffee, UtensilsCrossed, Dumbbell, Image as ImageIcon } from "lucide-react";
import { searchHotels, type HotelOffer } from "@/lib/amadeus-api";
import EnhancedHeader from "@/components/EnhancedHeader";
import ResponsiveFooter from "@/components/ResponsiveFooter";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

export default function HotelResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [hotels, setHotels] = useState<HotelOffer[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<HotelOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "rating">("price-low");

  const cityCode = searchParams.get("cityCode") || "";
  const cityName = searchParams.get("cityName") || "";
  const checkInDate = searchParams.get("checkInDate") || "";
  const checkOutDate = searchParams.get("checkOutDate") || "";
  const guests = parseInt(searchParams.get("guests") || "1");

  useEffect(() => {
    const fetchHotels = async () => {
      if (!cityCode || !checkInDate || !checkOutDate) {
        setError("Missing search parameters");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const results = await searchHotels({
          cityCode,
          checkInDate,
          checkOutDate,
          adults: guests,
          roomQuantity: 1,
          currency: "USD",
          max: 20,
        });
        setHotels(results);
        setFilteredHotels(results);
        setError(null);
        
        // Set initial price range based on results
        if (results.length > 0) {
          const prices = results.map(h => parseFloat(h.offers[0]?.price.total || "0"));
          setPriceRange([Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))]);
        }
      } catch (err) {
        console.error("Hotel search error:", err);
        setError("Failed to load hotels. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [cityCode, checkInDate, checkOutDate, guests]);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...hotels];

    // Price filter
    filtered = filtered.filter((hotel) => {
      const price = parseFloat(hotel.offers[0]?.price.total || "0");
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort
    filtered.sort((a, b) => {
      const priceA = parseFloat(a.offers[0]?.price.total || "0");
      const priceB = parseFloat(b.offers[0]?.price.total || "0");
      
      if (sortBy === "price-low") return priceA - priceB;
      if (sortBy === "price-high") return priceB - priceA;
      return 0; // rating would go here if we had ratings
    });

    setFilteredHotels(filtered);
  }, [hotels, priceRange, sortBy, selectedAmenities]);

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diff = new Date(checkOutDate).getTime() - new Date(checkInDate).getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <EnhancedHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        {/* Back Button & Search Summary */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Search
          </button>

          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-semibold">{cityName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>
                    {new Date(checkInDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    -{" "}
                    {new Date(checkOutDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    ({nights} {nights === 1 ? "night" : "nights"})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span>
                    {guests} {guests === 1 ? "Guest" : "Guests"}
                  </span>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-card rounded-xl p-6 border border-border mb-6 animate-slide-down">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price Range */}
              <div>
                <h4 className="font-semibold mb-3">Price Range</h4>
                <div className="space-y-3">
                  <Slider
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    min={0}
                    max={2000}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Sort By */}
              <div>
                <h4 className="font-semibold mb-3">Sort By</h4>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={sortBy === "price-low" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSortBy("price-low")}
                  >
                    Price: Low to High
                  </Button>
                  <Button
                    variant={sortBy === "price-high" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSortBy("price-high")}
                  >
                    Price: High to Low
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-muted-foreground">Searching for hotels...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-destructive mb-4">{error}</p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
            >
              Back to Search
            </button>
          </div>
        )}

        {!loading && !error && hotels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No hotels found for your search.</p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
            >
              Try Another Search
            </button>
          </div>
        )}

        {!loading && !error && filteredHotels.length > 0 && (
          <>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {filteredHotels.length} {filteredHotels.length === 1 ? "Hotel" : "Hotels"} Found
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredHotels.map((hotel, index) => (
                <div
                  key={`${hotel.hotel.hotelId}-${index}`}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all group"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Hotel Image */}
                    <div className="md:w-64 h-48 md:h-auto bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative overflow-hidden">
                      <ImageIcon className="w-16 h-16 text-muted-foreground/50" />
                      <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                        <span className="text-xs font-semibold">
                          {(Math.random() * 2 + 3).toFixed(1)}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
                      {/* Hotel Info */}
                      <div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {hotel.hotel.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <MapPin className="w-4 h-4" />
                          <span>{hotel.hotel.cityCode}</span>
                        </div>

                        {/* Amenities */}
                        <div className="flex flex-wrap gap-3 mb-4">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Wifi className="w-3 h-3" />
                            <span>Free WiFi</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Coffee className="w-3 h-3" />
                            <span>Breakfast</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <UtensilsCrossed className="w-3 h-3" />
                            <span>Restaurant</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Dumbbell className="w-3 h-3" />
                            <span>Gym</span>
                          </div>
                        </div>

                        {/* Room Offers */}
                        {hotel.offers && hotel.offers.length > 0 && (
                          <div className="space-y-2">
                            {hotel.offers.slice(0, 1).map((offer, offerIndex) => (
                              <div key={offer.id || offerIndex} className="bg-muted/50 rounded-lg p-3">
                                <div className="font-medium text-sm mb-1">{offer.room.type}</div>
                                {offer.room.description?.text && (
                                  <div className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                    {offer.room.description.text}
                                  </div>
                                )}
                                <div className="flex items-center gap-3 text-xs">
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <Users className="w-3 h-3" />
                                    <span>{offer.guests.adults} adults</span>
                                  </div>
                                  {offer.boardType && (
                                    <div className="text-muted-foreground">
                                      • {offer.boardType}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                            {hotel.offers.length > 1 && (
                              <button className="text-xs text-primary hover:underline">
                                +{hotel.offers.length - 1} more room option{hotel.offers.length > 2 ? "s" : ""}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Price & Booking */}
                    <div className="md:w-48 p-4 md:p-6 bg-muted/30 flex flex-col items-end justify-between border-t md:border-t-0 md:border-l border-border">
                      {hotel.offers && hotel.offers[0] && (
                        <>
                          <div className="text-right w-full">
                            <div className="text-xs text-muted-foreground mb-1">From</div>
                            <div className="text-3xl font-bold text-primary mb-1 flex items-start justify-end">
                              <DollarSign className="w-5 h-5 mt-1" />
                              {hotel.offers[0].price.total}
                            </div>
                            <div className="text-xs text-muted-foreground mb-2">
                              Total for {nights} {nights === 1 ? "night" : "nights"}
                            </div>
                            <div className="text-sm font-medium text-foreground">
                              ${(parseFloat(hotel.offers[0].price.total) / nights).toFixed(2)}/night
                            </div>
                            {/* New Discount Note */}
                            <div className="text-xs text-green-600 mt-2">
                              Receive an exclusive discount when you book through Fly ArtSannah Group! Contact us via Email or WhatsApp.
                            </div>
                          </div>
                          <Button
                            className="w-full mt-4"
                            onClick={() => {
                              const message = `Hello Fly ArtSannah! I'd like to book:\n\nHotel: ${hotel.hotel.name}\nCity: ${hotel.hotel.cityCode}\nCheck-in: ${checkInDate}\nCheck-out: ${checkOutDate}\nGuests: ${guests}\nPrice: $${hotel.offers[0].price.total}\nRoom: ${hotel.offers[0].room.type}`;
                              const whatsappUrl = `https://wa.me/254786929964?text=${encodeURIComponent(message)}`;
                              window.open(whatsappUrl, '_blank');
                            }}
                          >
                            Book via WhatsApp
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full mt-2"
                            onClick={() => {
                              const subject = `Hotel Booking Inquiry - ${hotel.hotel.name}`;
                              const body = `Hello Fly ArtSannah,\n\nI would like to book the following hotel:\n\nHotel: ${hotel.hotel.name}\nCity: ${hotel.hotel.cityCode}\nCheck-in: ${checkInDate}\nCheck-out: ${checkOutDate}\nGuests: ${guests}\nPrice: $${hotel.offers[0].price.total} ${hotel.offers[0].price.currency}\nRoom Type: ${hotel.offers[0].room.type}\n\nPlease let me know the next steps.\n\nThank you!`;
                              const emailUrl = `mailto:fly@artsannah.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                              window.location.href = emailUrl;
                            }}
                          >
                            Book via Email
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <ResponsiveFooter />
    </div>
  );
}
