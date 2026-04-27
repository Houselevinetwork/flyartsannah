import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Users, CreditCard, User, Mail, Phone, CheckCircle } from "lucide-react";
import EnhancedHeader from "@/components/EnhancedHeader";
import ResponsiveFooter from "@/components/ResponsiveFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function HotelBooking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [bookingStep, setBookingStep] = useState<"details" | "payment" | "confirmation">("details");
  const [isProcessing, setIsProcessing] = useState(false);

  // Booking details from URL
  const hotelName = searchParams.get("hotelName") || "";
  const cityCode = searchParams.get("cityCode") || "";
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const guests = parseInt(searchParams.get("guests") || "1");
  const price = searchParams.get("price") || "0";
  const currency = searchParams.get("currency") || "USD";
  const roomType = searchParams.get("roomType") || "";
  const nights = parseInt(searchParams.get("nights") || "1");

  // Form states
  const [guestDetails, setGuestDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const handleGuestDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestDetails.firstName || !guestDetails.lastName || !guestDetails.email || !guestDetails.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    setBookingStep("payment");
    toast.success("Guest details saved");
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentDetails.cardNumber || !paymentDetails.cardName || !paymentDetails.expiryDate || !paymentDetails.cvv) {
      toast.error("Please fill in all payment details");
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setBookingStep("confirmation");
    toast.success("Booking confirmed!");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <EnhancedHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Results
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {bookingStep === "details" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Guest Details
                  </CardTitle>
                  <CardDescription>Please provide your contact information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleGuestDetailsSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={guestDetails.firstName}
                          onChange={(e) => setGuestDetails({ ...guestDetails, firstName: e.target.value })}
                          placeholder="John"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={guestDetails.lastName}
                          onChange={(e) => setGuestDetails({ ...guestDetails, lastName: e.target.value })}
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={guestDetails.email}
                        onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                        placeholder="john.doe@example.com"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={guestDetails.phone}
                        onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                        placeholder="+1 234 567 8900"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Continue to Payment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {bookingStep === "payment" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Details
                  </CardTitle>
                  <CardDescription>Enter your payment information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Cardholder Name *</Label>
                      <Input
                        id="cardName"
                        value={paymentDetails.cardName}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cardName: e.target.value })}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        value={paymentDetails.cardNumber}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input
                          id="expiryDate"
                          value={paymentDetails.expiryDate}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          type="password"
                          value={paymentDetails.cvv}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                          placeholder="123"
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setBookingStep("details")}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button type="submit" className="flex-1" disabled={isProcessing}>
                        {isProcessing ? "Processing..." : `Pay ${currency} ${price}`}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {bookingStep === "confirmation" && (
              <Card className="border-green-500/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-6 h-6" />
                    Booking Confirmed!
                  </CardTitle>
                  <CardDescription>Your reservation has been successfully completed</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      A confirmation email has been sent to <strong>{guestDetails.email}</strong>
                    </p>
                  </div>
                  
                  <div className="space-y-3 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Booking Reference</span>
                      <span className="font-semibold">
                        {Math.random().toString(36).substring(2, 10).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Guest Name</span>
                      <span className="font-semibold">
                        {guestDetails.firstName} {guestDetails.lastName}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Hotel</span>
                      <span className="font-semibold">{hotelName}</span>
                    </div>
                  </div>

                  <Button onClick={() => navigate("/")} className="w-full mt-6">
                    Return to Home
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg mb-2">{hotelName}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{cityCode}</span>
                  </div>
                </div>

                <div className="space-y-3 py-4 border-y border-border">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 mt-0.5 text-primary" />
                    <div className="flex-1 text-sm">
                      <div className="font-medium">Check-in</div>
                      <div className="text-muted-foreground">{formatDate(checkIn)}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 mt-0.5 text-primary" />
                    <div className="flex-1 text-sm">
                      <div className="font-medium">Check-out</div>
                      <div className="text-muted-foreground">{formatDate(checkOut)}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-4 h-4 mt-0.5 text-primary" />
                    <div className="flex-1 text-sm">
                      <div className="font-medium">Guests</div>
                      <div className="text-muted-foreground">
                        {guests} {guests === 1 ? "Guest" : "Guests"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Room Type</div>
                  <div className="text-sm text-muted-foreground">{roomType}</div>
                </div>

                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {currency} {(parseFloat(price) / nights).toFixed(2)} × {nights} {nights === 1 ? "night" : "nights"}
                    </span>
                    <span className="font-medium">{currency} {price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxes & fees</span>
                    <span className="font-medium">{currency} {(parseFloat(price) * 0.15).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
                    <span>Total</span>
                    <span className="text-primary">
                      {currency} {(parseFloat(price) * 1.15).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <ResponsiveFooter />
    </div>
  );
}
