import { useState } from 'react';
import type { Product } from '../types/product';
import ProductCard from './ProductCard';


type AddToCartPayload={
  productId: string;
  baseName: string;
  size: number;
  price: number;
};

type ProductGridProps = {
  products: Product[];
};

function ProductGrid({ products }: ProductGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleAddToCart = (payload: AddToCartPayload): void => {
    console.log(payload);
  }

  return (
    <div style={styles.grid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isSelected={product.id === selectedId}
          onSelect={setSelectedId}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '16px',
  },
};

export default ProductGrid;
