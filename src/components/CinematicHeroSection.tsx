import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Phone, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import HeroFlightSearch from "@/components/HeroFlightSearch";
import { FaInstagram, FaFacebookF, FaTiktok, FaWhatsapp } from "react-icons/fa";

const CinematicHeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2070&q=80",
      title: "Safari Adventure",
      subtitle: "Explore the wild heart of Africa, from USD 1,299*",
      location: "Maasai Mara, Kenya",
    },
    {
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2070&q=80",
      title: "Beach Vacation",
      subtitle: "Discover tropical paradise, from USD 1,599*",
      location: "Maldives",
    },
    {
      url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2070&q=80",
      title: "Fly to Destination Packages",
      subtitle: "Premium flight experiences worldwide, from USD 769*",
      location: "Global Destinations",
    },
    {
      url: "https://images.unsplash.com/photo-1583884952012-b9894b1c62e1?auto=format&fit=crop&w=2070&q=80",
      title: "Commercial Wing",
      subtitle: "Exclusive aviation collectibles and models",
      location: "Shop Collection",
    },
    {
      url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2070&q=80",
      title: "Custom Make Your Itinerary",
      subtitle: "Personalized travel experiences tailored for you",
      location: "Start Planning",
    },
    {
      url: "https://images.unsplash.com/photo-1551918120-9739cb430c6d?auto=format&fit=crop&w=2070&q=80",
      title: "Gorilla Trekking",
      subtitle: "Unforgettable encounters in the wild, from USD 2,299*",
      location: "Rwanda & Uganda",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  const prevImage = () =>
    setCurrentImageIndex(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length
    );

  const currentImage = heroImages[currentImageIndex];

  return (
    <section className="relative h-screen flex flex-col overflow-hidden rounded-[50px] md:rounded-[80px] bg-[var(--theme-bg-color)]">
      {/* Top Image Section */}
      <div className="relative h-[60%] w-full overflow-hidden rounded-t-[50px] md:rounded-t-[80px]">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.65)), url('${image.url}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        ))}

        {/* Foreground Text & Controls */}
        <div className="absolute inset-0 flex flex-col justify-center items-start px-6 sm:px-10 md:px-16 text-left z-10">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight mb-3 drop-shadow-lg"
          >
            {currentImage.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-white/90 text-base sm:text-lg md:text-xl font-medium mb-2 drop-shadow-md"
          >
            {currentImage.subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-white/70 text-sm sm:text-base drop-shadow-md mb-6"
          >
            📍 {currentImage.location}
          </motion.p>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={prevImage}
              className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-all rounded-full border border-white/30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex space-x-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? "bg-white scale-125"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextImage}
              className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-all rounded-full border border-white/30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Colored Section */}
      <div className="h-[10%] bg-[var(--theme-bg-color)] rounded-b-[10px] md:rounded-b-[100px] mb-[25px]" />

      {/* Reservation Card */}
      <div className="absolute top-[44%] left-0 w-full flex justify-center z-20">
        <HeroFlightSearch />
      </div>

      {/* Left Side Social Icons - Vertical on mobile, Horizontal on desktop */}
      <div className="absolute top-[75%] md:top-[56%] left-3 md:left-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-5 text-white z-30">
        <a
          href="https://www.instagram.com/flyartsannah"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white hover:scale-110 transition-all opacity-80 hover:opacity-100"
        >
          <FaInstagram size={24} />
        </a>
        <a
          href="https://www.facebook.com/flyartsannah"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white hover:scale-110 transition-all opacity-80 hover:opacity-100"
        >
          <FaFacebookF size={22} />
        </a>
        <a
          href="https://www.tiktok.com/@flyartsannah"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white hover:scale-110 transition-all opacity-80 hover:opacity-100"
        >
          <FaTiktok size={22} />
        </a>
      </div>

      {/* Right Side Contact Icons - Vertical on mobile, Horizontal on desktop */}
      <div className="absolute top-[75%] md:top-[56%] right-3 md:right-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-5 text-white z-30">
        <a
          href="https://wa.me/254786929964"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-400 hover:scale-110 transition-all opacity-80 hover:opacity-100"
        >
          <FaWhatsapp size={24} />
        </a>
        <a
          href="tel:+254786929964"
          className="hover:text-white hover:scale-110 transition-all opacity-80 hover:opacity-100"
        >
          <Phone size={22} />
        </a>
        <a
          href="mailto:fly@artsannah.com"
          className="hover:text-white hover:scale-110 transition-all opacity-80 hover:opacity-100"
        >
          <Mail size={22} />
        </a>
      </div>
    </section>
  );
};

export default CinematicHeroSection;