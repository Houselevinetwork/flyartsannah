import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EnhancedHeader from "@/components/EnhancedHeader";
import MultiReservationSystem from "@/components/MultiReservationSystem";
import ResponsiveFooter from "@/components/ResponsiveFooter";

const MultiReservation = () => {
  const [searchParams] = useSearchParams();
  const [reservationType, setReservationType] = useState("hotels");

  useEffect(() => {
    const type = searchParams.get("type");
    if (type) {
      setReservationType(type);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <EnhancedHeader />
      
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#1B2932] via-[#2E4755] to-[#1B2932]">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Multi-Service Reservation
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Book flights, hotels, transfers, and exclusive aviation experiences all in one place
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">✈️ Instant Booking</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">🏨 Best Rates</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">🚁 Exclusive Experiences</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">📞 24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      <MultiReservationSystem />
      <ResponsiveFooter />
    </div>
  );
};

export default MultiReservation;