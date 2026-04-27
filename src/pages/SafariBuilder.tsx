import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Plane, Hotel, Camera, Plus, Share, Download, Trash2 } from "lucide-react";
import EnhancedHeader from "@/components/EnhancedHeader";
import ResponsiveFooter from "@/components/ResponsiveFooter";
import { toast } from "sonner";

const SafariBuilder = () => {
  const [itinerary, setItinerary] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    items: []
  });

  const [newItem, setNewItem] = useState({
    type: "flight",
    title: "",
    startDateTime: "",
    endDateTime: "",
    location: "",
    notes: "",
    link: ""
  });

  const itemTypes = [
    { id: "flight", label: "Flight", icon: Plane },
    { id: "hotel", label: "Hotel", icon: Hotel },
    { id: "activity", label: "Activity", icon: Camera },
    { id: "transport", label: "Transport", icon: MapPin },
    { id: "note", label: "Note", icon: Calendar }
  ];

  const addItem = () => {
    if (!newItem.title.trim()) {
      toast.error("Please enter a title for the item");
      return;
    }

    setItinerary(prev => ({
      ...prev,
      items: [...prev.items, { ...newItem, id: Date.now() }]
    }));
    
    setNewItem({
      type: "flight",
      title: "",
      startDateTime: "",
      endDateTime: "",
      location: "",
      notes: "",
      link: ""
    });

    toast.success("Item added to itinerary!");
  };

  const removeItem = (id: number) => {
    setItinerary(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
    toast.success("Item removed");
  };

  const handleShare = () => {
    toast.success("Share link copied to clipboard!");
  };

  const handleDownloadPDF = () => {
    toast.success("PDF download will be available soon!");
  };

  return (
    <div className="min-h-screen bg-background">
      <EnhancedHeader />
      
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary via-primary/90 to-primary/80">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto text-primary-foreground">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Safari Itinerary Builder
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Create, edit, and share beautiful travel itineraries in minutes
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-primary-foreground/20 backdrop-blur-sm px-4 py-2 rounded-full">📅 Easy Planning</span>
              <span className="bg-primary-foreground/20 backdrop-blur-sm px-4 py-2 rounded-full">🔗 Shareable Links</span>
              <span className="bg-primary-foreground/20 backdrop-blur-sm px-4 py-2 rounded-full">📄 PDF Export</span>
              <span className="bg-primary-foreground/20 backdrop-blur-sm px-4 py-2 rounded-full">🌍 Global Destinations</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Itinerary Builder */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                Create Your Itinerary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Trip Title</label>
                  <input
                    type="text"
                    value={itinerary.title}
                    onChange={(e) => setItinerary(prev => ({...prev, title: e.target.value}))}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="e.g., Nairobi Safari Adventure"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Destination</label>
                  <input
                    type="text"
                    value={itinerary.destination}
                    onChange={(e) => setItinerary(prev => ({...prev, destination: e.target.value}))}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="e.g., Kenya"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Start Date</label>
                  <input
                    type="date"
                    value={itinerary.startDate}
                    onChange={(e) => setItinerary(prev => ({...prev, startDate: e.target.value}))}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">End Date</label>
                  <input
                    type="date"
                    value={itinerary.endDate}
                    onChange={(e) => setItinerary(prev => ({...prev, endDate: e.target.value}))}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              {/* Add Item Form */}
              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Add Itinerary Item</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Type</label>
                    <select
                      value={newItem.type}
                      onChange={(e) => setNewItem(prev => ({...prev, type: e.target.value}))}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {itemTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Title</label>
                      <input
                        type="text"
                        value={newItem.title}
                        onChange={(e) => setNewItem(prev => ({...prev, title: e.target.value}))}
                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="e.g., Flight to Nairobi"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Location</label>
                      <input
                        type="text"
                        value={newItem.location}
                        onChange={(e) => setNewItem(prev => ({...prev, location: e.target.value}))}
                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="e.g., JKIA Terminal 1"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Start Date & Time</label>
                      <input
                        type="datetime-local"
                        value={newItem.startDateTime}
                        onChange={(e) => setNewItem(prev => ({...prev, startDateTime: e.target.value}))}
                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">End Date & Time (Optional)</label>
                      <input
                        type="datetime-local"
                        value={newItem.endDateTime}
                        onChange={(e) => setNewItem(prev => ({...prev, endDateTime: e.target.value}))}
                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Notes</label>
                    <textarea
                      value={newItem.notes}
                      onChange={(e) => setNewItem(prev => ({...prev, notes: e.target.value}))}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      rows={3}
                      placeholder="Additional details, confirmation numbers, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Booking Link (Optional)</label>
                    <input
                      type="url"
                      value={newItem.link}
                      onChange={(e) => setNewItem(prev => ({...prev, link: e.target.value}))}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="https://..."
                    />
                  </div>

                  <Button onClick={addItem} variant="hero" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Itinerary Preview */}
          <Card className="h-fit sticky top-20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between flex-wrap gap-2">
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  Itinerary Preview
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
                    <Download className="w-4 h-4 mr-2" />
                    PDF
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {itinerary.title ? (
                <div className="space-y-6">
                  <div className="text-center border-b border-border pb-4">
                    <h2 className="text-2xl font-bold text-accent">{itinerary.title}</h2>
                    <p className="text-muted-foreground">{itinerary.destination}</p>
                    {itinerary.startDate && itinerary.endDate && (
                      <p className="text-sm text-muted-foreground">
                        {new Date(itinerary.startDate).toLocaleDateString()} - {new Date(itinerary.endDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <div className="space-y-4">
                    {itinerary.items.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        Add items to see your itinerary timeline
                      </p>
                    ) : (
                      itinerary.items.map((item) => {
                        const ItemIcon = itemTypes.find(t => t.id === item.type)?.icon || Calendar;
                        return (
                          <div key={item.id} className="flex gap-3 p-4 bg-muted/30 rounded-lg relative group">
                            <div className="w-10 h-10 bg-accent/90 rounded-full flex items-center justify-center text-accent-foreground flex-shrink-0">
                              <ItemIcon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-foreground">{item.title}</h4>
                              {item.location && <p className="text-sm text-muted-foreground">📍 {item.location}</p>}
                              {item.startDateTime && (
                                <p className="text-sm text-muted-foreground">
                                  🕒 {new Date(item.startDateTime).toLocaleString()}
                                </p>
                              )}
                              {item.notes && <p className="text-sm text-foreground mt-1">{item.notes}</p>}
                              {item.link && (
                                <a href={item.link} target="_blank" rel="noopener noreferrer" 
                                   className="text-sm text-accent hover:underline">
                                  View booking →
                                </a>
                              )}
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="absolute top-2 right-2 p-1 bg-destructive/10 text-destructive rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Start by entering your trip details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ResponsiveFooter />
    </div>
  );
};

export default SafariBuilder;