import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ImprovedDealsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  const destinations = [
    { id: 1, name: "Kenya", slug: "kenya", image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=2070&q=80", price: "USD 1,299" },
    { id: 2, name: "Uganda", slug: "uganda", image: "https://images.unsplash.com/photo-1551918120-9739cb430c6d?auto=format&fit=crop&w=2070&q=80", price: "USD 2,299" },
    { id: 3, name: "Tanzania", slug: "tanzania", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2068&q=80", price: "USD 1,499" },
    { id: 4, name: "Rwanda", slug: "rwanda", image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=2036&q=80", price: "USD 2,099" },
    { id: 5, name: "Zanzibar", slug: "zanzibar", image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=2070&q=80", price: "USD 999" },
    { id: 6, name: "Maldives", slug: "maldives", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2070&q=80", price: "USD 1,599" },
    { id: 7, name: "Zambia", slug: "zambia", image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=2071&q=80", price: "USD 1,799" },
    { id: 8, name: "Zimbabwe", slug: "zimbabwe", image: "https://images.unsplash.com/photo-1621544185249-0725c02b8bf1?auto=format&fit=crop&w=2070&q=80", price: "USD 1,699" },
    { id: 9, name: "South Africa", slug: "south-africa", image: "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?auto=format&fit=crop&w=2070&q=80", price: "USD 1,399" },
    { id: 10, name: "Madagascar", slug: "madagascar", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2070&q=80", price: "USD 1,899" },
    { id: 11, name: "Seychelles", slug: "seychelles", image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=2074&q=80", price: "USD 1,799" },
    { id: 12, name: "Mauritius", slug: "mauritius", image: "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=2074&q=80", price: "USD 1,499" },
  ];

  const nextSlide = () => {
    const next = (currentSlide + 1) % destinations.length;
    setCurrentSlide(next);
    scrollToSlide(next);
  };

  const prevSlide = () => {
    const prev = (currentSlide - 1 + destinations.length) % destinations.length;
    setCurrentSlide(prev);
    scrollToSlide(prev);
  };

  const scrollToSlide = (index) => {
    const cardWidth = carouselRef.current.children[0].offsetWidth + 24; // 24 = gap
    carouselRef.current.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  };

  const startDrag = (e) => {
    setIsDragging(true);
    setStartX(e.pageX || e.touches[0].pageX);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    const x = e.pageX || e.touches[0].pageX;
    const walk = x - startX;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    scrollToSlide(currentSlide);
  }, [currentSlide]);

  return (
    <section className="relative bg-gradient-to-br from-[8] via-[#2E4755] to-[#1B2932] py-24 -mt-[20vh] z-[60] rounded-t-[40px] shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-white text-5xl md:text-6xl font-light mb-1">
              <span className="text-[#DEC39B] border-b border-[#DEC39B]">Fly to Destination</span> Packages
            </h2>
            <p className="text-white text-lg md:text-xl font-medium">Let us inspire your next adventure</p>
          </div>
          <button className="text-white text-lg border-b border-[#B08747] pb-1 hover:text-[#DEC39B] transition-colors">
            View all
          </button>
        </div>

        {/* Deals Carousel */}
        <div
          className="relative h-[500px] overflow-x-auto no-scrollbar cursor-grab flex items-center gap-6 mt-4"
          ref={carouselRef}
          onMouseDown={startDrag}
          onMouseMove={onDrag}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          onTouchStart={startDrag}
          onTouchMove={onDrag}
          onTouchEnd={stopDrag}
        >
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              className="flex-shrink-0 w-[80%] sm:w-[45%] md:w-[38%] lg:w-[32%] h-[324px] relative cursor-pointer rounded-2xl overflow-hidden shadow-2xl"
              onClick={() => navigate(`/destinations/${destination.slug}`)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-2xl"></div>
              <div className="absolute top-4 left-4 px-3 py-1 bg-[#2E4755]/70 backdrop-blur-sm rounded text-white text-sm">
                Package Deal
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-[#DEC39B] text-2xl font-medium mb-2">{destination.name}</h3>
                <div className="flex items-center space-x-2 text-white text-sm">
                  <span>from</span>
                  <span className="font-medium">{destination.price}</span>

                </div>
                <p className="text-white/80 text-xs mt-2">Click to view details</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center space-x-8 mt-8">
          <button
            onClick={prevSlide}
            className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex space-x-3">
            {destinations.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? "w-8 bg-[#B08747]"
                    : "w-3 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ImprovedDealsSection;
