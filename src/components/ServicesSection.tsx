import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plane, Camera, Hotel, MapPin, Car, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Modal Component
const ServiceModal = ({
  service,
  onClose,
}: {
  service: any;
  onClose: () => void;
}) => {
  if (!service) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-3xl shadow-xl max-w-3xl w-full mx-4 p-8 relative"
          initial={{ y: "100vh" }}
          animate={{ y: 0 }}
          exit={{ y: "100vh" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 font-bold text-2xl"
          >
            &times;
          </button>

          <h2 className="text-4xl font-semibold text-gray-900 mb-4">{service.title}</h2>
          <p className="text-gray-600 mb-8">{service.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={() =>
                window.open(
                  `https://wa.me/254700000000?text=I%20would%20like%20to%20${service.action.toLowerCase()}`,
                  "_blank"
                )
              }
              className="bg-green-500 hover:bg-green-600 text-white w-full"
            >
              Book via WhatsApp
            </Button>
            <Button
              onClick={() =>
                (window.location.href = `mailto:info@flyartsannah.com?subject=${service.action}&body=Hello, I would like to ${service.action.toLowerCase()}`)
              }
              className="bg-blue-500 hover:bg-blue-600 text-white w-full"
            >
              Book via Email
            </Button>
            <Button
              onClick={() => (window.location.href = "tel:+254700000000")}
              className="bg-gray-800 hover:bg-gray-900 text-white w-full"
            >
              Book via Phone
            </Button>
          </div>

          {service.id === 3 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2">Sannah's Portfolio & Schedule</h3>
              <p className="text-gray-600">
                Schedule a session via WhatsApp, Email, or Phone. Sannah's work and availability
                can be discussed directly with her through your chosen method.
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<any>(null);

  const services = [
    {
      id: 1,
      title: "Premium Flight Services",
      description: "Experience luxury travel with our personalized flight booking services",
      image:
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
      icon: Plane,
      action: "Book Flight",
    },
    {
      id: 2,
      title: "Hotel & Accommodation",
      description: "Stay connected with complimentary Wi-Fi and premium amenities",
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      icon: Hotel,
      action: "Book Hotel",
    },
    {
      id: 3,
      title: "Aerial Photography",
      description: "Capture breathtaking moments with our professional drone services",
      image:
        "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      icon: Camera,
      action: "Book Session",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[#DEC39B] text-6xl md:text-7xl font-light mb-4">Services</h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Discover the benefits of Fly ArtSannah's comprehensive travel solutions
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <Button
                    onClick={() => setSelectedService(service)}
                    variant="outline"
                    className="w-full border-[#2E4755] text-[#2E4755] hover:bg-[#2E4755] hover:text-white transition-all duration-300"
                  >
                    {service.action}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Render Modal */}
        {selectedService && (
          <ServiceModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}

        {/* Commercial Wing Section */}
        <div className="mt-20 bg-gradient-to-r from-[#2E4755] to-[#1B2932] rounded-3xl p-8 md:p-12 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-white text-4xl md:text-5xl font-light mb-6">
              Visit Our <span className="text-[#DEC39B]">Commercial Wing</span>
            </h3>
            <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Explore our exclusive collection of airplane models, aviation memorabilia, 
              luxury car models, and premium travel accessories.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                  <Plane className="w-8 h-8 text-[#DEC39B]" />
                </div>
                <p className="text-white text-sm">Airplane Models</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                  <Car className="w-8 h-8 text-[#DEC39B]" />
                </div>
                <p className="text-white text-sm">Car Collection</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package className="w-8 h-8 text-[#DEC39B]" />
                </div>
                <p className="text-white text-sm">Aviation Gear</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-8 h-8 text-[#DEC39B]" />
                </div>
                <p className="text-white text-sm">Travel Accessories</p>
              </div>
            </div>
            
            <Button 
              onClick={() => window.location.href = '/commercial-wing'}
              className="bg-[#B08747] hover:bg-[#9A7641] text-white px-8 py-3 rounded-xl font-semibold text-lg"
            >
              Shop Collection
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
