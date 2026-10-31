import { getProducts } from "./lib/products";
import { ProductCard } from "./components/product-card";

export default async function Home() {
  const { products } = await getProducts();

  if (products.length === 0) {
    return <div className="state-panel"><h1>No products available</h1><p>Please check back soon.</p></div>;
  }

  return (
    <div>
      <section className="hero">
        <p className="eyebrow">Curated essentials</p>
        <h1>Find something you’ll love.</h1>
        <p>Explore popular products from the DummyJSON catalog.</p>
      </section>
      <section aria-labelledby="products-heading">
        <h2 className="section-title" id="products-heading">All products</h2>
        <div className="product-grid">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </div>
  );
}
