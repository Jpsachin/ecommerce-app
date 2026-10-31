import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCart } from "../../components/add-to-cart";
import { formatCurrency, getProduct } from "../../lib/products";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();

  let product;
  try {
    product = await getProduct(id);
  } catch {
    notFound();
  }

  return (
    <article className="product-detail">
      <div className="detail-image-wrap">
        <Image className="detail-image" src={product.thumbnail || product.images[0]} alt={product.title} fill priority sizes="(max-width: 800px) 100vw, 50vw" />
      </div>
      <div className="detail-content">
        <p className="eyebrow">Product #{product.id}</p>
        <h1>{product.title}</h1>
        <p className="detail-description">{product.description}</p>
        <div className="detail-rating">★ {product.rating.toFixed(1)} <span>customer rating</span></div>
        <div className="detail-price-row">
          <strong>{formatCurrency(product.price)}</strong>
          <span>{product.discountPercentage.toFixed(1)}% discount</span>
        </div>
        <AddToCart product={product} />
      </div>
    </article>
  );
}
