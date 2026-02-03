

export type DummyProduct = {
  id: number;
  title: string;
  thumbnail: string;
  category: string;
  price: number;
};

export type ProductVariant = {
  size: number;
  price: number;
};

export type Product = {
  id: string;
  name: string;
  image: string;
  category: string;
  variants: ProductVariant[];
};

type DummyProductsResponse = {
  products: DummyProduct[];
  total: number;
  skip: number;
  limit: number;
};

export async function fetchProducts(
  limit: number,
  skip: number
): Promise<Product[]> {
  const res = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: DummyProductsResponse = await res.json();

  return data.products.map(transformDummyProduct);
}

function transformDummyProduct(dummy: DummyProduct): Product {
  const basePrice = dummy.price;

  return {
    id: String(dummy.id),
    name: dummy.title,
    image: dummy.thumbnail,
    category: dummy.category,
    variants: [
      { size: 66, price: basePrice },
      { size: 77, price: Math.round(basePrice * 1.3) },
      { size: 88, price: Math.round(basePrice * 1.6) },
    ],
  };
}
