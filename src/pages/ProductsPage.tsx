import { useEffect, useMemo, useState } from "react";
import { getProductsPage } from "../api/productsApi";
import type { Product } from "../types/product";
import { ProductGrid } from "../components/ProductGrid";
import { LoadMoreTrigger } from "../components/LoadMoreTrigger";
import SearchBar from "../components/SearchBar";
import { useCart } from "../cart/CartContext";
import type { AddToCartPayload } from "../components/product/ProductCard";

const PAGE_SIZE = 12;

type Sort = "price-asc" | "price-desc" | null;
export function ProductsPage() {
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [skip, setSkip] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<Sort>(null);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");

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

  useEffect(() => {
    const min = minPriceInput.trim();
    const max = maxPriceInput.trim();

    if (!min && !max) {
      setPriceRange(null);
      return;
    }

    const parsedMin = min ? Number(min) : Number.NEGATIVE_INFINITY;
    const parsedMax = max ? Number(max) : Number.POSITIVE_INFINITY;

    if (
      Number.isNaN(parsedMin) ||
      Number.isNaN(parsedMax) ||
      parsedMin > parsedMax
    ) {
      setPriceRange(null);
      return;
    }

    setPriceRange([parsedMin, parsedMax]);
  }, [minPriceInput, maxPriceInput]);

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))].sort(
      (a, b) => a.localeCompare(b)
    );
  }, [products]);

  const items = useMemo(() => {
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

  const processed = useMemo(() => {
    const getMinPrice = (product: Product): number =>
      Math.min(...product.variants.map((variant) => variant.price));

    let list = [...items];

    if (priceRange) {
      list = list.filter((product) => {
        const minPrice = getMinPrice(product);
        return minPrice >= priceRange[0] && minPrice <= priceRange[1];
      });
    }

    if (sort === "price-asc") {
      list = [...list].sort((a, b) => getMinPrice(a) - getMinPrice(b));
    }

    if (sort === "price-desc") {
      list = [...list].sort((a, b) => getMinPrice(b) - getMinPrice(a));
    }

    return list;
  }, [items, sort, priceRange]);

  const handleAddToCart = (payload: AddToCartPayload): void => {
    addItem(payload);
  };

  return (
    <section className="products-page">
      <SearchBar
        value={query}
        onChange={setQuery}
        category={category}
        categories={categories}
        onCategoryChange={setCategory}
        sort={sort}
        onSortChange={setSort}
        minPrice={minPriceInput}
        maxPrice={maxPriceInput}
        onMinPriceChange={setMinPriceInput}
        onMaxPriceChange={setMaxPriceInput}
      />
      {query !== debouncedQuery && (
        <div className="status-note">Searching...</div>
      )}
      {products.length === 0 && loading && (
        <div className="status-note">Loading products...</div>
      )}

      {error && <div className="error-note">{error}</div>}

      <ProductGrid products={processed} onAddToCart={handleAddToCart} />
      {products.length > 0 && processed.length === 0 && (
        <div className="status-note">No products match your search/filter.</div>
      )}
      {hasMore && <LoadMoreTrigger onVisible={loadNextPage} disabled={loading} />}
      <div className="pagination-note">
        {loading && hasMore && <div className="status-note">Loading more...</div>}
        {!hasMore && <div className="status-note">No more products</div>}
      </div>
    </section>
  );
}
