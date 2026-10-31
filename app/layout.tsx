import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./components/cart-context";
import { Header } from "./components/header";

export const metadata: Metadata = {
  title: "EcommerceApp",
  description: "Browse products and build your cart.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main className="page-shell">{children}</main>
          <footer className="site-footer">EcommerceApp · Powered by DummyJSON</footer>
        </CartProvider>
      </body>
    </html>
  );
}
