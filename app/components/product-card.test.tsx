import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProductCard } from "./product-card";
import type { Product } from "../lib/products";

vi.mock("next/image", () => ({ default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} /> }));

const product: Product = { id: 1, title: "Phone", description: "Phone", price: 299.99, discountPercentage: 10, rating: 4.7, thumbnail: "https://example.com/phone.jpg", images: [] };

describe("ProductCard", () => {
  it("shows image, title, price, rating, and a link to the detail page", () => {
    render(<ProductCard product={product} />);
    expect(screen.getByRole("img", { name: "Phone" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Phone" })).toBeInTheDocument();
    expect(screen.getByText("$299.99")).toBeInTheDocument();
    expect(screen.getByLabelText("Rated 4.7 out of 5")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View Phone" })).toHaveAttribute("href", "/products/1");
  });
});
