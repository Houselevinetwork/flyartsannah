import { Building2, Home, Tent, Hotel } from "lucide-react";

interface Accommodation {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
}

const accommodations: Accommodation[] = [
  {
    icon: Hotel,
    title: "Luxury Lodges",
    subtitle: "5-Star Comfort",
    description: "Experience unparalleled luxury in world-class lodges with stunning views and exceptional service.",
  },
  {
    icon: Tent,
    title: "Tented Camps",
    subtitle: "Authentic Safari",
    description: "Immerse yourself in nature while enjoying comfort and elegance in premium tented accommodations.",
  },
  {
    icon: Building2,
    title: "Boutique Hotels",
    subtitle: "Urban Elegance",
    description: "Stay in carefully selected boutique hotels in Nairobi and coastal areas for a refined experience.",
  },
  {
    icon: Home,
    title: "Private Villas",
    subtitle: "Exclusive Retreats",
    description: "Enjoy privacy and personalized service in exclusive villas with dedicated staff and amenities.",
  },
];

const WhereToStay = () => {
  return (
    <section className="bg-white py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground">
            Where to Stay
          </h2>
          <p className="text-sm md:text-base text-muted-foreground font-light max-w-2xl mx-auto">
            Carefully selected accommodations for every taste and preference
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {accommodations.map((acc, index) => {
            const Icon = acc.icon;
            return (
              <div
                key={index}
                className="bg-muted/30 p-6 rounded-lg border border-border hover:shadow-lg transition-all duration-300 group"
              >
                <Icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {acc.title}
                </h3>
                <p className="text-sm text-muted-foreground uppercase tracking-wide mb-3">
                  {acc.subtitle}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {acc.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhereToStay;