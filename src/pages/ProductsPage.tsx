import { useEffect, useState } from "react";
import { getProductsPage, type Product } from "../api/productsApi";
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


  async function loadNextPage(): Promise<void> {
    if (loading) return;
    if (!hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const newProducts = await getProductsPage(PAGE_SIZE, skip);
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
    const id = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(id);
  }, [query]);

 


  return (
    <div>
       <SearchBar
  value = {query}
  onChange={setQuery}/>
    {query !== debouncedQuery && (
    <div style ={{marginBottom:12,color:"#666"}}>Searching..</div>
  )}
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
