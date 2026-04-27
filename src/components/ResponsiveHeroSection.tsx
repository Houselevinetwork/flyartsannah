import { Button } from "@/components/ui/button";
import { Plane, Menu, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import aviationHero from "@/assets/aviation-hero.jpg";

const ResponsiveHeroSection = () => {
  const [tripType, setTripType] = useState("round-trip");

  return (
    <div className="w-full relative">
      {/* Background Gradient - Desktop/Tablet */}
      <div className="hidden md:block absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B2932] via-[#2E4755] to-[#1B2932]"></div>
        <div className="absolute top-[20%] w-full h-[25%] bg-gradient-to-r from-transparent to-black/40 border border-[#B08747]"></div>
        <div className="absolute top-[60%] w-full h-[25%] bg-gradient-to-r from-transparent to-black/50 border border-[#B08747]"></div>
        <div className="absolute top-[40%] w-full h-[25%] bg-gradient-to-r from-black/50 to-transparent border border-[#B08747]"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[60%] h-[30%] bg-gradient-radial from-black/50 to-transparent border border-[#B08747]"></div>
      </div>

      {/* Mobile Background */}
      <div className="md:hidden absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B2932] via-[#2E4755] to-[#1B2932]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        {/* Header */}
        <div className="w-full px-4 md:px-8 lg:px-16 pt-4 md:pt-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between rounded-2xl">
            <div className="flex items-center overflow-hidden">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-sky-navy to-sky-navy-light rounded-full flex items-center justify-center mr-3">
                <Plane className="w-5 h-5 md:w-6 md:h-6 text-sky-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-white">Fly ArtSannah</h1>
                <p className="text-xs md:text-sm text-white/60">All Things Global Aviation</p>
              </div>
            </div>
            
            <div className="w-10 h-10 bg-[#2E4755] rounded-full p-3 flex flex-col gap-1 md:hidden">
              <div className="w-full h-0.5 bg-white"></div>
              <div className="w-full h-0.5 bg-white"></div>
              <div className="w-full h-0.5 bg-white"></div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#" className="text-white hover:text-[#DEC39B] transition-colors font-medium">
                Charter Flights
              </a>
              <a href="#" className="text-white hover:text-[#DEC39B] transition-colors font-medium">
                Helicopter Tours
              </a>
              <a href="#" className="text-white hover:text-[#DEC39B] transition-colors font-medium">
                Balloon Safaris
              </a>
              <a href="#" className="text-white hover:text-[#DEC39B] transition-colors font-medium">
                Drone Services
              </a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Login
              </Button>
              <Button className="bg-[#B08747] hover:bg-[#9A7641] text-white" size="sm">
                Get Quote
              </Button>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="w-full relative flex flex-col items-center">
          <div className="w-full pb-6 flex flex-col items-center">
            {/* Hero Section */}
            <div className="w-full max-w-7xl px-4 md:px-8 lg:px-16 min-h-[400px] md:min-h-[500px] lg:min-h-[600px] relative flex flex-col">
              <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative overflow-hidden rounded-none md:rounded-2xl">
                {/* Hero Background */}
                <div className="absolute inset-0">
                  <img 
                    src={aviationHero}
                    alt="Premium aviation services"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/48 via-black/30 to-transparent"></div>
                </div>

                {/* Hero Text */}
                <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-8 lg:px-16">
                  <div className="max-w-4xl">
                    <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-light leading-tight mb-4">
                      All paths lead home
                    </h1>
                    <p className="text-white text-sm md:text-lg lg:text-xl font-medium leading-relaxed mb-6 max-w-2xl">
                      Fly to over 16+ destinations across Africa with premium aviation services
                    </p>
                    <div className="inline-flex items-center">
                      <span className="text-white text-base md:text-lg font-normal mr-2">
                        Book now
                      </span>
                      <div className="w-16 md:w-20 h-px bg-[#B08747]"></div>
                    </div>
                  </div>
                </div>

                {/* Carousel Indicator - Desktop */}
                <div className="hidden md:block absolute bottom-8 right-8 w-20 h-6 bg-black/60 rounded-2xl">
                  <div className="flex items-center justify-center h-full gap-1 px-2">
                    <ChevronLeft className="w-3 h-3 text-white border border-white rounded-sm p-0.5" />
                    <div className="w-2 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white/40 rounded-sm"></div>
                    <div className="w-1 h-1 bg-white/40 rounded-sm"></div>
                    <div className="w-1 h-1 bg-white/40 rounded-sm"></div>
                    <div className="w-1 h-1 bg-white/40 rounded-sm"></div>
                    <ChevronRight className="w-3 h-3 text-white border border-white rounded-sm p-0.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form Card */}
            <div className="w-full max-w-4xl px-4 md:px-8 lg:px-16 -mt-16 md:-mt-20 relative z-20">
              <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-8">
                {/* Trip Type Selector */}
                <div className="flex bg-gray-100 rounded-full p-1 mb-6">
                  <button 
                    onClick={() => setTripType("round-trip")}
                    className={`flex-1 py-3 px-4 md:px-6 rounded-full text-sm md:text-base font-medium transition-all ${
                      tripType === "round-trip" 
                        ? "bg-[#2E4755] text-white shadow-md" 
                        : "bg-transparent text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Round trip
                  </button>
                  <button 
                    onClick={() => setTripType("one-way")}
                    className={`flex-1 py-3 px-4 md:px-6 rounded-full text-sm md:text-base font-medium transition-all ${
                      tripType === "one-way" 
                        ? "bg-[#2E4755] text-white shadow-md" 
                        : "bg-transparent text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    One-way
                  </button>
                  <button 
                    onClick={() => setTripType("multi-city")}
                    className={`flex-1 py-3 px-4 md:px-6 rounded-full text-sm md:text-base font-medium transition-all ${
                      tripType === "multi-city" 
                        ? "bg-[#2E4755] text-white shadow-md" 
                        : "bg-transparent text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Multi-city
                  </button>
                </div>

                {/* Form Content */}
                <div className="space-y-6">
                  {/* From/To Section */}
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="flex-1 w-full border-b border-gray-200 pb-3">
                      <div className="text-xl md:text-2xl font-medium text-gray-900">JFK</div>
                      <div className="text-sm md:text-base text-gray-900">New York</div>
                    </div>
                    
                    <div className="w-10 h-10 bg-gray-50 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                      <Plane className="w-6 h-6 text-[#B08747]" />
                    </div>
                    
                    <div className="flex-1 w-full border-b border-gray-200 pb-3">
                      <div className="text-xl md:text-2xl font-medium text-gray-900 text-left md:text-right">To</div>
                      <div className="text-sm md:text-base text-gray-600 text-left md:text-right">Destination</div>
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 border-b border-gray-200 pb-3">
                      <div className="text-base md:text-lg font-medium text-gray-900">Outbound</div>
                      <div className="text-sm md:text-base text-gray-600">Select date</div>
                    </div>
                    <div className="flex-1 border-b border-gray-200 pb-3">
                      <div className="text-base md:text-lg font-medium text-gray-900 text-left md:text-right">Return</div>
                      <div className="text-sm md:text-base text-gray-600 text-left md:text-right">Select date</div>
                    </div>
                  </div>

                  {/* Passengers */}
                  <div className="flex items-center justify-center py-2">
                    <Users className="w-5 h-5 text-gray-900 mr-2" />
                    <span className="text-base md:text-lg font-medium text-[#005F96]">
                      Guests x 1, Economy
                    </span>
                  </div>

                  {/* Search Button */}
                  <Button className="w-full h-12 md:h-14 bg-[#B08747] hover:bg-[#9A7641] text-white font-bold text-base md:text-lg rounded-3xl transition-all hover:scale-105 hover:shadow-lg">
                    Search Flights
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveHeroSection;