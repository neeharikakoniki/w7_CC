import type { Product } from '../types/product';
import { ProductCard } from './product/ProductCard';
import type { AddToCartPayload } from './product/ProductCard';
import { useCart } from '../cart/CartContext';

type ProductGridProps = {
  products: Product[];
};

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const { addItem } = useCart();

  const handleAddToCart = (payload: AddToCartPayload): void => {
    addItem({
      productId: payload.productId,
      baseName: payload.baseName,
      size: payload.size,
      price: payload.price,
    });
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
