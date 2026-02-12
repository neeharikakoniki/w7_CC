import type { Product } from '../types/product';
import { ProductCard } from './product/ProductCard';
import type { AddToCartPayload } from './product/ProductCard';

type ProductGridProps = {
  products: Product[];
};

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const handleAddToCart = (payload: AddToCartPayload): void => {
    console.log(payload);
  };

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
