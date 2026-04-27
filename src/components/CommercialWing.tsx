import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import EnhancedHeader from "@/components/EnhancedHeader";
import ResponsiveFooter from "@/components/ResponsiveFooter";
import { 
  ShoppingCart, 
  Heart, 
  Search,
  Star,
  Plane,
  Car,
  Shirt,
  Package,
  Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";


interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  original_price?: number | null;
  rating?: number | null;
  reviews_count?: number | null;
  image_url?: string | null;
  description?: string | null;
  in_stock?: boolean | null;
  featured?: boolean | null;
  created_at: string;
  updated_at: string;
}

const CommercialWing = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"model" | "grouped">("model");

  const categories = [
    { id: "all", name: "All Products", icon: Package },
    { id: "airplane_models", name: "Airplane Models", icon: Plane },
    { id: "car_models", name: "Car Models", icon: Car },
    { id: "merchandise", name: "Merchandise", icon: Shirt },
    { id: "aviation_collectibles", name: "Aviation Collectibles", icon: Package }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts((data || []) as unknown as Product[]);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to load products. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
    toast({
      title: "Added to Cart",
      description: "Product successfully added to your cart",
    });
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const cartItemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B2932] via-[#2E4755] to-[#1B2932]">
      <EnhancedHeader />
      
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-light text-[#2E4755] mb-4">
              COMMERCIAL <span className="font-medium">WING</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Exclusive aviation collectibles, luxury models, and premium travel accessories
            </p>
          </div>

          {/* Search and Actions */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" className="relative">
                <Heart className="w-5 h-5 mr-2" />
                Wishlist
                {wishlist.length > 0 && (
                  <Badge className="ml-2 bg-[#B08747]">{wishlist.length}</Badge>
                )}
              </Button>
              <Button variant="outline" className="relative">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Cart
                {cartItemCount > 0 && (
                  <Badge className="ml-2 bg-[#B08747]">{cartItemCount}</Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Tabs */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-2 mb-8 flex flex-wrap gap-2 justify-center">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? "bg-[#2E4755] text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-end mb-6">
          <div className="bg-white rounded-lg p-1 inline-flex gap-1">
            <button
              onClick={() => setViewMode("model")}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                viewMode === "model" ? "bg-[#2E4755] text-white" : "text-gray-600"
              }`}
            >
              Model view
            </button>
            <button
              onClick={() => setViewMode("grouped")}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                viewMode === "grouped" ? "bg-[#2E4755] text-white" : "text-gray-600"
              }`}
            >
              Grouped view
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#B08747]" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white/50 rounded-xl">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Product Image */}
                <div className="relative h-64 bg-gray-100 overflow-hidden">
                  {product.image_url ? (
                    <img 
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-20 h-20 text-gray-300" />
                    </div>
                  )}
                  
                  {product.featured && (
                    <Badge className="absolute top-4 left-4 bg-[#B08747] text-white">
                      Featured
                    </Badge>
                  )}
                  
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Heart 
                      className={`w-5 h-5 ${
                        wishlist.includes(product.id) 
                          ? "fill-red-500 text-red-500" 
                          : "text-gray-600"
                      }`}
                    />
                  </button>

                  {product.in_stock === false && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-white px-4 py-2 rounded-lg font-medium text-gray-900">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#2E4755] transition-colors">
                      {product.name}
                    </h3>
                  </div>
                  
                  {product.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{product.rating}</span>
                      </div>
                      {product.reviews_count && (
                        <span className="text-xs text-gray-500">
                          ({product.reviews_count} reviews)
                        </span>
                      )}
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-[#2E4755]">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.original_price && product.original_price > product.price && (
                      <span className="text-lg text-gray-400 line-through">
                        ${product.original_price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    onClick={() => addToCart(product.id)}
                    disabled={product.in_stock === false}
                    className="w-full bg-[#2E4755] hover:bg-[#1B2932] text-white"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Filter Info */}
        {filteredProducts.length > 0 && (
          <div className="mt-8 text-center text-white">
            <p className="text-sm">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>
        )}
      </div>

      <ResponsiveFooter />
    </div>
  );
};

export default CommercialWing;
