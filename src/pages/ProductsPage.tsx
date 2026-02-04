import { use, useEffect, useState } from "react";
import { fetchProducts, type Product } from "../api/productsApi";
import {ProductGrid} from "../components/ProductGrid";

const PAGE_SIZE = 12;

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [skip, setSkip] = useState<number>(0);
  const [ hasMore,setHasMore] = useState<boolean>(true);




  async function loadNextPage(): Promise<void>
  {
    if(loading) return;
    if(!hasMore) return;

  setLoading(true);
  setError(null);

  try{
    const newProducts= await fetchProducts(PAGE_SIZE, skip);
    setProducts(prev => [...prev, ...newProducts]);

    if(newProducts.length < PAGE_SIZE)
    {
      setHasMore(false);
    }
    else{
      setSkip(prevSkip=>prevSkip + PAGE_SIZE);
    }
  }
  catch(err){
    setError(
      err instanceof Error ? err.message: "Unknown error occurred"
    );

  }
   finally{
    setLoading(false);
   }
}

useEffect(()=>{
  loadNextPage();
},[]);


return (
  <div>
    {products.length=== 0 &&loading &&(
      <div> Loading Products..
</div>    )}

{error && <div> {error}</div>}
<ProductGrid products={products}/>
{hasMore && (
  <div style = {{marginTop:16}}>
    <button onClick={loadNextPage} disabled= {loading}>
      {loading ? "Loading": "Load More"}

    </button>
    </div>
)}
  </div>

);
}
