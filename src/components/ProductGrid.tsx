import type { Product } from '../types/product';
import { ProductCard } from './product/ProductCard';
import type { AddToCartPayload } from './product/ProductCard';

type ProductGridProps = {
  products: Product[];
  onAddToCart: (payload: AddToCartPayload) => void;
};

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
