export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  thumbnail: string;
  images: string[];
};

export type ProductsResponse = {
  products: Product[];
};

const API_URL = "https://dummyjson.com/products";

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { next: { revalidate: 300 } });
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
  return response.json() as Promise<T>;
}

export function getProducts() {
  return getJson<ProductsResponse>(API_URL);
}

export function getProduct(id: string) {
  return getJson<Product>(`${API_URL}/${encodeURIComponent(id)}`);
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
