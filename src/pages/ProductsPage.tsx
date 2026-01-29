import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';

function ProductsPage() {
  return <ProductGrid products={products} />;
}

export default ProductsPage;
