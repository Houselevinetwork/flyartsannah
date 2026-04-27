import EnhancedHeader from "@/components/EnhancedHeader";
import ResponsiveFooter from "@/components/ResponsiveFooter";
import CountryHero from "@/components/CountryHero";
import AttractionCard from "@/components/AttractionCard";
import CountryDescription from "@/components/CountryDescription";
import CountryGallery from "@/components/CountryGallery";
import TripInspirations from "@/components/TripInspirations";
import { Waves, MapPin, Palmtree, Ship } from "lucide-react";

const Zanzibar = () => {
  return (
    <div className="min-h-screen">
      <EnhancedHeader />
      
      <CountryHero
        title="Luxury Zanzibar Tours"
        subtitle="tailored to you"
        description="Relax on pristine white sand beaches and explore the rich cultural heritage of the Spice Island."
        backgroundImage="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=2070&q=80"
        countrySlug="Zanzibar"
      />

      <section className="bg-background py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AttractionCard
              icon={Waves}
              title="NUNGWI BEACH"
              subtitle="FOR PRISTINE BEACHES"
            />
            <AttractionCard
              icon={MapPin}
              title="STONE TOWN"
              subtitle="FOR CULTURAL EXPLORATION"
            />
            <AttractionCard
              icon={Palmtree}
              title="JOZANI FOREST"
              subtitle="FOR RED COLOBUS MONKEYS"
            />
            <AttractionCard
              icon={Ship}
              title="MNEMBA ATOLL"
              subtitle="FOR DIVING AND SNORKELING"
            />
          </div>
        </div>
      </section>

      <CountryDescription
        title="Discover Zanzibar - The Spice Island!"
        paragraphs={[
          "Zanzibar, the exotic Spice Island, offers pristine white sand beaches, crystal-clear turquoise waters, and a rich cultural heritage spanning centuries. This tropical paradise is the perfect destination for relaxation after an African safari or as a standalone beach holiday.",
          "Explore the UNESCO World Heritage Site of Stone Town with its winding alleys, historic buildings, and bustling markets. Discover why Zanzibar is called the Spice Island on a guided spice tour through fragrant plantations.",
          "The island's marine life is equally spectacular. Snorkel or dive in the coral reefs around Mnemba Atoll, swim with dolphins, or simply relax on powder-soft beaches under swaying palm trees.",
          "Experience Zanzibar's unique blend of African, Arab, and European influences in its culture, cuisine, and architecture. Let us create your perfect island escape."
        ]}
        mainImage="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80"
        smallImage="https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=400&q=80"
      />

      <CountryGallery
        images={[
          "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80"
        ]}
      />

      <TripInspirations
        trips={[
          {
            image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=600&q=80",
            title: "Beach Paradise Package",
            description: "Luxury beach resorts and water sports",
            days: "7 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80",
            title: "Stone Town Cultural Tour",
            description: "Explore the historic heart of Zanzibar",
            days: "5 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=600&q=80",
            title: "Spice Tour Experience",
            description: "Discover the island's aromatic heritage",
            days: "4 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
            title: "Diving & Snorkeling",
            description: "Explore vibrant coral reefs and marine life",
            days: "6 DAYS"
          }
        ]}
      />

      <ResponsiveFooter />
    </div>
  );
};

export default Zanzibar;