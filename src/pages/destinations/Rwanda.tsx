import EnhancedHeader from "@/components/EnhancedHeader";
import ResponsiveFooter from "@/components/ResponsiveFooter";
import CountryHero from "@/components/CountryHero";
import AttractionCard from "@/components/AttractionCard";
import CountryDescription from "@/components/CountryDescription";
import CountryGallery from "@/components/CountryGallery";
import TripInspirations from "@/components/TripInspirations";
import { Trees, Mountain, Bird, Tent } from "lucide-react";

const Rwanda = () => {
  return (
    <div className="min-h-screen">
      <EnhancedHeader />
      
      <CountryHero
        title="Luxury Rwanda Tours"
        subtitle="tailored to you"
        description="Encounter mountain gorillas in their natural habitat and explore the land of a thousand hills."
        backgroundImage="https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=2036&q=80"
        countrySlug="Rwanda"
      />

      <section className="bg-background py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AttractionCard
              icon={Trees}
              title="VOLCANOES NATIONAL PARK"
              subtitle="FOR GORILLA TREKKING"
            />
            <AttractionCard
              icon={Mountain}
              title="MOUNT BISOKE"
              subtitle="FOR VOLCANO HIKING"
            />
            <AttractionCard
              icon={Tent}
              title="AKAGERA NATIONAL PARK"
              subtitle="FOR BIG FIVE SAFARIS"
            />
            <AttractionCard
              icon={Bird}
              title="NYUNGWE FOREST"
              subtitle="FOR CHIMPANZEE TRACKING"
            />
          </div>
        </div>
      </section>

      <CountryDescription
        title="Experience Rwanda - Land of a Thousand Hills!"
        paragraphs={[
          "Rwanda, known as the Land of a Thousand Hills, offers one of Africa's most exclusive wildlife experiences - mountain gorilla trekking. Trek through misty forests in Volcanoes National Park to encounter these magnificent primates in their natural habitat.",
          "Beyond gorillas, Rwanda surprises visitors with its pristine landscapes, from the volcanic peaks of the Virunga Mountains to the savannahs of Akagera National Park, home to the Big Five. The country's remarkable transformation and warm hospitality make it a compelling destination.",
          "Nyungwe Forest offers another primate adventure with chimpanzee tracking and canopy walks through ancient rainforest. Lake Kivu's serene shores provide the perfect place to relax after your adventures.",
          "Join us to discover why Rwanda is becoming one of Africa's premier luxury safari destinations."
        ]}
        mainImage="https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=800&q=80"
        smallImage="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=400&q=80"
      />

      <CountryGallery
        images={[
          "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1551918120-9739cb430c6d?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=600&q=80"
        ]}
      />

      <TripInspirations
        trips={[
          {
            image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=600&q=80",
            title: "Gorilla Trekking Experience",
            description: "Track mountain gorillas in Volcanoes National Park",
            days: "6 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1551918120-9739cb430c6d?auto=format&fit=crop&w=600&q=80",
            title: "Akagera Safari",
            description: "Big Five safari in Rwanda's savannah park",
            days: "5 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80",
            title: "Nyungwe Forest Adventure",
            description: "Chimpanzee tracking and canopy walks",
            days: "4 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80",
            title: "Lake Kivu Relaxation",
            description: "Unwind on the shores of beautiful Lake Kivu",
            days: "3 DAYS"
          }
        ]}
      />

      <ResponsiveFooter />
    </div>
  );
};

export default Rwanda;