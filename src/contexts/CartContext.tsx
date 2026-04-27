import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string | null;
  category: string;
}

interface CartContextType {
  cart: { [key: string]: number };
  cartItems: CartItem[];
  addToCart: (productId: string, product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [productDetails, setProductDetails] = useState<{ [key: string]: Omit<CartItem, 'quantity'> }>({});

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    const storedProducts = localStorage.getItem('cartProducts');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    if (storedProducts) {
      setProductDetails(JSON.parse(storedProducts));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartProducts', JSON.stringify(productDetails));
  }, [cart, productDetails]);

  const addToCart = (productId: string, product: Omit<CartItem, 'quantity'>) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
    
    if (!productDetails[productId]) {
      setProductDetails(prev => ({
        ...prev,
        [productId]: product
      }));
    }

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      delete newCart[productId];
      return newCart;
    });
    
    setProductDetails(prev => {
      const newDetails = { ...prev };
      delete newDetails[productId];
      return newDetails;
    });

    toast({
      title: "Removed from Cart",
      description: "Item has been removed from your cart",
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prev => ({
        ...prev,
        [productId]: quantity
      }));
    }
  };

  const clearCart = () => {
    setCart({});
    setProductDetails({});
    localStorage.removeItem('cart');
    localStorage.removeItem('cartProducts');
  };

  const cartItems: CartItem[] = Object.entries(cart).map(([id, quantity]) => ({
    ...productDetails[id],
    id,
    quantity,
  })).filter(item => item.name); // Filter out items without details

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    <CartContext.Provider value={{
      cart,
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
