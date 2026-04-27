import { Button } from "@/components/ui/button";
import { 
  Search, 
  User, 
  Menu, 
  Plane, 
  MapPin, 
  Camera, 
  Package, 
  ChevronDown,
  ShoppingBag,
  Car,
  Shirt,
  ShoppingCart,
  LogOut
} from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import AuthDialog from "./AuthDialog";
import { CartDrawer } from "./CartDrawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const EnhancedHeader = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("KE");
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { user, loading, signOut, getInitials } = useAuth();

  const countries = [
    { code: "KE", name: "Kenya", flag: "🇰🇪" },
    { code: "TZ", name: "Tanzania", flag: "🇹🇿" },
    { code: "UG", name: "Uganda", flag: "🇺🇬" },
    { code: "RW", name: "Rwanda", flag: "🇷🇼" },
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  ];

  const flightServices = [
    { name: "Flights", icon: Plane, path: "/multi-reservation?type=flight" },
    { name: "Domestic/Regional Flights", icon: Plane, path: "/multi-reservation?type=domestic" },
    { name: "Fly Destination Packages", icon: Package, path: "/multi-reservation?type=package" },
    { name: "Bush Flights", icon: MapPin, path: "/multi-reservation?type=bush" },
    { name: "Charter Services", icon: Plane, path: "/multi-reservation?type=charter" },
    { name: "Drone Photography", icon: Camera, path: "/multi-reservation?type=drone" },
    { name: "Empty Leg", icon: Plane, path: "/multi-reservation?type=emptyleg" },
  ];

  const commercialWing = [
    { name: "Airplane Models", icon: Plane, path: "/commercial-wing" },
    { name: "Car Models", icon: Car, path: "/commercial-wing" },
    { name: "Merchandise", icon: Shirt, path: "/commercial-wing" },
    { name: "Travel Accessories", icon: ShoppingBag, path: "/commercial-wing" },
  ];

  return (
    <header className="bg-[#2C3E50] border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="text-white">
              <div className="text-xl sm:text-2xl font-bold tracking-wider whitespace-nowrap">
                FLY ARTSANNAH GROUP
              </div>
              <div className="text-xs text-gray-300 uppercase tracking-widest">
                Travel is our Art, Adventure is in our DNA
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Flight Carrier Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('flights')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-white hover:text-[#DEC39B] transition-colors text-sm flex items-center">
                Flight Carrier Services
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {activeDropdown === 'flights' && (
                <div className="absolute top-full left-0 mt-0 w-64 bg-[#2C3E50] rounded-lg shadow-2xl border border-gray-700 py-2 z-50">
                  {flightServices.map((service, index) => {
                    const Icon = service.icon;
                    return (
                      <Link
                        key={index}
                        to={service.path}
                        className="flex items-center px-4 py-3 text-white hover:bg-white/10 hover:text-[#DEC39B] transition-all duration-200"
                      >
                        <Icon className="w-4 h-4 mr-3 text-[#DEC39B]" />
                        {service.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Custom-Make Your Safari */}
            <Link 
              to="/flyartsannah" 
              className="text-white hover:text-[#DEC39B] transition-colors text-sm"
            >
              Custom-Make Your Safari
            </Link>

            {/* Commercial Wing Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('commercial')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-white hover:text-[#DEC39B] transition-colors text-sm flex items-center">
                Commercial Wing
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {activeDropdown === 'commercial' && (
                <div className="absolute top-full left-0 mt-0 w-56 bg-[#2C3E50] rounded-lg shadow-2xl border border-gray-700 py-2 z-50">
                  {commercialWing.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={index}
                        to={item.path}
                        className="flex items-center px-4 py-3 text-white hover:bg-white/10 hover:text-[#DEC39B] transition-all duration-200"
                      >
                        <Icon className="w-4 h-4 mr-3 text-[#DEC39B]" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Global Search */}
            <div className="hidden md:flex relative">
              <div className="flex items-center bg-gray-700 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-gray-300 mr-2" />
                <input
                  type="text"
                  placeholder="Search flights, hotels, tours..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-white placeholder-gray-300 text-sm w-48 focus:outline-none"
                />
              </div>
            </div>

            {/* Country Selector */}
            <div 
              className="relative hidden md:block"
              onMouseEnter={() => setActiveDropdown('country')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
                <span className="text-lg mr-2">
                  {countries.find(c => c.code === selectedCountry)?.flag}
                </span>
                {selectedCountry}
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
              {activeDropdown === 'country' && (
                <div className="absolute top-full right-0 mt-0 w-48 bg-[#2C3E50] rounded-lg shadow-2xl border border-gray-700 py-2 z-50 max-h-64 overflow-y-auto">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => {
                        setSelectedCountry(country.code);
                        setActiveDropdown(null);
                      }}
                      className="flex items-center w-full px-4 py-2 text-white hover:bg-white/10 hover:text-[#DEC39B] transition-all duration-200"
                    >
                      <span className="text-lg mr-3">{country.flag}</span>
                      <span className="flex-1 text-left">{country.name}</span>
                      <span className="text-sm text-gray-400">{country.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart */}
            <button 
              onClick={() => {
                if (!user) setAuthDialogOpen(true);
                else setCartOpen(true);
              }}
              className="hidden md:flex text-white hover:bg-gray-700 p-2 rounded transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>

            {/* Profile */}
            {!loading && (
              user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="hidden md:flex h-9 w-9 rounded-full bg-[#B08747] hover:bg-[#8B6935] text-white font-semibold p-0"
                    >
                      {getInitials()}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-[#2C3E50] border-white/20 text-white z-50">
                    <DropdownMenuItem 
                      onClick={signOut}
                      className="hover:bg-white/10 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hidden md:flex text-white hover:bg-gray-700"
                  onClick={() => setAuthDialogOpen(true)}
                >
                  <User className="w-5 h-5" />
                </Button>
              )
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
            <div className="flex flex-col space-y-3">
              {/* Mobile Search */}
              <div className="flex items-center bg-gray-700 rounded-lg px-3 py-2 mb-4">
                <Search className="w-4 h-4 text-gray-300 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-white placeholder-gray-300 text-sm flex-1 focus:outline-none"
                />
              </div>

              <Link to="/multi-reservation?type=flight" className="text-white hover:text-[#DEC39B] transition-colors py-2">
                Flight Carrier Services
              </Link>
              <Link to="/flyartsannah" className="text-white hover:text-[#DEC39B] transition-colors py-2">
                Custom-Make Your Safari
              </Link>
              <Link to="/commercial-wing" className="text-white hover:text-[#DEC39B] transition-colors py-2">
                Commercial Wing
              </Link>

              {/* Cart & Profile for Mobile */}
              <button 
                onClick={() => {
                  if (!user) setAuthDialogOpen(true);
                  else setCartOpen(true);
                }}
                className="text-white hover:text-[#DEC39B] transition-colors py-2 text-left flex items-center"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
              </button>

              {user ? (
                <button onClick={signOut} className="text-white hover:text-[#DEC39B] transition-colors py-2 text-left flex items-center">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              ) : (
                <button onClick={() => setAuthDialogOpen(true)} className="text-white hover:text-[#DEC39B] transition-colors py-2 text-left flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Profile / Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Auth Dialog */}
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} onAuthRequired={() => setAuthDialogOpen(true)} />
    </header>
  );
};

export default EnhancedHeader;
