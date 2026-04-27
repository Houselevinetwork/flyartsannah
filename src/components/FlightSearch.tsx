import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowRightLeft, Calendar, MapPin, Users, Plane } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FlightSearch = () => {
  const [tripType, setTripType] = useState("roundtrip");

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-xl border-0 bg-white/95 backdrop-blur-sm">
      <CardContent className="p-8">
        {/* Tab Navigation */}
        <Tabs value={tripType} onValueChange={setTripType} className="w-full mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8 bg-sky-navy/5">
            <TabsTrigger value="roundtrip" className="text-sky-navy data-[state=active]:bg-sky-navy data-[state=active]:text-white">
              Charter Flight
            </TabsTrigger>
            <TabsTrigger value="oneway" className="text-sky-navy data-[state=active]:bg-sky-navy data-[state=active]:text-white">
              Helicopter Tour
            </TabsTrigger>
            <TabsTrigger value="multicity" className="text-sky-navy data-[state=active]:bg-sky-navy data-[state=active]:text-white">
              Balloon Safari
            </TabsTrigger>
          </TabsList>

          <TabsContent value="roundtrip" className="space-y-6">
            <SearchForm showReturn={true} serviceType="Charter Flight" />
          </TabsContent>
          
          <TabsContent value="oneway" className="space-y-6">
            <SearchForm showReturn={false} serviceType="Helicopter Tour" />
          </TabsContent>
          
          <TabsContent value="multicity" className="space-y-6">
            <SearchForm showReturn={true} isMulticity={true} serviceType="Balloon Safari" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const SearchForm = ({ showReturn = true, isMulticity = false, serviceType = "Charter Flight" }) => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/search-results');
  };

  return (
    <div className="space-y-6">
      {/* Main Search Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* From */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-sky-navy flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            From
          </label>
          <div className="relative">
            <Input 
              placeholder="Departure location"
              className="pl-4 pr-12 h-12 border-sky-navy/20 focus:border-sky-navy focus:ring-sky-navy/20"
            />
            <Badge variant="secondary" className="absolute right-3 top-3 text-xs bg-sky-blue/20 text-sky-navy">
              NBO
            </Badge>
          </div>
        </div>

        {/* To */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-sky-navy flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            To
          </label>
          <div className="relative">
            <Input 
              placeholder="Destination location"
              className="pl-4 pr-12 h-12 border-sky-navy/20 focus:border-sky-navy focus:ring-sky-navy/20"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1 h-10 w-10 text-sky-navy hover:bg-sky-navy/10"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Departure Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-sky-navy flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Departure
          </label>
          <Input 
            type="date"
            className="h-12 border-sky-navy/20 focus:border-sky-navy focus:ring-sky-navy/20"
          />
        </div>

        {/* Return Date */}
        {showReturn && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-sky-navy flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Return
            </label>
            <Input 
              type="date"
              className="h-12 border-sky-navy/20 focus:border-sky-navy focus:ring-sky-navy/20"
            />
          </div>
        )}
      </div>

      {/* Additional Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Passengers */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-sky-navy flex items-center gap-2">
            <Users className="w-4 h-4" />
            Passengers
          </label>
          <Select defaultValue="1">
            <SelectTrigger className="h-12 border-sky-navy/20 focus:border-sky-navy focus:ring-sky-navy/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Adult</SelectItem>
              <SelectItem value="2">2 Adults</SelectItem>
              <SelectItem value="3">3 Adults</SelectItem>
              <SelectItem value="4">4+ Adults</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cabin Class */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-sky-navy flex items-center gap-2">
            <Plane className="w-4 h-4" />
            Service Type
          </label>
          <Select defaultValue="premium">
            <SelectTrigger className="h-12 border-sky-navy/20 focus:border-sky-navy focus:ring-sky-navy/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="premium">Premium Charter</SelectItem>
              <SelectItem value="standard">Standard Charter</SelectItem>
              <SelectItem value="helicopter">Helicopter</SelectItem>
              <SelectItem value="balloon">Hot Air Balloon</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Special Requests */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-sky-navy">
            Special Requests
          </label>
          <Input 
            placeholder="Catering, ground transport, etc."
            className="h-12 border-sky-navy/20 focus:border-sky-navy focus:ring-sky-navy/20"
          />
        </div>
      </div>

      {/* Search Button */}
      <div className="flex justify-center pt-4">
        <Button 
          variant="premium" 
          size="lg" 
          className="px-12 py-4 text-lg font-semibold hover:animate-premium-glow"
          onClick={handleSearch}
        >
          Get Quote
        </Button>
      </div>
    </div>
  );
};

export default FlightSearch;