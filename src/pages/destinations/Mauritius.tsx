import EnhancedHeader from "@/components/EnhancedHeader";
import ResponsiveFooter from "@/components/ResponsiveFooter";
import CountryHero from "@/components/CountryHero";
import AttractionCard from "@/components/AttractionCard";
import CountryDescription from "@/components/CountryDescription";
import CountryGallery from "@/components/CountryGallery";
import TripInspirations from "@/components/TripInspirations";
import { Waves, Mountain, Palmtree, Ship } from "lucide-react";

const Mauritius = () => {
  return (
    <div className="min-h-screen">
      <EnhancedHeader />
      
      <CountryHero
        title="Luxury Mauritius Tours"
        subtitle="tailored to you"
        description="Indulge in a tropical paradise with turquoise lagoons, volcanic peaks, and luxury resorts."
        backgroundImage="https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=2074&q=80"
        countrySlug="Mauritius"
      />

      <section className="bg-background py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AttractionCard
              icon={Waves}
              title="BELLE MARE BEACH"
              subtitle="FOR PRISTINE WATERS"
            />
            <AttractionCard
              icon={Mountain}
              title="LE MORNE BRABANT"
              subtitle="FOR HIKING AND VIEWS"
            />
            <AttractionCard
              icon={Palmtree}
              title="BLACK RIVER GORGES"
              subtitle="FOR NATURE TRAILS"
            />
            <AttractionCard
              icon={Ship}
              title="CATAMARAN CRUISES"
              subtitle="FOR SAILING ADVENTURES"
            />
          </div>
        </div>
      </section>

      <CountryDescription
        title="Discover Mauritius - Tropical Luxury Paradise!"
        paragraphs={[
          "Mauritius, a volcanic island in the Indian Ocean, combines natural beauty with luxury hospitality. Crystal-clear lagoons, white sand beaches, and dramatic mountain scenery create the perfect setting for a tropical escape.",
          "Beyond beaches, Mauritius offers diverse experiences. Hike to cascading waterfalls in Black River Gorges National Park, climb the iconic Le Morne Brabant mountain, or explore the colorful capital of Port Louis with its bustling markets and colonial architecture.",
          "The island's multicultural heritage creates a unique fusion of Indian, African, European, and Chinese influences reflected in its cuisine, festivals, and warm hospitality. Water sports enthusiasts enjoy world-class diving, kitesurfing, and deep-sea fishing.",
          "Mauritius combines beach relaxation with adventure, culture, and luxury. It's the perfect destination for honeymooners, families, and anyone seeking an exclusive tropical paradise."
        ]}
        mainImage="https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=800&q=80"
        smallImage="https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=400&q=80"
      />

      <CountryGallery
        images={[
          "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=600&q=80"
        ]}
      />

      <TripInspirations
        trips={[
          {
            image: "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=600&q=80",
            title: "Luxury Resort Experience",
            description: "Stay in world-class beachfront resorts",
            days: "10 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=600&q=80",
            title: "Water Sports Paradise",
            description: "Diving, snorkeling, and water activities",
            days: "7 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
            title: "Le Morne Mountain Trek",
            description: "Hike the UNESCO World Heritage site",
            days: "5 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80",
            title: "Catamaran Adventure",
            description: "Sail to pristine islands and beaches",
            days: "8 DAYS"
          }
        ]}
      />

      <ResponsiveFooter />
    </div>
  );
};

export default Mauritius;