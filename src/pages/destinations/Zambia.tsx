import EnhancedHeader from "@/components/EnhancedHeader";
import ResponsiveFooter from "@/components/ResponsiveFooter";
import CountryHero from "@/components/CountryHero";
import AttractionCard from "@/components/AttractionCard";
import CountryDescription from "@/components/CountryDescription";
import CountryGallery from "@/components/CountryGallery";
import TripInspirations from "@/components/TripInspirations";
import { Waves, Tent, Bird, Trees } from "lucide-react";

const Zambia = () => {
  return (
    <div className="min-h-screen">
      <EnhancedHeader />
      
      <CountryHero
        title="Luxury Zambia Tours"
        subtitle="tailored to you"
        description="Witness the thundering Victoria Falls and explore pristine wilderness in the heart of Africa."
        backgroundImage="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=2071&q=80"
        countrySlug="Zambia"
      />

      <section className="bg-background py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AttractionCard
              icon={Waves}
              title="VICTORIA FALLS"
              subtitle="FOR WATERFALL VIEWING"
            />
            <AttractionCard
              icon={Tent}
              title="SOUTH LUANGWA"
              subtitle="FOR WALKING SAFARIS"
            />
            <AttractionCard
              icon={Trees}
              title="LOWER ZAMBEZI"
              subtitle="FOR RIVER SAFARIS"
            />
            <AttractionCard
              icon={Bird}
              title="KAFUE NATIONAL PARK"
              subtitle="FOR WILDLIFE SPOTTING"
            />
          </div>
        </div>
      </section>

      <CountryDescription
        title="Explore Wild Zambia - The Real Africa!"
        paragraphs={[
          "Zambia offers authentic African safari experiences in some of the continent's most pristine wilderness areas. Home to the mighty Victoria Falls, one of the Seven Natural Wonders of the World, Zambia combines spectacular natural beauty with exceptional wildlife viewing.",
          "South Luangwa National Park pioneered the walking safari concept and remains one of Africa's best destinations for this intimate wildlife experience. The Lower Zambezi offers thrilling canoe safaris along the Zambezi River, while Kafue National Park provides vast wilderness and diverse ecosystems.",
          "Zambia's remote safari camps offer exclusive experiences with excellent guiding and a focus on conservation. The country's low visitor numbers mean you'll often have wildlife sightings all to yourself.",
          "Experience the thundering spray of Victoria Falls, walk with elephants in South Luangwa, and paddle alongside hippos in the Zambezi - Zambia promises adventure at every turn."
        ]}
        mainImage="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80"
        smallImage="https://images.unsplash.com/photo-1621544185249-0725c02b8bf1?auto=format&fit=crop&w=400&q=80"
      />

      <CountryGallery
        images={[
          "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1621544185249-0725c02b8bf1?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=600&q=80"
        ]}
      />

      <TripInspirations
        trips={[
          {
            image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80",
            title: "Victoria Falls Adventure",
            description: "Experience the smoke that thunders",
            days: "8 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1621544185249-0725c02b8bf1?auto=format&fit=crop&w=600&q=80",
            title: "Walking Safari Package",
            description: "Track wildlife on foot in South Luangwa",
            days: "10 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80",
            title: "Zambezi Canoe Safari",
            description: "Paddle the mighty Zambezi River",
            days: "7 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=600&q=80",
            title: "Kafue Wilderness",
            description: "Explore Zambia's largest national park",
            days: "9 DAYS"
          }
        ]}
      />

      <ResponsiveFooter />
    </div>
  );
};

export default Zambia;