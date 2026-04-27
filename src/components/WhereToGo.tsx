import { MapPin, Mountain, Trees, Waves } from "lucide-react";

interface Destination {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
}

const destinations: Destination[] = [
  {
    icon: Mountain,
    title: "Masai Mara",
    subtitle: "National Reserve",
    description: "Witness the Great Migration and experience world-class wildlife viewing in Kenya's most famous reserve.",
  },
  {
    icon: MapPin,
    title: "Amboseli",
    subtitle: "National Park",
    description: "Get up close with elephants against the stunning backdrop of Mount Kilimanjaro.",
  },
  {
    icon: Trees,
    title: "Tsavo",
    subtitle: "East & West",
    description: "Explore Kenya's largest national park, home to the famous red elephants and diverse landscapes.",
  },
  {
    icon: Waves,
    title: "Diani Beach",
    subtitle: "Coastal Paradise",
    description: "Relax on pristine white sand beaches and enjoy world-class water sports on the Indian Ocean.",
  },
];

const WhereToGo = () => {
  return (
    <section className="bg-[hsl(217_91%_20%)] py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white">
            Where to Go
          </h2>
          <p className="text-sm md:text-base text-white/80 font-light max-w-2xl mx-auto">
            Discover the most spectacular destinations Kenya has to offer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {destinations.map((dest, index) => {
            const Icon = dest.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <Icon className="w-12 h-12 text-white mb-4" />
                <h3 className="text-lg font-semibold text-white mb-1">
                  {dest.title}
                </h3>
                <p className="text-sm text-white/60 uppercase tracking-wide mb-3">
                  {dest.subtitle}
                </p>
                <p className="text-sm text-white/80 leading-relaxed">
                  {dest.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhereToGo;