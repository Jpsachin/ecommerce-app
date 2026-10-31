"use client";

import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "../lib/products";
import { useCart } from "./cart-context";

export function CartView() {
  const { cart, hydrated, cartCount, cartTotal, addToCart, decrementFromCart, removeFromCart } = useCart();

  if (!hydrated) return <p className="status" role="status">Loading your cart…</p>;
  if (cart.length === 0) return (
    <div className="empty-cart">
      <h1>Your cart is empty</h1>
      <p>Add a few products to get started.</p>
      <Link className="primary-button" href="/">Browse products</Link>
    </div>
  );

  return (
    <div>
      <h1 className="page-title">Shopping cart</h1>
      <div className="cart-layout">
        <div className="cart-list">
          {cart.map((item) => (
            <article className="cart-item" key={item.id}>
              <div className="cart-image"><Image src={item.thumbnail} alt="" fill sizes="120px" /></div>
              <div className="cart-item-info">
                <Link href={`/products/${item.id}`}><h2>{item.title}</h2></Link>
                <p>{formatCurrency(item.price)} each</p>
                <div className="quantity-controls" aria-label={`Quantity for ${item.title}`}>
                  <button type="button" onClick={() => decrementFromCart(item.id)} aria-label={`Decrease ${item.title} quantity`}>−</button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => addToCart(item)} aria-label={`Increase ${item.title} quantity`}>+</button>
                </div>
              </div>
              <div className="cart-item-end">
                <strong>{formatCurrency(item.price * item.quantity)}</strong>
                <button className="text-button" type="button" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </article>
          ))}
        </div>
        <aside className="cart-summary">
          <h2>Order summary</h2>
          <p><span>Items</span><strong>{cartCount}</strong></p>
          <p><span>Total</span><strong>{formatCurrency(cartTotal)}</strong></p>
        </aside>
      </div>
    </div>
  );
}
