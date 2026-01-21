import AppLayout from './layouts/AppLayout';
import ProductGrid from './components/ProductGrid';
import { products } from './data/products';

function App() {
  return (
    <AppLayout>
      <ProductGrid products={products} />
    </AppLayout>
  );
}

export default App;
