import Image from "next/image";
import Link from "next/link";
import { formatCurrency, type Product } from "../lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link className="product-card" href={`/products/${product.id}`} aria-label={`View ${product.title}`}>
      <div className="product-image-wrap">
        <Image src={product.thumbnail} alt={product.title} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw" />
      </div>
      <div className="product-card-body">
        <h2>{product.title}</h2>
        <div className="product-meta">
          <strong>{formatCurrency(product.price)}</strong>
          <span aria-label={`Rated ${product.rating} out of 5`}>★ {product.rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}
