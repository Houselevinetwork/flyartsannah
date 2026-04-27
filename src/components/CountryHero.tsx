import { Link } from "react-router-dom";

interface CountryHeroProps {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  countrySlug: string;
}

const CountryHero = ({ title, subtitle, description, backgroundImage, countrySlug }: CountryHeroProps) => {
  return (
    <div className="relative w-full h-[60vh] md:h-[60vh] lg:h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/40" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-4">
        <div className="max-w-3xl text-center space-y-8">
          <div className="space-y-1">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white">
              {title}
            </h1>
            <p className="text-5xl md:text-6xl lg:text-7xl font-light italic text-secondary">
              {subtitle}
            </p>
          </div>
          
          <p className="text-white text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-3 text-white/70 text-xs md:text-sm">
          <Link to="/" className="hover:text-white transition-colors">
            Homepage
          </Link>
          <span>/</span>
          <Link to="/destinations" className="hover:text-white transition-colors">
            Destinations
          </Link>
          <span>/</span>
          <span>Africa</span>
          <span>/</span>
          <span className="text-white">{countrySlug}</span>
        </div>
      </div>
    </div>
  );
};

export default CountryHero;