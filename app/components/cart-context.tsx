"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "../lib/products";

export type CartItem = Product & { quantity: number };

type CartContextValue = {
  cart: CartItem[];
  hydrated: boolean;
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  decrementFromCart: (id: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "ecommerce-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      try {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        if (saved) setCart(JSON.parse(saved) as CartItem[]);
      } catch {
        sessionStorage.removeItem(STORAGE_KEY);
      } finally {
        setHydrated(true);
      }
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (hydrated) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  const addToCart = (product: Product) => {
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id);
      return existing
        ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...items, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => setCart((items) => items.filter((item) => item.id !== id));
  const decrementFromCart = (id: number) => setCart((items) => items
    .map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
    .filter((item) => item.quantity > 0));

  const value = useMemo(() => ({
    cart,
    hydrated,
    cartCount: cart.reduce((total, item) => total + item.quantity, 0),
    cartTotal: cart.reduce((total, item) => total + item.price * item.quantity, 0),
    addToCart,
    removeFromCart,
    decrementFromCart,
  }), [cart, hydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
