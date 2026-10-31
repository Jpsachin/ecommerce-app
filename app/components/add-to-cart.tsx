"use client";

import { useState } from "react";
import { type Product } from "../lib/products";
import { useCart } from "./cart-context";

export function AddToCart({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return <button className="primary-button" type="button" onClick={handleAdd}>{added ? "Added to cart ✓" : "Add to cart"}</button>;
}
