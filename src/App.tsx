import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";
import FlyArtSannah from "@/pages/FlyArtSannah";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TripDetail from "./pages/TripDetail";
import CommercialWing from "./components/CommercialWing";
import MultiReservation from "./pages/MultiReservation";
import BookingPage from "./pages/BookingPage";
import SafariBuilder from "./pages/SafariBuilder";
import BookingConfirmation from "./pages/BookingConfirmation";
import SearchResults from "./pages/SearchResults"; 
import HotelResults from "./pages/HotelResults";
import HotelBooking from "./pages/HotelBooking";
import Kenya from "./pages/destinations/Kenya";
import Uganda from "./pages/destinations/Uganda";
import Tanzania from "./pages/destinations/Tanzania";
import Rwanda from "./pages/destinations/Rwanda";
import Zanzibar from "./pages/destinations/Zanzibar";
import Maldives from "./pages/destinations/Maldives";
import Zambia from "./pages/destinations/Zambia";
import Zimbabwe from "./pages/destinations/Zimbabwe";
import SouthAfrica from "./pages/destinations/SouthAfrica";
import Madagascar from "./pages/destinations/Madagascar";
import Seychelles from "./pages/destinations/Seychelles";
import Mauritius from "./pages/destinations/Mauritius";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PWAInstallPrompt />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          <Route path="/booking" element={<BookingPage />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          <Route path="/commercial-wing" element={<CommercialWing />} />
          <Route path="/multi-reservation" element={<MultiReservation />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/hotel-results" element={<HotelResults />} />
          <Route path="/hotel-booking" element={<HotelBooking />} />
          <Route path="/trip-detail/:slug" element={<TripDetail />} />
 <Route path="/flyartsannah" element={<FlyArtSannah />} />
           <Route path="/safari-builder" element={<SafariBuilder />} />
          {/* Destination Routes */}
          <Route path="/destinations/kenya" element={<Kenya />} />
          <Route path="/destinations/uganda" element={<Uganda />} />
          <Route path="/destinations/tanzania" element={<Tanzania />} />
          <Route path="/destinations/rwanda" element={<Rwanda />} />
          <Route path="/destinations/zanzibar" element={<Zanzibar />} />
          <Route path="/destinations/maldives" element={<Maldives />} />
          <Route path="/destinations/zambia" element={<Zambia />} />
          <Route path="/destinations/zimbabwe" element={<Zimbabwe />} />
          <Route path="/destinations/south-africa" element={<SouthAfrica />} />
          <Route path="/destinations/madagascar" element={<Madagascar />} />
          <Route path="/destinations/seychelles" element={<Seychelles />} />
          <Route path="/destinations/mauritius" element={<Mauritius />} />

          {/* Keep this at the end */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
