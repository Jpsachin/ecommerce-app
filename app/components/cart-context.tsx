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
    const hydrate = () => {
      try {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            const validItems = parsed.filter((item): item is CartItem =>
              item && typeof item === "object" && Number.isInteger(item.id) &&
              typeof item.title === "string" && typeof item.price === "number" &&
              Number.isFinite(item.price) && Number.isInteger(item.quantity) && item.quantity > 0
            );
            setCart(validItems);
          }
        }
      } catch {
        try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* Storage can be unavailable. */ }
      } finally {
        setHydrated(true);
      }
    };

    queueMicrotask(hydrate);
  }, []);

  useEffect(() => {
    if (hydrated) {
      try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch { /* Keep the in-memory cart usable. */ }
    }
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
