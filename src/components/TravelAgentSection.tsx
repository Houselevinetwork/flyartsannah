import { Button } from "@/components/ui/button";

const TravelAgentSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-[#2C3E50] to-[#34495E] py-16 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      />
      
      {/* Diagonal overlay */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent transform skew-x-12 origin-top-right"></div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="max-w-2xl">
          <h2 className="text-white text-4xl md:text-5xl font-light mb-6">
            Be Your Own <span className="text-[#DEC39B]">Travel Agent</span>
          </h2>
          <p className="text-white/90 text-lg md:text-xl mb-8 leading-relaxed">
            Skip the jet lag and turn one holiday into two. Customize your safari experience 
            and get a complimentary two-night stay in one of Africa's most beautiful destinations.
          </p>
          <Button 
            onClick={() => window.location.href = '/safari-builder'}
            className="bg-transparent border-2 border-[#DEC39B] text-[#DEC39B] hover:bg-[#DEC39B] hover:text-[#2C3E50] px-8 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            Customize Your Safari
          </Button>
        </div>
      </div>
      
      {/* Decorative cityscape silhouette */}
      <div className="absolute right-0 bottom-0 w-1/3 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
    </section>
  );
};

export default TravelAgentSection;