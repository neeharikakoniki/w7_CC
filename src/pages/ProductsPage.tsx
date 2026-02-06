import { useEffect, useState } from "react";
import { fetchProducts, type Product } from "../api/productsApi";
import { ProductGrid } from "../components/ProductGrid";
import { LoadMoreTrigger } from "../components/LoadMoreTrigger";

const PAGE_SIZE = 12;

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [skip, setSkip] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  async function loadNextPage(): Promise<void> {
    if (loading) return;
    if (!hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const newProducts = await fetchProducts(PAGE_SIZE, skip);
      setProducts(prev => [...prev, ...newProducts]);

      if (newProducts.length < PAGE_SIZE) {
        setHasMore(false);
      }
      else {
        setSkip(prevSkip => prevSkip + PAGE_SIZE);
      }
    }
    catch (err) {
      setError(
        err instanceof Error ? err.message : "Unknown error occurred"
      );

    }
    finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    loadNextPage();

  }, []);
  return (
    <div>
      {products.length === 0 && loading && (
        <div> Loading Products..
        </div>)}

      {error && <div> {error}</div>}
      <ProductGrid products={products} />
      {hasMore && (
        <LoadMoreTrigger
          onVisible={loadNextPage}
          disabled={loading}
        />
      )}
      <div style={{ marginTop: 16 }}>
        {loading && hasMore && <div> Loading more ... </div>}
        {!hasMore && <div> No more products </div>}
      </div>
    </div>

  );
}
