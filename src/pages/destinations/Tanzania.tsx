import EnhancedHeader from "@/components/EnhancedHeader";
import ResponsiveFooter from "@/components/ResponsiveFooter";
import CountryHero from "@/components/CountryHero";
import AttractionCard from "@/components/AttractionCard";
import CountryDescription from "@/components/CountryDescription";
import CountryGallery from "@/components/CountryGallery";
import TripInspirations from "@/components/TripInspirations";
import { Mountain, Tent, Bird, Trees } from "lucide-react";

const Tanzania = () => {
  return (
    <div className="min-h-screen">
      <EnhancedHeader />
      
      <CountryHero
        title="Luxury Tanzania Tours"
        subtitle="tailored to you"
        description="Experience the majestic landscapes of Tanzania, from Kilimanjaro to the Serengeti plains."
        backgroundImage="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2068&q=80"
        countrySlug="Tanzania"
      />

      <section className="bg-background py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AttractionCard
              icon={Mountain}
              title="MOUNT KILIMANJARO"
              subtitle="FOR SUMMIT EXPEDITIONS"
            />
            <AttractionCard
              icon={Tent}
              title="SERENGETI NATIONAL PARK"
              subtitle="FOR THE GREAT MIGRATION"
            />
            <AttractionCard
              icon={Trees}
              title="NGORONGORO CRATER"
              subtitle="FOR WILDLIFE VIEWING"
            />
            <AttractionCard
              icon={Bird}
              title="LAKE MANYARA"
              subtitle="FOR FLAMINGO WATCHING"
            />
          </div>
        </div>
      </section>

      <CountryDescription
        title="Discover Tanzania's Majestic Wonders!"
        paragraphs={[
          "Tanzania is home to some of Africa's most iconic destinations. From the snow-capped peak of Mount Kilimanjaro to the endless plains of the Serengeti, Tanzania offers unparalleled natural beauty and wildlife experiences.",
          "Witness the Great Migration, one of nature's most spectacular events, as millions of wildebeest and zebras cross the Serengeti in search of fresh grazing. Descend into the Ngorongoro Crater, a natural amphitheater teeming with wildlife.",
          "Beyond wildlife, Tanzania's rich cultural heritage, pristine beaches of Zanzibar, and warm hospitality make it a complete destination for discerning travelers.",
          "Our carefully designed tours ensure you experience the very best of Tanzania with expert guides, luxury accommodations, and personalized service throughout your journey."
        ]}
        mainImage="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80"
        smallImage="https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=400&q=80"
      />

      <CountryGallery
        images={[
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=600&q=80"
        ]}
      />

      <TripInspirations
        trips={[
          {
            image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80",
            title: "Serengeti Migration Safari",
            description: "Witness the greatest wildlife show on Earth",
            days: "12 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=600&q=80",
            title: "Kilimanjaro Climb",
            description: "Conquer Africa's highest peak",
            days: "8 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80",
            title: "Ngorongoro Crater Tour",
            description: "Explore the world's largest intact volcanic caldera",
            days: "7 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=600&q=80",
            title: "Zanzibar Beach Extension",
            description: "Relax on paradise beaches after your safari",
            days: "10 DAYS"
          }
        ]}
      />

      <ResponsiveFooter />
    </div>
  );
};

export default Tanzania;