import EnhancedHeader from "@/components/EnhancedHeader";
import ResponsiveFooter from "@/components/ResponsiveFooter";
import CountryHero from "@/components/CountryHero";
import AttractionCard from "@/components/AttractionCard";
import CountryDescription from "@/components/CountryDescription";
import CountryGallery from "@/components/CountryGallery";
import TripInspirations from "@/components/TripInspirations";
import { Waves, Palmtree, Ship, Fish } from "lucide-react";

const Seychelles = () => {
  return (
    <div className="min-h-screen">
      <EnhancedHeader />
      
      <CountryHero
        title="Luxury Seychelles Tours"
        subtitle="tailored to you"
        description="Unwind in an archipelago paradise with pristine beaches, granite boulders, and lush vegetation."
        backgroundImage="https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=2074&q=80"
        countrySlug="Seychelles"
      />

      <section className="bg-background py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AttractionCard
              icon={Waves}
              title="ANSE SOURCE D'ARGENT"
              subtitle="FOR ICONIC BEACHES"
            />
            <AttractionCard
              icon={Palmtree}
              title="VALLÉE DE MAI"
              subtitle="FOR RARE PALM FORESTS"
            />
            <AttractionCard
              icon={Ship}
              title="ISLAND HOPPING"
              subtitle="FOR EXPLORING ISLANDS"
            />
            <AttractionCard
              icon={Fish}
              title="MARINE PARKS"
              subtitle="FOR SNORKELING"
            />
          </div>
        </div>
      </section>

      <CountryDescription
        title="Experience Seychelles - Paradise on Earth!"
        paragraphs={[
          "Seychelles, an archipelago of 115 islands in the Indian Ocean, represents the ultimate tropical paradise. With powder-white beaches, giant granite boulders, and turquoise waters, Seychelles offers a picture-perfect setting for luxury beach holidays.",
          "Anse Source d'Argent on La Digue island is frequently rated among the world's most beautiful beaches. Vallée de Mai on Praslin, a UNESCO World Heritage Site, protects the unique Coco de Mer palms and rare black parrots in primeval forest.",
          "Excellent diving and snorkeling reveal vibrant coral reefs teeming with tropical fish, sea turtles, and rays. Island hopping between Mahé, Praslin, and La Digue showcases diverse landscapes and cultures.",
          "Combine your African safari with a Seychelles beach extension for the perfect blend of adventure and relaxation in this exclusive island paradise."
        ]}
        mainImage="https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=800&q=80"
        smallImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80"
      />

      <CountryGallery
        images={[
          "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=600&q=80"
        ]}
      />

      <TripInspirations
        trips={[
          {
            image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=600&q=80",
            title: "Luxury Island Hopping",
            description: "Explore Mahé, Praslin, and La Digue in style",
            days: "10 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
            title: "Marine Park Adventure",
            description: "Snorkel pristine coral reefs",
            days: "7 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80",
            title: "Vallée de Mai Experience",
            description: "Visit the Garden of Eden UNESCO site",
            days: "5 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=600&q=80",
            title: "Beach Villa Retreat",
            description: "Ultimate luxury in private beachfront villas",
            days: "14 DAYS"
          }
        ]}
      />

      <ResponsiveFooter />
    </div>
  );
};

export default Seychelles;