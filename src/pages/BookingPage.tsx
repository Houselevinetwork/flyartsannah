import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plane, Calendar, Users, CreditCard, Mail, Phone, User, MapPin, Loader2 } from "lucide-react";
import EnhancedHeader from "@/components/EnhancedHeader";
import { supabase } from "@/integrations/supabase/client";

interface PassengerDetails {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  passportNumber: string;
  passportExpiry: string;
  nationality: string;
}

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedFlight, setSelectedFlight] = useState<any>(null);
  const [currency, setCurrency] = useState<'USD' | 'KES'>('USD');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Contact details
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Passenger details
  const [passengers, setPassengers] = useState<PassengerDetails[]>([{
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    passportNumber: '',
    passportExpiry: '',
    nationality: ''
  }]);

  useEffect(() => {
    const flight = location.state?.selectedFlight;
    if (!flight) {
      toast({
        title: "No flight selected",
        description: "Please select a flight first",
        variant: "destructive",
      });
      navigate('/flights');
      return;
    }
    setSelectedFlight(flight);
  }, [location.state, navigate, toast]);

  const convertPrice = (usdPrice: number) => {
    return currency === 'KES' ? usdPrice * 130 : usdPrice; // Approximate conversion
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  const updatePassenger = (index: number, field: keyof PassengerDetails, value: string) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const handleRequestTicket = async () => {
    // Validation
    if (!email || !phone) {
      toast({
        title: "Missing contact information",
        description: "Please provide your email and phone number",
        variant: "destructive",
      });
      return;
    }

    const isPassengerValid = passengers.every(p => 
      p.firstName && p.lastName && p.dateOfBirth && p.passportNumber
    );

    if (!isPassengerValid) {
      toast({
        title: "Incomplete passenger details",
        description: "Please fill in all passenger information",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate booking reference
      const bookingRef = `FA-${Date.now()}`;
      
      // Save to Supabase
      const { data: booking, error: bookingError } = await (supabase as any)
        .from('bookings')
        .insert({
          booking_reference: bookingRef,
          offer_data: selectedFlight,
          origin_code: selectedFlight.from.code,
          destination_code: selectedFlight.to.code,
          departure_date: new Date().toISOString().split('T')[0],
          base_price_amount: selectedFlight.price,
          base_price_currency: 'USD',
          display_currency: currency,
          total_amount: convertPrice(selectedFlight.price),
          passenger_details: passengers,
          status: 'PENDING_REQUEST',
          email: email,
          phone: phone,
        })
        .select()
        .single();

      if (bookingError) throw bookingError;

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke('send-booking-request', {
        body: {
          bookingReference: bookingRef,
          email: email,
          phone: phone,
          flight: selectedFlight,
          passengers: passengers,
          currency: currency,
          totalAmount: convertPrice(selectedFlight.price),
        }
      });

      if (emailError) {
        console.error('Email error:', emailError);
        // Don't fail the booking if email fails
      }

      toast({
        title: "Booking request submitted!",
        description: `Booking reference: ${bookingRef}. We'll contact you shortly.`,
      });

      // Navigate to confirmation
      navigate('/booking-confirmation', { 
        state: { 
          bookingReference: bookingRef,
          email: email,
          flight: selectedFlight,
          passengers: passengers,
        } 
      });

    } catch (error: any) {
      console.error('Booking error:', error);
      toast({
        title: "Booking failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedFlight) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <EnhancedHeader />
      
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Flight Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="w-5 h-5" />
              Flight Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Route</p>
                <p className="font-semibold">{selectedFlight.from.code} → {selectedFlight.to.code}</p>
                <p className="text-xs text-muted-foreground">{selectedFlight.from.city} to {selectedFlight.to.city}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Airline</p>
                <p className="font-semibold">{selectedFlight.airline}</p>
                <p className="text-xs text-muted-foreground">{selectedFlight.aircraft}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Departure</p>
                <p className="font-semibold">{selectedFlight.departure}</p>
                <p className="text-xs text-muted-foreground">Duration: {selectedFlight.duration}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Currency Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Pricing & Currency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label>Display Currency</Label>
                <Select value={currency} onValueChange={(v) => setCurrency(v as 'USD' | 'KES')}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="KES">KES (KSh)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-3xl font-bold text-primary">
                  {formatPrice(convertPrice(selectedFlight.price))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input 
                id="phone" 
                type="tel" 
                placeholder="+254 XXX XXX XXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Passenger Details */}
        {passengers.map((passenger, index) => (
          <Card key={index} className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Passenger {index + 1} Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>First Name *</Label>
                  <Input 
                    value={passenger.firstName}
                    onChange={(e) => updatePassenger(index, 'firstName', e.target.value)}
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <Label>Last Name *</Label>
                  <Input 
                    value={passenger.lastName}
                    onChange={(e) => updatePassenger(index, 'lastName', e.target.value)}
                    placeholder="Doe"
                    required
                  />
                </div>
                <div>
                  <Label>Date of Birth *</Label>
                  <Input 
                    type="date"
                    value={passenger.dateOfBirth}
                    onChange={(e) => updatePassenger(index, 'dateOfBirth', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>Nationality</Label>
                  <Input 
                    value={passenger.nationality}
                    onChange={(e) => updatePassenger(index, 'nationality', e.target.value)}
                    placeholder="Kenya"
                  />
                </div>
                <div>
                  <Label>Passport Number *</Label>
                  <Input 
                    value={passenger.passportNumber}
                    onChange={(e) => updatePassenger(index, 'passportNumber', e.target.value)}
                    placeholder="A12345678"
                    required
                  />
                </div>
                <div>
                  <Label>Passport Expiry</Label>
                  <Input 
                    type="date"
                    value={passenger.passportExpiry}
                    onChange={(e) => updatePassenger(index, 'passportExpiry', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => navigate(-1)}
          >
            Back to Results
          </Button>
          <Button 
            className="flex-1 bg-[#B08747] hover:bg-[#9A7641]"
            onClick={handleRequestTicket}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Request Ticket
              </>
            )}
          </Button>
        </div>

        {/* Future Payment Note */}
        <Card className="mt-6 border-dashed">
          <CardContent className="pt-6">
            <p className="text-sm text-center text-muted-foreground">
              💳 Online payment via Pesapal coming soon. For now, we'll process your request manually.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingPage;