import EnhancedHeader from "@/components/EnhancedHeader";
import ResponsiveFooter from "@/components/ResponsiveFooter";
import CountryHero from "@/components/CountryHero";
import AttractionCard from "@/components/AttractionCard";
import CountryDescription from "@/components/CountryDescription";
import CountryGallery from "@/components/CountryGallery";
import TripInspirations from "@/components/TripInspirations";
import { Waves, Ship, Fish, Palmtree } from "lucide-react";

const Maldives = () => {
  return (
    <div className="min-h-screen">
      <EnhancedHeader />
      
      <CountryHero
        title="Luxury Maldives Tours"
        subtitle="tailored to you"
        description="Escape to paradise with overwater villas and crystal-clear turquoise waters of the Indian Ocean."
        backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2070&q=80"
        countrySlug="Maldives"
      />

      <section className="bg-background py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AttractionCard
              icon={Waves}
              title="MALÉ ATOLLS"
              subtitle="FOR BEACH RELAXATION"
            />
            <AttractionCard
              icon={Ship}
              title="LUXURY CRUISES"
              subtitle="FOR ISLAND HOPPING"
            />
            <AttractionCard
              icon={Fish}
              title="CORAL REEFS"
              subtitle="FOR DIVING ADVENTURES"
            />
            <AttractionCard
              icon={Palmtree}
              title="PRIVATE ISLANDS"
              subtitle="FOR EXCLUSIVE RETREATS"
            />
          </div>
        </div>
      </section>

      <CountryDescription
        title="Experience Maldives - Ultimate Paradise!"
        paragraphs={[
          "The Maldives represents the pinnacle of luxury island getaways. With over 1,000 coral islands scattered across the Indian Ocean, this destination offers unparalleled beauty, privacy, and world-class service in stunning overwater villas.",
          "Crystal-clear turquoise waters, pristine white sand beaches, and vibrant coral reefs create a picture-perfect setting. Each resort typically occupies its own private island, ensuring exclusivity and tranquility.",
          "World-class diving and snorkeling reveal spectacular marine life including manta rays, whale sharks, and colorful tropical fish. Enjoy water sports, spa treatments, and gourmet dining under the stars.",
          "The Maldives is the ultimate romantic destination and the perfect way to end an African safari with pure relaxation and luxury."
        ]}
        mainImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80"
        smallImage="https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=400&q=80"
      />

      <CountryGallery
        images={[
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=600&q=80"
        ]}
      />

      <TripInspirations
        trips={[
          {
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
            title: "Overwater Villa Experience",
            description: "Stay in luxurious overwater bungalows",
            days: "7 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80",
            title: "Diving Paradise",
            description: "Explore world-class dive sites",
            days: "10 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=600&q=80",
            title: "Private Island Retreat",
            description: "Ultimate privacy on exclusive islands",
            days: "5 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=600&q=80",
            title: "Romantic Honeymoon",
            description: "Perfect romantic getaway destination",
            days: "14 DAYS"
          }
        ]}
      />

      <ResponsiveFooter />
    </div>
  );
};

export default Maldives;