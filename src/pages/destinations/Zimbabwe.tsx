import EnhancedHeader from "@/components/EnhancedHeader";
import ResponsiveFooter from "@/components/ResponsiveFooter";
import CountryHero from "@/components/CountryHero";
import AttractionCard from "@/components/AttractionCard";
import CountryDescription from "@/components/CountryDescription";
import CountryGallery from "@/components/CountryGallery";
import TripInspirations from "@/components/TripInspirations";
import { Waves, Mountain, Tent, Trees } from "lucide-react";

const Zimbabwe = () => {
  return (
    <div className="min-h-screen">
      <EnhancedHeader />
      
      <CountryHero
        title="Luxury Zimbabwe Tours"
        subtitle="tailored to you"
        description="Experience ancient ruins, magnificent waterfalls, and incredible wildlife in this diverse nation."
        backgroundImage="https://images.unsplash.com/photo-1621544185249-0725c02b8bf1?auto=format&fit=crop&w=2070&q=80"
        countrySlug="Zimbabwe"
      />

      <section className="bg-background py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AttractionCard
              icon={Waves}
              title="VICTORIA FALLS"
              subtitle="FOR ADVENTURE ACTIVITIES"
            />
            <AttractionCard
              icon={Mountain}
              title="GREAT ZIMBABWE RUINS"
              subtitle="FOR HISTORICAL EXPLORATION"
            />
            <AttractionCard
              icon={Tent}
              title="HWANGE NATIONAL PARK"
              subtitle="FOR ELEPHANT VIEWING"
            />
            <AttractionCard
              icon={Trees}
              title="MANA POOLS"
              subtitle="FOR WALKING SAFARIS"
            />
          </div>
        </div>
      </section>

      <CountryDescription
        title="Discover Zimbabwe - Land of Great Stone Houses!"
        paragraphs={[
          "Zimbabwe offers a perfect blend of natural wonders, wildlife, and ancient history. From the thundering Victoria Falls to the mysterious Great Zimbabwe ruins, this diverse nation captivates visitors with its rich heritage and stunning landscapes.",
          "Hwange National Park, one of Africa's largest game reserves, hosts massive elephant herds and diverse wildlife. Mana Pools, a UNESCO World Heritage Site, is renowned for walking safaris and canoe trips along the Zambezi River, offering intimate wildlife encounters.",
          "The Great Zimbabwe ruins stand as testament to a sophisticated ancient civilization, while the granite kopjes of Matobo Hills hold both historical and spiritual significance.",
          "Experience Zimbabwe's warm hospitality, exceptional guiding, and conservation success stories. Join us to explore this remarkable destination that combines adventure, culture, and natural beauty."
        ]}
        mainImage="https://images.unsplash.com/photo-1621544185249-0725c02b8bf1?auto=format&fit=crop&w=800&q=80"
        smallImage="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=400&q=80"
      />

      <CountryGallery
        images={[
          "https://images.unsplash.com/photo-1621544185249-0725c02b8bf1?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=600&q=80"
        ]}
      />

      <TripInspirations
        trips={[
          {
            image: "https://images.unsplash.com/photo-1621544185249-0725c02b8bf1?auto=format&fit=crop&w=600&q=80",
            title: "Victoria Falls Experience",
            description: "Witness the world's largest waterfall",
            days: "7 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80",
            title: "Hwange Safari",
            description: "See massive elephant herds in action",
            days: "10 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80",
            title: "Mana Pools Walking Safari",
            description: "Walk with wildlife in pristine wilderness",
            days: "8 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=600&q=80",
            title: "Great Zimbabwe Tour",
            description: "Explore ancient stone city ruins",
            days: "5 DAYS"
          }
        ]}
      />

      <ResponsiveFooter />
    </div>
  );
};

export default Zimbabwe;