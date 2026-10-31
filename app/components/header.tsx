"use client";

import Link from "next/link";
import { useCart } from "./cart-context";

export function Header() {
  const { cartCount, hydrated } = useCart();

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <Link className="brand" href="/">EcommerceApp</Link>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link className="cart-link" href="/cart">
            Cart <span className="cart-badge" aria-label={`${cartCount} items`}>{hydrated ? cartCount : 0}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
