import { useRef } from "react";

interface CountryGalleryProps {
  images: string[];
}

const CountryGallery = ({ images }: CountryGalleryProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-gradient-to-br from-[#f9f8f3] to-[#f0ede5] py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground">
            Gallery
          </h2>
          <p className="text-sm md:text-base text-muted-foreground font-light max-w-2xl mx-auto">
            Discover with us. Unforgettable experiences and seamless journeys await.
          </p>
        </div>

        {/* Gallery Scroll - Uniform heights */}
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto no-scrollbar pb-4 scroll-smooth"
        >
          {images.map((image, index) => {
            // Create a more uniform pattern with varied heights
            const heights = ["320px", "280px", "400px", "360px"];
            const height = heights[index % heights.length];
            
            return (
              <div
                key={index}
                className="flex-shrink-0 w-[280px] md:w-[320px] lg:w-[380px]"
                style={{ height }}
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                />
              </div>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-8 h-2 rounded-full bg-accent"></div>
          <div className="w-2 h-2 rounded-full bg-border opacity-30"></div>
          <div className="w-2 h-2 rounded-full bg-border opacity-30"></div>
        </div>
      </div>
    </section>
  );
};

export default CountryGallery;