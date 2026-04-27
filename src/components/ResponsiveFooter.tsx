import { Plane, Mail, Phone, MapPin, Instagram, Twitter, Facebook, Linkedin } from "lucide-react";
import { FaPinterest, FaTiktok, FaThreads } from "react-icons/fa6";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ResponsiveFooter = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showCookies, setShowCookies] = useState(false);

  return (
    <>
      <footer className="bg-[#1B2932] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#B08747] to-[#9A7641] rounded-full flex items-center justify-center mr-3">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">FLY ARTSANNAH</h3>
                  <p className="text-sm text-gray-400">All Things Global Aviation</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Experience luxury aviation with premium charter flights, helicopter tours, balloon safaris, and drone services across Africa and beyond.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#2E4755] rounded-full flex items-center justify-center hover:bg-[#B08747] transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#2E4755] rounded-full flex items-center justify-center hover:bg-[#B08747] transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#2E4755] rounded-full flex items-center justify-center hover:bg-[#B08747] transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#2E4755] rounded-full flex items-center justify-center hover:bg-[#B08747] transition-colors">
                  <FaPinterest className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#2E4755] rounded-full flex items-center justify-center hover:bg-[#B08747] transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#2E4755] rounded-full flex items-center justify-center hover:bg-[#B08747] transition-colors">
                  <FaTiktok className="w-5 h-5" />
                </a>
                <a href="https://threads.net" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#2E4755] rounded-full flex items-center justify-center hover:bg-[#B08747] transition-colors">
                  <FaThreads className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-[#DEC39B]">Services</h4>
              <ul className="space-y-3">
                <li><a href="/multi-reservation?type=charter" className="text-gray-300 hover:text-[#DEC39B] transition-colors">Charter Flights</a></li>
                <li><a href="/multi-reservation?type=helicopter" className="text-gray-300 hover:text-[#DEC39B] transition-colors">Helicopter Tours</a></li>
                <li><a href="/multi-reservation?type=balloon" className="text-gray-300 hover:text-[#DEC39B] transition-colors">Balloon Safaris</a></li>
                <li><a href="/multi-reservation?type=drone" className="text-gray-300 hover:text-[#DEC39B] transition-colors">Drone Services</a></li>
                <li><a href="/safari-builder" className="text-gray-300 hover:text-[#DEC39B] transition-colors">Custom Safari Builder</a></li>
                <li><a href="/commercial-wing" className="text-gray-300 hover:text-[#DEC39B] transition-colors">Commercial Wing</a></li>
              </ul>
            </div>

            {/* Destinations */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-[#DEC39B]">Popular Destinations</h4>
              <ul className="space-y-3">
                <li><a href="/#destinations" className="text-gray-300 hover:text-[#DEC39B] transition-colors">Kenya</a></li>
                <li><a href="/#destinations" className="text-gray-300 hover:text-[#DEC39B] transition-colors">Uganda</a></li>
                <li><a href="/#destinations" className="text-gray-300 hover:text-[#DEC39B] transition-colors">Tanzania</a></li>
                <li><a href="/#destinations" className="text-gray-300 hover:text-[#DEC39B] transition-colors">Rwanda</a></li>
                <li><a href="/#destinations" className="text-gray-300 hover:text-[#DEC39B] transition-colors">South Africa</a></li>
                <li><a href="/#destinations" className="text-gray-300 hover:text-[#DEC39B] transition-colors">Maldives</a></li>
                <li><a href="/#destinations" className="text-gray-300 hover:text-[#DEC39B] transition-colors">Zanzibar</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-[#DEC39B]">Contact Us</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#B08747] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm">
                      Kenya, East Africa
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-[#B08747] flex-shrink-0" />
                  <p className="text-gray-300 text-sm">+254 747 596 768</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-[#B08747] flex-shrink-0" />
                  <p className="text-gray-300 text-sm">travel@flyartsannah.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm text-center md:text-left">
                © 2025 Fly ArtSannah. All rights reserved. Premium aviation services across Africa.
              </div>
              <div className="flex space-x-6 text-sm">
                <button onClick={() => setShowPrivacy(true)} className="text-gray-400 hover:text-[#DEC39B] transition-colors">
                  Privacy Policy
                </button>
                <button onClick={() => setShowTerms(true)} className="text-gray-400 hover:text-[#DEC39B] transition-colors">
                  Terms of Service
                </button>
                <button onClick={() => setShowCookies(true)} className="text-gray-400 hover:text-[#DEC39B] transition-colors">
                  Cookie Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Dialog */}
      <Dialog open={showPrivacy} onOpenChange={setShowPrivacy}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Privacy Policy</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm text-gray-700">
            <p>Last updated: January 2025</p>
            <h3 className="font-semibold text-lg mt-4">1. Information We Collect</h3>
            <p>We collect information you provide directly to us when booking flights, creating an account, or contacting us.</p>
            <h3 className="font-semibold text-lg mt-4">2. How We Use Your Information</h3>
            <p>We use the information we collect to provide, maintain, and improve our services, process your bookings, and communicate with you.</p>
            <h3 className="font-semibold text-lg mt-4">3. Data Security</h3>
            <p>We implement appropriate security measures to protect your personal information.</p>
            <h3 className="font-semibold text-lg mt-4">4. Your Rights</h3>
            <p>You have the right to access, update, or delete your personal information at any time.</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Terms of Service Dialog */}
      <Dialog open={showTerms} onOpenChange={setShowTerms}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Terms of Service</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm text-gray-700">
            <p>Last updated: January 2025</p>
            <h3 className="font-semibold text-lg mt-4">1. Acceptance of Terms</h3>
            <p>By accessing and using Fly ArtSannah services, you accept and agree to be bound by these Terms of Service.</p>
            <h3 className="font-semibold text-lg mt-4">2. Booking and Payment</h3>
            <p>All bookings are subject to availability and confirmation. Payment terms will be provided at the time of booking.</p>
            <h3 className="font-semibold text-lg mt-4">3. Cancellations and Refunds</h3>
            <p>Cancellation policies vary by service type. Please review specific terms when making your booking.</p>
            <h3 className="font-semibold text-lg mt-4">4. Liability</h3>
            <p>Fly ArtSannah is not liable for delays, cancellations, or circumstances beyond our control.</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cookie Policy Dialog */}
      <Dialog open={showCookies} onOpenChange={setShowCookies}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Cookie Policy</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm text-gray-700">
            <p>Last updated: January 2025</p>
            <h3 className="font-semibold text-lg mt-4">1. What Are Cookies</h3>
            <p>Cookies are small text files that are stored on your device when you visit our website.</p>
            <h3 className="font-semibold text-lg mt-4">2. How We Use Cookies</h3>
            <p>We use cookies to improve your browsing experience, remember your preferences, and analyze site traffic.</p>
            <h3 className="font-semibold text-lg mt-4">3. Types of Cookies We Use</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Essential cookies: Required for the website to function properly</li>
              <li>Analytics cookies: Help us understand how visitors use our site</li>
              <li>Preference cookies: Remember your settings and preferences</li>
            </ul>
            <h3 className="font-semibold text-lg mt-4">4. Managing Cookies</h3>
            <p>You can control and manage cookies through your browser settings.</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ResponsiveFooter;
