import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass } from "lucide-react";
import ReelCard from "@/components/ReelCard";
import CategoryFilter from "@/components/CategoryFilter";
import ReelViewer from "@/components/ReelViewer";
import EnhancedHeader from "@/components/EnhancedHeader";
import ResponsiveFooter from "@/components/ResponsiveFooter";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-aviation.jpg";

const FlyArtSannah = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedReelIndex, setSelectedReelIndex] = useState(0);
  const [reels, setReels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReels();
  }, []);

  const fetchReels = async () => {
    try {
      const { data, error } = await supabase
        .from('reels')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReels(data || []);
    } catch (error) {
      console.error('Error fetching reels:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredReels = selectedCategory === "all"
    ? reels
    : reels.filter((reel) => reel.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <EnhancedHeader />
      
      {/* Hero Section */}
      <section className="relative h-[25vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
            transform: "scale(1.1)",
          }}
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-primary-foreground/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Category Filter Section */}
      <section id="reels" className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-foreground">
              Discover Through <span className="text-accent">Sannah's Lens</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Curated moments from the skies, savannas, and stories that move us.
            </p>
          </div>

          <CategoryFilter onCategoryChange={setSelectedCategory} />
        </div>
      </section>

      {/* Reels Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                {filteredReels.map((reel, index) => (
                  <div key={reel.id} className="break-inside-avoid mb-4">
                    <ReelCard 
                      {...reel} 
                      onClick={() => {
                        setSelectedReelIndex(index);
                        setViewerOpen(true);
                      }}
                    />
                  </div>
                ))}
              </div>

              {filteredReels.length === 0 && !loading && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">
                    No reels found in this category. Check back soon!
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-primary/80">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-primary-foreground mb-6">
            Ready to Turn Dreams into <span className="text-secondary">Destinations?</span>
          </h2>
          <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
            Let 98 Safaris craft your bespoke African adventure. From the skies to the savannas, your story begins here.
          </p>
          <Button
            variant="gold"
            size="lg"
            className="text-lg"
            onClick={() => window.location.href = "/safari-builder"}
          >
            Customize Your Safari
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <ResponsiveFooter />

      {/* Reel Viewer */}
      {viewerOpen && (
        <ReelViewer
          reels={filteredReels}
          initialIndex={selectedReelIndex}
          onClose={() => setViewerOpen(false)}
        />
      )}
    </div>
  );
};

export default FlyArtSannah;