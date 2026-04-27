import EnhancedHeader from "@/components/EnhancedHeader";
import ResponsiveFooter from "@/components/ResponsiveFooter";
import CountryHero from "@/components/CountryHero";
import AttractionCard from "@/components/AttractionCard";
import CountryDescription from "@/components/CountryDescription";
import CountryGallery from "@/components/CountryGallery";
import TripInspirations from "@/components/TripInspirations";
import { Trees, Mountain, Waves, Bird } from "lucide-react";

const Madagascar = () => {
  return (
    <div className="min-h-screen">
      <EnhancedHeader />
      
      <CountryHero
        title="Luxury Madagascar Tours"
        subtitle="tailored to you"
        description="Explore unique wildlife and landscapes found nowhere else on Earth in this biodiversity hotspot."
        backgroundImage="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2070&q=80"
        countrySlug="Madagascar"
      />

      <section className="bg-background py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AttractionCard
              icon={Trees}
              title="AVENUE OF BAOBABS"
              subtitle="FOR ICONIC LANDSCAPES"
            />
            <AttractionCard
              icon={Mountain}
              title="TSINGY DE BEMARAHA"
              subtitle="FOR LIMESTONE FORMATIONS"
            />
            <AttractionCard
              icon={Waves}
              title="NOSY BE"
              subtitle="FOR TROPICAL BEACHES"
            />
            <AttractionCard
              icon={Bird}
              title="ANDASIBE-MANTADIA"
              subtitle="FOR LEMUR WATCHING"
            />
          </div>
        </div>
      </section>

      <CountryDescription
        title="Explore Madagascar - The Eighth Continent!"
        paragraphs={[
          "Madagascar, the world's fourth-largest island, is a biodiversity hotspot unlike anywhere else on Earth. With over 80% of its wildlife found nowhere else, Madagascar offers unique encounters with lemurs, chameleons, and bizarre plants in otherworldly landscapes.",
          "The iconic Avenue of the Baobabs showcases ancient trees up to 800 years old. Tsingy de Bemaraha's 'forest of stones' presents dramatic limestone formations. Lush rainforests, pristine beaches, and diverse ecosystems make every region distinct.",
          "Track various lemur species from tiny mouse lemurs to dancing sifakas. Snorkel in crystal-clear waters, hike through rainforests, and experience a unique blend of African and Asian cultures.",
          "Madagascar's isolation has created a natural laboratory of evolution. Join us to discover this extraordinary destination that feels like another planet."
        ]}
        mainImage="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
        smallImage="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=400&q=80"
      />

      <CountryGallery
        images={[
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=600&q=80"
        ]}
      />

      <TripInspirations
        trips={[
          {
            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
            title: "Lemur Discovery Tour",
            description: "Encounter unique primates in their habitats",
            days: "10 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80",
            title: "Tsingy Adventure",
            description: "Explore dramatic limestone formations",
            days: "8 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=600&q=80",
            title: "Baobab Avenue Tour",
            description: "Photograph the iconic ancient trees",
            days: "7 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80",
            title: "Nosy Be Beach Escape",
            description: "Relax on tropical island paradise",
            days: "6 DAYS"
          }
        ]}
      />

      <ResponsiveFooter />
    </div>
  );
};

export default Madagascar;