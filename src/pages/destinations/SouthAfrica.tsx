import EnhancedHeader from "@/components/EnhancedHeader";
import ResponsiveFooter from "@/components/ResponsiveFooter";
import CountryHero from "@/components/CountryHero";
import AttractionCard from "@/components/AttractionCard";
import CountryDescription from "@/components/CountryDescription";
import CountryGallery from "@/components/CountryGallery";
import TripInspirations from "@/components/TripInspirations";
import { Mountain, Tent, Waves, MapPin } from "lucide-react";

const SouthAfrica = () => {
  return (
    <div className="min-h-screen">
      <EnhancedHeader />
      
      <CountryHero
        title="Luxury South Africa Tours"
        subtitle="tailored to you"
        description="Discover diverse landscapes from dramatic mountains to pristine beaches and world-class wildlife."
        backgroundImage="https://images.unsplash.com/photo-1484318571209-661cf29a69c3?auto=format&fit=crop&w=2070&q=80"
        countrySlug="South Africa"
      />

      <section className="bg-background py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AttractionCard
              icon={Mountain}
              title="TABLE MOUNTAIN"
              subtitle="FOR SCENIC VIEWS"
            />
            <AttractionCard
              icon={Tent}
              title="KRUGER NATIONAL PARK"
              subtitle="FOR BIG FIVE SAFARIS"
            />
            <AttractionCard
              icon={Waves}
              title="GARDEN ROUTE"
              subtitle="FOR COASTAL DRIVES"
            />
            <AttractionCard
              icon={MapPin}
              title="CAPE WINELANDS"
              subtitle="FOR WINE TASTING"
            />
          </div>
        </div>
      </section>

      <CountryDescription
        title="Experience South Africa - A World in One Country!"
        paragraphs={[
          "South Africa offers incredible diversity - from world-class Big Five safaris to cosmopolitan cities, pristine beaches to renowned wine regions. This rainbow nation combines stunning landscapes with rich cultural experiences and excellent infrastructure.",
          "Kruger National Park, one of Africa's largest game reserves, offers excellent wildlife viewing opportunities. Cape Town's dramatic Table Mountain backdrop, vibrant waterfront, and nearby Cape Winelands make it one of the world's most beautiful cities.",
          "The Garden Route provides spectacular coastal scenery, while the Drakensberg Mountains offer hiking and cultural experiences. Combine wildlife safaris with wine tasting, city tours, and beach relaxation all in one destination.",
          "South Africa's diverse experiences, excellent service standards, and value for money make it perfect for first-time safari-goers and seasoned travelers alike."
        ]}
        mainImage="https://images.unsplash.com/photo-1484318571209-661cf29a69c3?auto=format&fit=crop&w=800&q=80"
        smallImage="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=400&q=80"
      />

      <CountryGallery
        images={[
          "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=600&q=80"
        ]}
      />

      <TripInspirations
        trips={[
          {
            image: "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?auto=format&fit=crop&w=600&q=80",
            title: "Cape Town & Winelands",
            description: "Explore the Mother City and taste world-class wines",
            days: "10 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80",
            title: "Kruger Safari Experience",
            description: "Big Five game viewing in legendary Kruger",
            days: "8 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=600&q=80",
            title: "Garden Route Adventure",
            description: "Scenic coastal drive with diverse activities",
            days: "12 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80",
            title: "Drakensberg Highlands",
            description: "Mountain hiking and cultural experiences",
            days: "7 DAYS"
          }
        ]}
      />

      <ResponsiveFooter />
    </div>
  );
};

export default SouthAfrica;