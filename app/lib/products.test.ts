import { describe, expect, it, vi } from "vitest";
import { formatCurrency, getProduct, getProducts } from "./products";

describe("product API helpers", () => {
  it("fetches the catalog without calling a live API in tests", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ products: [{ id: 1 }] }) }));
    await expect(getProducts()).resolves.toEqual({ products: [{ id: 1 }] });
    expect(fetch).toHaveBeenCalledWith("https://dummyjson.com/products", expect.any(Object));
  });

  it("fetches a product by encoded ID", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ id: 7 }) }));
    await expect(getProduct("7")).resolves.toEqual({ id: 7 });
    expect(fetch).toHaveBeenCalledWith("https://dummyjson.com/products/7", expect.any(Object));
  });

  it("throws useful errors for unsuccessful responses", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 404 }));
    await expect(getProduct("999")).rejects.toThrow("status 404");
  });

  it.each([[0, "$0.00"], [12.5, "$12.50"], [1234567.89, "$1,234,567.89"]])("formats %p consistently", (value, expected) => {
    expect(formatCurrency(value)).toBe(expected);
  });
});
