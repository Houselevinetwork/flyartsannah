import { Plane, ExternalLink, Mail, MessageCircle, Check } from "lucide-react";
import type { FlightOffer } from "@/lib/amadeus-api";
import { getAirlineName } from "@/lib/airline-names";

interface BookingPanelProps {
  selectedFlight: FlightOffer | null;
  currency: string;
  totalPrice: number;
  selectedCabin: "economy" | "business" | "first";
}

const getAirlineWebsite = (airlineCode: string): string => {
  const airlineWebsites: Record<string, string> = {
    "KQ": "https://www.kenya-airways.com",
    "BA": "https://www.britishairways.com",
    "EK": "https://www.emirates.com",
    "QR": "https://www.qatarairways.com",
    "ET": "https://www.ethiopianairlines.com",
    "LH": "https://www.lufthansa.com",
    "AF": "https://www.airfrance.com",
    "KL": "https://www.klm.com",
    "TK": "https://www.turkishairlines.com",
    "EY": "https://www.etihad.com",
    "SV": "https://www.saudia.com",
    "MS": "https://www.egyptair.com",
  };
  return airlineWebsites[airlineCode] || `https://www.google.com/search?q=${airlineCode}+airline+official+website`;
};

export const BookingPanel = ({ selectedFlight, currency, totalPrice, selectedCabin }: BookingPanelProps) => {
  const serviceFee = totalPrice * 0.07;
  const finalPrice = totalPrice + serviceFee;
  const airlineCode = selectedFlight?.validatingAirlineCodes[0] || "";
  const airlineWebsite = getAirlineWebsite(airlineCode);

  if (!selectedFlight) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-sm sticky top-6 p-6">
        <div className="text-center text-muted-foreground">
          <Plane className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">Select a flight to see booking options</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm sticky top-6">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Plane className="w-5 h-5" />
          Flight Summary
        </h3>

        {selectedFlight ? (
          <div className="space-y-4">
            <div className="text-sm space-y-2 pb-4 border-b border-border">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Airline</span>
                <span className="font-medium">{getAirlineName(airlineCode)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Class</span>
                <span className="font-medium capitalize">{selectedCabin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Base Price</span>
                <span className="font-medium">
                  {currency} {totalPrice.toFixed(0)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Booking Options</h4>

              {/* Book Directly with Airline */}
              <a 
                href={airlineWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-secondary text-secondary-foreground p-4 rounded-lg hover:bg-secondary/80 transition-colors text-left block"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Book with {getAirlineName(airlineCode)}</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Book directly on the airline's website
                </p>
              </a>

              {/* Book Through Agency */}
              <div className="bg-accent/5 border border-accent/20 p-4 rounded-lg">
                <h5 className="font-semibold mb-2 flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent" />
                  Book with Fly ArtSannah
                </h5>
                
                <div className="space-y-1 text-xs text-muted-foreground mb-3">
                  <div className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-accent mt-0.5 flex-shrink-0" />
                    <span>24/7 personalized support</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-accent mt-0.5 flex-shrink-0" />
                    <span>Flexible rebooking assistance</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-accent mt-0.5 flex-shrink-0" />
                    <span>Travel insurance options</span>
                  </div>
                </div>

                <div className="border-t border-border pt-3 mb-3 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base Fare</span>
                    <span className="font-medium">
                      {currency} {totalPrice.toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Service Fee (7%)</span>
                    <span>{currency} {serviceFee.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t pt-2 mt-2">
                    <span>Total</span>
                    <span>
                      {currency} {finalPrice.toFixed(0)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a 
                    href="https://wa.me/254786929964"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-primary text-primary-foreground px-4 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                  <a 
                    href="mailto:fly@artsannah.com"
                    className="flex-1 bg-primary text-primary-foreground px-4 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
