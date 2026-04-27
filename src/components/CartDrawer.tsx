import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2, ShoppingCart, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  products: {
    name: string;
    price: number;
    image_url: string;
  };
}

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthRequired: () => void;
}

export const CartDrawer = ({ open, onOpenChange, onAuthRequired }: CartDrawerProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user && open) {
      fetchCartItems();
    }
  }, [user, open]);

  const fetchCartItems = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          id,
          product_id,
          quantity,
          products (
            name,
            price,
            image_url
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      setCartItems(data || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast({
        title: "Error",
        description: "Failed to load cart items",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      
      setCartItems(cartItems.filter(item => item.id !== itemId));
      toast({
        title: "Success",
        description: "Item removed from cart"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive"
      });
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(itemId);
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', itemId);

      if (error) throw error;
      
      setCartItems(cartItems.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive"
      });
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => 
      sum + (item.products.price * item.quantity), 0
    ).toFixed(2);
  };

  const handleWhatsAppCheckout = () => {
    const message = `Hi! I'd like to order:\n\n${cartItems.map(item => 
      `${item.products.name} x${item.quantity} - $${(item.products.price * item.quantity).toFixed(2)}`
    ).join('\n')}\n\nTotal: $${calculateTotal()}`;
    
    const whatsappUrl = `https://wa.me/254123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePayment = () => {
    toast({
      title: "Payment Gateway",
      description: "Payment integration coming soon!"
    });
  };

  if (!user) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-lg bg-gradient-to-br from-[#1B2932] to-[#2E4755] text-white border-white/20">
          <SheetHeader>
            <SheetTitle className="text-white flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Shopping Cart
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
            <ShoppingCart className="w-16 h-16 text-white/50" />
            <p className="text-center text-white/70">Please sign in to view your cart</p>
            <Button 
              onClick={() => {
                onOpenChange(false);
                onAuthRequired();
              }}
              className="bg-[#B08747] hover:bg-[#8B6935]"
            >
              Sign In
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg bg-gradient-to-br from-[#1B2932] to-[#2E4755] text-white border-white/20">
        <SheetHeader>
          <SheetTitle className="text-white flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Shopping Cart ({cartItems.length})
          </SheetTitle>
        </SheetHeader>

        {loading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <p>Loading...</p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
            <ShoppingCart className="w-16 h-16 text-white/50" />
            <p className="text-center text-white/70">Your cart is empty</p>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto space-y-4 mt-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex gap-4">
                    <img 
                      src={item.products.image_url || "/placeholder.svg"}
                      alt={item.products.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.products.name}</h3>
                      <p className="text-[#B08747] font-bold mt-1">
                        ${item.products.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-6 w-6 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20"
                        >
                          -
                        </Button>
                        <span className="text-sm">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-6 w-6 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeItem(item.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-white/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              <Separator className="bg-white/20" />
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-[#B08747]">${calculateTotal()}</span>
              </div>
              
              <div className="space-y-2">
                <Button
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Checkout via WhatsApp
                </Button>
                <Button
                  onClick={handlePayment}
                  className="w-full bg-[#B08747] hover:bg-[#8B6935]"
                >
                  Proceed to Payment
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
