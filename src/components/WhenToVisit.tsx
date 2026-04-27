import { Calendar, Sun, Cloud, Droplets } from "lucide-react";

interface Season {
  icon: React.ElementType;
  title: string;
  months: string;
  description: string;
  highlights: string[];
}

const seasons: Season[] = [
  {
    icon: Sun,
    title: "Dry Season",
    months: "June - October",
    description: "Best time for wildlife viewing with minimal rainfall and pleasant temperatures.",
    highlights: ["Great Migration", "Clear skies", "Excellent game viewing"],
  },
  {
    icon: Calendar,
    title: "Short Rains",
    months: "November - December",
    description: "Light rains refresh the landscape, fewer tourists, and competitive prices.",
    highlights: ["Lush landscapes", "Bird watching", "Lower rates"],
  },
  {
    icon: Droplets,
    title: "Long Rains",
    months: "March - May",
    description: "Green season with occasional afternoon showers and dramatic scenery.",
    highlights: ["Dramatic skies", "Newborn animals", "Best prices"],
  },
  {
    icon: Cloud,
    title: "Warm & Dry",
    months: "January - February",
    description: "Hot and dry, perfect for beach holidays and continued wildlife viewing.",
    highlights: ["Beach weather", "Calving season", "Clear visibility"],
  },
];

const WhenToVisit = () => {
  return (
    <section className="bg-[hsl(217_91%_20%)] py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white">
            When to Visit
          </h2>
          <p className="text-sm md:text-base text-white/80 font-light max-w-2xl mx-auto">
            Kenya is a year-round destination with unique experiences in every season
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {seasons.map((season, index) => {
            const Icon = season.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <Icon className="w-12 h-12 text-white mb-4" />
                <h3 className="text-xl font-semibold text-white mb-1">
                  {season.title}
                </h3>
                <p className="text-sm text-white/60 uppercase tracking-wide mb-3">
                  {season.months}
                </p>
                <p className="text-sm text-white/80 leading-relaxed mb-4">
                  {season.description}
                </p>
                <ul className="space-y-2">
                  {season.highlights.map((highlight, idx) => (
                    <li key={idx} className="text-xs text-white/70 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhenToVisit;