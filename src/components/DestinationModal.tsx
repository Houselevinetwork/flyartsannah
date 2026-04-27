import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Destination {
  name: string;
  country: string;
  path: string;
  image: string;
  description: string;
}

const destinations: Destination[] = [
  { name: "Kenya", country: "East Africa", path: "/destinations/kenya", image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=400&q=80", description: "Safari paradise" },
  { name: "Uganda", country: "East Africa", path: "/destinations/uganda", image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=400&q=80", description: "Pearl of Africa" },
  { name: "Tanzania", country: "East Africa", path: "/destinations/tanzania", image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&q=80", description: "Serengeti plains" },
  { name: "Rwanda", country: "East Africa", path: "/destinations/rwanda", image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&q=80", description: "Land of a thousand hills" },
  { name: "Zambia", country: "Southern Africa", path: "/destinations/zambia", image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&q=80", description: "Victoria Falls" },
  { name: "Zimbabwe", country: "Southern Africa", path: "/destinations/zimbabwe", image: "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?w=400&q=80", description: "Ancient ruins" },
  { name: "Seychelles", country: "Indian Ocean", path: "/destinations/seychelles", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80", description: "Island paradise" },
  { name: "Mauritius", country: "Indian Ocean", path: "/destinations/mauritius", image: "https://images.unsplash.com/photo-1601815505483-45e0a59c0fab?w=400&q=80", description: "Tropical luxury" },
  { name: "Maldives", country: "Indian Ocean", path: "/destinations/maldives", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80", description: "Crystal waters" },
  { name: "Zanzibar", country: "Tanzania", path: "/destinations/zanzibar", image: "https://images.unsplash.com/photo-1505881502353-a1986add3762?w=400&q=80", description: "Spice island" },
  { name: "Madagascar", country: "Indian Ocean", path: "/destinations/madagascar", image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&q=80", description: "Unique wildlife" },
];

interface DestinationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredDestinations = destinations.filter((dest) =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDestinationClick = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="bg-gradient-to-br from-card via-card to-card/95 rounded-3xl shadow-2xl border-2 border-accent/30 max-w-6xl w-full max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary via-primary/90 to-primary p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
              
              <div className="relative flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-4xl font-['Playfair_Display'] text-primary-foreground font-bold mb-2">
                    Luxury Destinations
                  </h2>
                  <p className="text-primary-foreground/80 text-lg font-['Cormorant_Garamond']">
                    Select your dream destination
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-3 hover:bg-primary-foreground/10 rounded-full transition-all hover:rotate-90 duration-300"
                >
                  <X className="w-7 h-7 text-primary-foreground" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search destinations..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 backdrop-blur-sm transition-all"
                />
              </div>
            </div>

            {/* Destinations Grid */}
            <div className="p-8 overflow-y-auto max-h-[calc(85vh-240px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDestinations.map((destination, index) => (
                  <motion.div
                    key={destination.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    onClick={() => handleDestinationClick(destination.path)}
                    className="group cursor-pointer relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-2xl font-['Playfair_Display'] font-bold text-white mb-1">
                            {destination.name}
                          </h3>
                          <p className="text-sm text-white/80 font-['Cormorant_Garamond'] flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {destination.country}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-white/70 font-['Cormorant_Garamond'] italic">
                        {destination.description}
                      </p>
                    </div>

                    {/* Hover Accent */}
                    <motion.div
                      className="absolute inset-0 border-2 border-accent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                  </motion.div>
                ))}
              </div>

              {filteredDestinations.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg font-['Cormorant_Garamond']">
                    No destinations found matching "{searchQuery}"
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};