interface CountryDescriptionProps {
  title: string;
  paragraphs: string[];
  mainImage: string;
  smallImage?: string;
}

const CountryDescription = ({ title, paragraphs, mainImage, smallImage }: CountryDescriptionProps) => {
  return (
    <section className="bg-white py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground leading-relaxed">
              {title}
            </h2>
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-sm md:text-base text-muted-foreground font-light leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Images */}
          <div className="w-full lg:w-1/2 relative">
            <img
              src={mainImage}
              alt="Destination"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            {smallImage && (
              <img
                src={smallImage}
                alt="Destination detail"
                className="absolute -bottom-6 -right-6 w-1/3 h-auto rounded-lg shadow-xl hidden md:block"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountryDescription;
