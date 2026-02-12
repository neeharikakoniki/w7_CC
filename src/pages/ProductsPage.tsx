import { useEffect, useMemo, useState } from "react";
import { getProductsPage } from "../api/productsApi";
import type { Product } from "../types/product";
import { ProductGrid } from "../components/ProductGrid";
import { LoadMoreTrigger } from "../components/LoadMoreTrigger";
import SearchBar from "../components/SearchBar";

const PAGE_SIZE = 12;

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [skip, setSkip] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [category, setCategory] = useState("all");

  async function loadNextPage(): Promise<void> {
    if (loading) return;
    if (!hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const newProducts = await getProductsPage(PAGE_SIZE, skip);
      setProducts((prev) => [...prev, ...newProducts]);

      if (newProducts.length < PAGE_SIZE) {
        setHasMore(false);
      } else {
        setSkip((prevSkip) => prevSkip + PAGE_SIZE);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(id);
  }, [query]);

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))].sort(
      (a, b) => a.localeCompare(b)
    );
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = debouncedQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        category === "all" || product.category === category;

      if (!matchesCategory) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      return (
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [products, debouncedQuery, category]);

  return (
    <section className="products-page">
      <SearchBar
        value={query}
        onChange={setQuery}
        category={category}
        categories={categories}
        onCategoryChange={setCategory}
      />
      {query !== debouncedQuery && (
        <div className="status-note">Searching...</div>
      )}
      {products.length === 0 && loading && (
        <div className="status-note">Loading products...</div>
      )}

      {error && <div className="error-note">{error}</div>}

      <ProductGrid products={filteredProducts} />
      {products.length > 0 && filteredProducts.length === 0 && (
        <div className="status-note">No products match your search/filter.</div>
      )}
      {hasMore && (
        <LoadMoreTrigger
          onVisible={loadNextPage}
          disabled={loading}
        />
      )}
      <div className="pagination-note">
        {loading && hasMore && <div className="status-note">Loading more...</div>}
        {!hasMore && <div className="status-note">No more products</div>}
      </div>
    </section>
  );
}
