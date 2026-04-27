import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Mail, Phone, Plane, ArrowRight } from "lucide-react";
import EnhancedHeader from "@/components/EnhancedHeader";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingReference, email, flight, passengers } = location.state || {};

  if (!bookingReference) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <EnhancedHeader />
      
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Booking Request Received!</h1>
          <p className="text-muted-foreground">
            We've received your booking request and will process it shortly.
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="border-b pb-4">
                <p className="text-sm text-muted-foreground">Booking Reference</p>
                <p className="text-2xl font-bold text-primary">{bookingReference}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Contact Email</p>
                  <p className="font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {email}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Flight Route</p>
                  <p className="font-medium flex items-center gap-2">
                    <Plane className="w-4 h-4" />
                    {flight?.from.code} → {flight?.to.code}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Airline</p>
                  <p className="font-medium">{flight?.airline}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Passengers</p>
                  <p className="font-medium">{passengers?.length || 1} passenger(s)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 bg-blue-50 dark:bg-blue-950 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <ArrowRight className="w-5 h-5" />
              What happens next?
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✅ Confirmation email sent to {email}</li>
              <li>📧 Our team will review your request within 2-4 hours</li>
              <li>💳 You'll receive payment instructions via email</li>
              <li>🎫 Ticket will be issued upon payment confirmation</li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex flex-col md:flex-row gap-4">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
          <Button 
            className="flex-1 bg-[#B08747] hover:bg-[#9A7641]"
            onClick={() => navigate('/flights')}
          >
            Search More Flights
          </Button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Need help? Contact us at{" "}
            <a href="mailto:ops@flyartsannah.com" className="text-primary hover:underline">
              ops@flyartsannah.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;