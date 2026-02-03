import AppLayout from './layouts/AppLayout';
import ProductGrid from './components/ProductGrid';
import { products } from './data/products';
import { ProductsPage } from "./pages/ProductsPage";

function App() {
  return (
    <AppLayout>
          <ProductsPage />

    </AppLayout>
  );
}

export default App;
