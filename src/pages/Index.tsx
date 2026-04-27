import EnhancedHeader from "@/components/EnhancedHeader";
import CinematicHeroSection from "@/components/CinematicHeroSection";
import ImprovedDealsSection from "@/components/ImprovedDealsSection";
import TravelAgentSection from "@/components/TravelAgentSection";
import ServicesSection from "@/components/ServicesSection";
import AviationMagazineSection from "@/components/AviationMagazineSection";
import ResponsiveFooter from "@/components/ResponsiveFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B2932] via-[#2E4755] to-[#1B2932]">
      <EnhancedHeader />
      <CinematicHeroSection />
      <ImprovedDealsSection />
      <TravelAgentSection />
      <ServicesSection />
      <AviationMagazineSection />
      <ResponsiveFooter />
    </div>
  );
};

export default Index;
