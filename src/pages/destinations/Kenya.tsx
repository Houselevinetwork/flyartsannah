import EnhancedHeader from "@/components/EnhancedHeader";
import ResponsiveFooter from "@/components/ResponsiveFooter";
import CountryHero from "@/components/CountryHero";
import AttractionCard from "@/components/AttractionCard";
import CountryDescription from "@/components/CountryDescription";
import CountryGallery from "@/components/CountryGallery";
import TripInspirations from "@/components/TripInspirations";
import WhereToGo from "@/components/WhereToGo";
import WhereToStay from "@/components/WhereToStay";
import WhenToVisit from "@/components/WhenToVisit";
import PlanYourTrip from "@/components/PlanYourTrip";
import { Mountain, Waves, Bird, Tent } from "lucide-react";

const Kenya = () => {
  return (
    <div className="min-h-screen">
      <EnhancedHeader />
      
      <CountryHero
        title="Luxury Kenya Tours"
        subtitle="tailored to you"
        description="Explore the captivating wildlife of Kenya on a personalized private tour tailored exclusively for you."
        backgroundImage="https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=2070&q=80"
        countrySlug="Kenya"
      />

      {/* Attractions Section */}
      <section className="bg-background py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AttractionCard
              icon={Tent}
              title="MASAI MARA NATIONAL RESERVE"
              subtitle="FOR A WILDLIFE SAFARI EXPERIENCE"
            />
            <AttractionCard
              icon={Mountain}
              title="MOUNT KENYA"
              subtitle="FOR TREKKING AND HIKING"
            />
            <AttractionCard
              icon={Waves}
              title="DIANI BEACH"
              subtitle="FOR RELAXATION AND WATER SPORTS"
            />
            <AttractionCard
              icon={Bird}
              title="LAKE NAKURU NATIONAL PARK"
              subtitle="FOR BIRD WATCHING AND GAME DRIVES"
            />
          </div>
        </div>
      </section>

      <CountryDescription
        title="Discover the Enchanting Beauty of Kenya!"
        paragraphs={[
          "Fly ArtSannah Group invites you to embark on a journey to the mesmerizing land of Kenya, where a plethora of fascinating experiences awaits you. As an experienced travel agency, we understand the importance of creating unforgettable memories that last a lifetime. Our Kenya tour package promises to deliver just that and more!",
          "From the moment you step foot in Kenya, you will be captivated by its unique and diverse culture, stunning landscapes, and rich history. You will embark on an epic safari adventure in the world-renowned Maasai Mara National Reserve, where you can witness the magnificence of the African wildlife in their natural habitat. Our expert guides will take you on a thrilling game drive where you can spot the Big Five, including lions, elephants, leopards, rhinos, and buffalos.",
          "Apart from the wildlife safari, you will have the opportunity to meet and interact with the Maasai community - a unique and vibrant tribe that has preserved their culture and traditions for centuries.",
          "In addition to these activities, you will also visit the beautiful Lake Nakuru National Park, known for its pink flamingos, and the spectacular Mount Kenya - Africa's second-highest mountain.",
          "Join us on this adventure of a lifetime and discover the enchanting beauty of Kenya with Tatis Travel!"
        ]}
        mainImage="https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=800&q=80"
        smallImage="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=400&q=80"
      />

      <CountryGallery
        images={[
          "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80"
        ]}
      />

      <TripInspirations
        trips={[
          {
            image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=600&q=80",
            title: "Classic Kenya Safari",
            description: "7 days exploring Masai Mara and Amboseli National Parks",
            days: "7 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=600&q=80",
            title: "Coastal Escape",
            description: "Relax on pristine beaches of Diani and Watamu",
            days: "5 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80",
            title: "Great Migration Experience",
            description: "Witness the spectacular wildebeest migration",
            days: "10 DAYS"
          },
          {
            image: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=600&q=80",
            title: "Mount Kenya Trekking",
            description: "Adventure to Africa's second highest peak",
            days: "8 DAYS"
          }
        ]}
      />

      <WhereToGo />

      <WhereToStay />

      <WhenToVisit />

      <PlanYourTrip countryName="Kenya" />

      <ResponsiveFooter />
    </div>
  );
};

export default Kenya;