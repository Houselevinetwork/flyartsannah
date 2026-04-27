import EnhancedHeader from "@/components/EnhancedHeader";
import ResponsiveFooter from "@/components/ResponsiveFooter";
import CountryHero from "@/components/CountryHero";
import AttractionCard from "@/components/AttractionCard";
import CountryDescription from "@/components/CountryDescription";
import CountryGallery from "@/components/CountryGallery";
import TripInspirations from "@/components/TripInspirations";
import { Mountain, Trees, Bird, Tent } from "lucide-react";

const Uganda = () => {
  return (
    <div className="min-h-screen">
      <EnhancedHeader />
      
      <CountryHero
        title="Luxury Uganda Tours"
        subtitle="tailored to you"
        description="Discover the pearl of Africa with our exclusive gorilla trekking and wildlife safari experiences."
        backgroundImage="https://images.unsplash.com/photo-1551918120-9739cb430c6d?auto=format&fit=crop&w=2070&q=80"
        countrySlug="Uganda"
      />

      <section className="bg-background py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AttractionCard
              icon={Trees}
              title="BWINDI IMPENETRABLE FOREST"
              subtitle="FOR GORILLA TREKKING"
            />
            <AttractionCard
              icon={Mountain}
              title="RWENZORI MOUNTAINS"
              subtitle="FOR MOUNTAINEERING"
            />
            <AttractionCard
              icon={Tent}
              title="QUEEN ELIZABETH NATIONAL PARK"
              subtitle="FOR WILDLIFE SAFARIS"
            />
            <AttractionCard
              icon={Bird}
              title="MURCHISON FALLS"
              subtitle="FOR WATERFALL VIEWING"
            />
          </div>
        </div>
      </section>

      <CountryDescription
        title="Experience the Pearl of Africa!"
        paragraphs={[
          "Uganda, known as the Pearl of Africa, offers some of the most remarkable wildlife experiences on the continent. Home to more than half of the world's remaining mountain gorillas, Uganda provides an unparalleled opportunity for gorilla trekking in the misty forests of Bwindi.",
          "Beyond gorillas, Uganda boasts incredible biodiversity. From the snow-capped Rwenzori Mountains to the vast savannahs of Queen Elizabeth National Park, every corner reveals natural wonders. The thundering Murchison Falls and the serene waters of Lake Victoria add to Uganda's diverse landscapes.",
          "Our expertly crafted tours ensure you experience the best of Uganda's wildlife, culture, and natural beauty in comfort and safety.",
          "Join us for an unforgettable journey through the heart of Africa, where adventure and discovery await at every turn."
        ]}
        mainImage="https://images.unsplash.com/photo-1551918120-9739cb430c6d?auto=format&fit=crop&w=800&q=80"
        smallImage="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=400&q=80"
      />

      <CountryGallery
        images={[
          "https://images.unsplash.com/photo-1551918120-9739cb430c6d?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=600&q=80"
        ]}
      />

      <TripInspirations
        trips={[
          {
            image: "https://images.unsplash.com/photo-1551918120-9739cb430c6d?auto=format&fit=crop&w=600&q=80",
            title: "Gorilla Trekking Adventure",
            description: "Track mountain gorillas in Bwindi Impenetrable Forest",
            days: "7 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80",
            title: "Rwenzori Mountains Trek",
            description: "Climb the legendary Mountains of the Moon",
            days: "10 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80",
            title: "Wildlife Safari Package",
            description: "Explore Queen Elizabeth and Murchison Falls parks",
            days: "8 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=600&q=80",
            title: "Chimpanzee Tracking",
            description: "Meet our closest relatives in Kibale Forest",
            days: "5 DAYS"
          }
        ]}
      />

      <ResponsiveFooter />
    </div>
  );
};

export default Uganda;