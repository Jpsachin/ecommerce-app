import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { CartProvider, useCart } from "./cart-context";
import type { Product } from "../lib/products";

const phone = { id: 1, title: "Phone", description: "Phone", price: 299.99, discountPercentage: 10, rating: 4.5, thumbnail: "phone.jpg", images: [] } satisfies Product;
const bag = { ...phone, id: 2, title: "Bag", price: 0 } satisfies Product;
const wrapper = ({ children }: { children: React.ReactNode }) => <CartProvider>{children}</CartProvider>;

beforeEach(() => sessionStorage.clear());

describe("CartProvider", () => {
  it("adds quantities and computes the header count and total", async () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    await act(async () => { await Promise.resolve(); });
    act(() => { result.current.addToCart(phone); result.current.addToCart(phone); result.current.addToCart(bag); });
    expect(result.current.cartCount).toBe(3);
    expect(result.current.cartTotal).toBeCloseTo(599.98);
    expect(result.current.cart.find((item) => item.id === phone.id)?.quantity).toBe(2);
  });

  it("decrements one item without removing unrelated products", async () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    await act(async () => { await Promise.resolve(); });
    act(() => { result.current.addToCart(phone); result.current.addToCart(phone); result.current.addToCart(bag); result.current.decrementFromCart(phone.id); });
    expect(result.current.cartCount).toBe(2);
    expect(result.current.cart.find((item) => item.id === bag.id)).toBeDefined();
  });

  it("removes a product completely", async () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    await act(async () => { await Promise.resolve(); });
    act(() => { result.current.addToCart(phone); result.current.removeFromCart(phone.id); });
    expect(result.current.cart).toEqual([]);
  });

  it("restores valid cart data after hydration", async () => {
    sessionStorage.setItem("ecommerce-cart", JSON.stringify([{ ...phone, quantity: 3 }]));
    const { result } = renderHook(() => useCart(), { wrapper });
    await vi.waitFor(() => expect(result.current.hydrated).toBe(true));
    expect(result.current.cartCount).toBe(3);
  });

  it("handles invalid stored JSON safely", async () => {
    sessionStorage.setItem("ecommerce-cart", "not-json");
    const { result } = renderHook(() => useCart(), { wrapper });
    await vi.waitFor(() => expect(result.current.hydrated).toBe(true));
    expect(result.current.cart).toEqual([]);
  });
});
