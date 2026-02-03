// src/pages/ProductsPage.tsx

import { useEffect, useState } from "react";
import { fetchProducts, type Product } from "../api/productsApi";
import {ProductGrid} from "../components/ProductGrid";

const PAGE_SIZE = 12;

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        setLoading(true);
        const result = await fetchProducts(PAGE_SIZE, 0);
        if (isMounted) {
          setProducts(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Unknown error occurred"
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div>Loading products…</div>;
  }

  if (error) {
    return <div>Failed to load products: {error}</div>;
  }

  return <ProductGrid products={products} />;
}
