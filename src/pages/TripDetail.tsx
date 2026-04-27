import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import EnhancedHeader from "@/components/EnhancedHeader";
import ResponsiveFooter from "@/components/ResponsiveFooter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const TripDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isPlanningOpen, setIsPlanningOpen] = useState(false);

  // Accommodation data by destination
  const accommodationsByDestination: Record<string, { name: string; location: string; image: string }[]> = {
    kenya: [
      { name: "Angama Mara", location: "KENYA", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80" },
      { name: "Alfajiri Villas", location: "KENYA", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80" },
    ],
    tanzania: [
      { name: "Singita Sasakwa Lodge", location: "TANZANIA", image: "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?auto=format&fit=crop&w=800&q=80" },
      { name: "Ngorongoro Crater Lodge", location: "TANZANIA", image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80" },
    ],
    uganda: [
      { name: "Sanctuary Gorilla Forest Camp", location: "UGANDA", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80" },
      { name: "Clouds Mountain Gorilla Lodge", location: "UGANDA", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80" },
    ],
    rwanda: [
      { name: "Bisate Lodge", location: "RWANDA", image: "https://images.unsplash.com/photo-1621414050345-53db43f7e7ab?auto=format&fit=crop&w=800&q=80" },
      { name: "Virunga Lodge", location: "RWANDA", image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80" },
    ],
    zanzibar: [
      { name: "The Residence Zanzibar", location: "ZANZIBAR", image: "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=800&q=80" },
      { name: "Zuri Zanzibar", location: "ZANZIBAR", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80" },
    ],
    madagascar: [
      { name: "Constance Tsarabanjina", location: "MADAGASCAR", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80" },
      { name: "Anjajavy Le Lodge", location: "MADAGASCAR", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80" },
    ],
    maldives: [
      { name: "Soneva Fushi", location: "MALDIVES", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80" },
      { name: "Gili Lankanfushi", location: "MALDIVES", image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80" },
    ],
    mauritius: [
      { name: "One&Only Le Saint Géran", location: "MAURITIUS", image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=800&q=80" },
      { name: "Shanti Maurice Resort", location: "MAURITIUS", image: "https://images.unsplash.com/photo-1540202403-b7abd6747a18?auto=format&fit=crop&w=800&q=80" },
    ],
    seychelles: [
      { name: "North Island Lodge", location: "SEYCHELLES", image: "https://images.unsplash.com/photo-1589990733024-ab0c0c7e2f61?auto=format&fit=crop&w=800&q=80" },
      { name: "Four Seasons Seychelles", location: "SEYCHELLES", image: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&w=800&q=80" },
    ],
    southafrica: [
      { name: "Singita Sabi Sand", location: "SOUTH AFRICA", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80" },
      { name: "Royal Malewane", location: "SOUTH AFRICA", image: "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?auto=format&fit=crop&w=800&q=80" },
    ],
    zambia: [
      { name: "Chinzombo Camp", location: "ZAMBIA", image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80" },
      { name: "Time + Tide King Lewanika", location: "ZAMBIA", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80" },
    ],
    zimbabwe: [
      { name: "Singita Pamushana Lodge", location: "ZIMBABWE", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80" },
      { name: "Matetsi River Lodge", location: "ZIMBABWE", image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80" },
    ],
  };

  // Detect destination from slug
  const getDestination = (slug: string | undefined): string => {
    if (!slug) return "kenya";
    const lowerSlug = slug.toLowerCase();
    if (lowerSlug.includes("kenya")) return "kenya";
    if (lowerSlug.includes("tanzania")) return "tanzania";
    if (lowerSlug.includes("uganda")) return "uganda";
    if (lowerSlug.includes("rwanda")) return "rwanda";
    if (lowerSlug.includes("zanzibar")) return "zanzibar";
    if (lowerSlug.includes("madagascar")) return "madagascar";
    if (lowerSlug.includes("maldives")) return "maldives";
    if (lowerSlug.includes("mauritius")) return "mauritius";
    if (lowerSlug.includes("seychelles")) return "seychelles";
    if (lowerSlug.includes("south") || lowerSlug.includes("africa")) return "southafrica";
    if (lowerSlug.includes("zambia")) return "zambia";
    if (lowerSlug.includes("zimbabwe")) return "zimbabwe";
    return "kenya";
  };

  const destination = getDestination(slug);
  const accommodations = accommodationsByDestination[destination] || accommodationsByDestination.kenya;

  // Mock trip data - in a real app, fetch based on slug
  const tripData = {
    title: "Adventure of a Lifetime in Kenya & Zanzibar",
    days: "10 DAYS",
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1200&q=80",
    description: "Embark on the adventure of a lifetime as you explore the stunning beauty of Kenya and Zanzibar.",
    longDescription: [
      "Start your journey in the vibrant capital city of Nairobi, where you can visit the iconic Nairobi National Park and get up close to majestic lions, giraffes, and elephants. Then head to the world-famous Maasai Mara Reserve, known for its annual wildebeest migration. Embark on exhilarating game drives and witness the Big Five – lions, leopards, elephants, rhinos, and buffalos – in their natural habitat.",
      "For a romantic escape by the beach, explore Kenya's stunning coastline. Relax on pristine white sand beaches in Malindi or snorkel amidst colorful coral reefs in Diani Beach. Don't miss out on visiting Lamu Island with its charming Swahili architecture and rich cultural heritage.",
    ],
    highlights: [
      "Safari",
      "Nairobi National Park",
      "Explore Nairobi City",
      "Luxury Lodges",
      "Walking Safaris",
      "Night Safaris",
      "Scenic flight over the Masai Mara",
      "Pristine Beaches",
      "Water Sports Activities",
      "Underwater Adventure",
    ],
  };

  const handleSubmitPlan = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Planning Request Sent!",
      description: "Our travel experts will contact you soon to plan your perfect trip.",
    });
    setIsPlanningOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <EnhancedHeader />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-screen">
        <img
          src={tripData.image}
          alt={tripData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-white" />
              <span className="text-white text-sm md:text-base font-bold uppercase tracking-wide">
                {tripData.days}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-4 md:mb-6">
              {tripData.title}
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-3xl mb-6 md:mb-8">
              {tripData.description}
            </p>
            <Button
              size="lg"
              onClick={() => setIsPlanningOpen(true)}
              className="bg-white text-primary hover:bg-white/90 text-sm md:text-base font-bold uppercase tracking-wide px-8 py-6"
            >
              Start Planning
            </Button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-card py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            {/* Image */}
            <div className="relative h-[400px] md:h-[600px]">
              <img
                src={tripData.image}
                alt="Safari"
                className="w-full h-full object-cover rounded-lg shadow-[var(--shadow-elegant)]"
              />
            </div>

            {/* Details */}
            <div className="space-y-6 md:space-y-8">
              {tripData.longDescription.map((paragraph, index) => (
                <p key={index} className="text-sm md:text-base text-foreground/80 leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {/* Highlights */}
              <div className="pt-4">
                <h3 className="text-xl md:text-2xl font-light text-foreground mb-6">
                  Trip Highlights
                </h3>
                <div className="flex flex-wrap gap-3">
                  {tripData.highlights.map((highlight, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="px-4 py-2 text-sm border-border text-foreground hover:bg-muted/50 transition-[var(--transition-smooth)]"
                    >
                      <MapPin className="w-3 h-3 mr-2" />
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                size="lg"
                onClick={() => setIsPlanningOpen(true)}
                className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-wide px-12 py-6"
              >
                Start Planning
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Where to Stay Section */}
      <section className="bg-muted py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground">
              Where to stay
            </h2>
            <p className="text-sm md:text-base text-muted-foreground font-light italic max-w-2xl mx-auto">
              There are many wonderful places to stay in this trip. Here are just a few of our favourites, selected by our travel designers:
            </p>
          </div>

          {/* Accommodation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {accommodations.map((accommodation, index) => (
              <div key={index} className="relative h-[350px] md:h-[280px] rounded-lg overflow-hidden group cursor-pointer">
                <img
                  src={accommodation.image}
                  alt={accommodation.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="space-y-2 mb-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs font-bold tracking-widest uppercase">{accommodation.location}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-light italic">{accommodation.name}</h3>
                  </div>
                  <p className="text-xs font-bold tracking-widest underline">DISCOVER MORE</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planning Dialog */}
      <Dialog open={isPlanningOpen} onOpenChange={setIsPlanningOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl font-light">
              Plan Your Trip
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitPlan} className="space-y-6 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" required placeholder="Enter your full name" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input id="email" type="email" required placeholder="your.email@example.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="travelers">Number of Travelers *</Label>
                <Input id="travelers" type="number" min="1" required placeholder="2" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="travel-date">Preferred Travel Date</Label>
                <Input id="travel-date" type="date" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Special Requests or Questions</Label>
              <Textarea
                id="message"
                rows={4}
                placeholder="Tell us about your preferences, dietary requirements, or any special requests..."
              />
            </div>

            <div className="flex flex-col md:flex-row gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-wide py-6"
              >
                Send Planning Request
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPlanningOpen(false)}
                className="flex-1 py-6"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <ResponsiveFooter />
    </div>
  );
};

export default TripDetail;