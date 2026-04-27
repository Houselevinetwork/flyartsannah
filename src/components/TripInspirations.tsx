import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TripCard {
  image: string;
  title: string;
  description: string;
  days: string;
}

interface TripInspirationsProps {
  trips: TripCard[];
}

const TripInspirations = ({ trips }: TripInspirationsProps) => {
  const navigate = useNavigate();

  const handleVisitNow = () => {
    navigate('/trip-detail/kenya-adventure');
  };

  return (
    <>
      <section className="bg-white py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          {/* Header */}
          <div className="text-center mb-8 md:mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground">
              Trip inspirations
            </h2>
            <p className="text-sm md:text-base text-muted-foreground font-light max-w-2xl mx-auto">
              Get inspired by our example trips. Our travel designers have curated an
              exclusive collection of trips to some of the most spectacular destinations.
            </p>
          </div>

          {/* Trip Cards - Horizontal Scroll */}
          <div className="relative">
            <div className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar pb-4">
              {trips.map((trip, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[280px] md:w-[320px] lg:w-[350px] relative"
                >
                  <div className="relative h-[400px] md:h-[450px]">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Card Content Overlay */}
                    <div className="absolute bottom-0 left-6 right-6 mb-6">
                      <div className="bg-white/50 backdrop-blur-sm border border-[#EDEDED] p-4 space-y-4">
                        {/* Days Badge */}
                        <div className="flex items-center justify-center gap-1">
                          <Clock className="w-5 h-5 text-foreground" />
                          <span className="text-xs font-bold text-foreground uppercase tracking-wide">
                            {trip.days}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg md:text-xl font-light text-foreground text-center leading-relaxed">
                          {trip.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs md:text-sm text-foreground text-center leading-relaxed">
                          {trip.description}
                        </p>

                        {/* Visit Now Button */}
                        <div className="flex justify-center pt-2">
                          <button
                            onClick={handleVisitNow}
                            className="px-6 py-2 border border-foreground text-foreground text-xs font-bold uppercase tracking-wide rounded-full hover:bg-foreground hover:text-white transition-all duration-300"
                          >
                            VISIT NOW
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <div className="w-2 h-2 rounded-full bg-border opacity-30"></div>
              <div className="w-2 h-2 rounded-full bg-border opacity-30"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TripInspirations;