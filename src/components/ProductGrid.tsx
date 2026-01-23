import { useState } from 'react';
import type { Product } from '../types/product';
import ProductCard from './ProductCard';

type ProductGridProps = {
  products: Product[];
};

const [selectedId, setSelectedId] = useState<string | null>(null);


function ProductGrid({ products }: ProductGridProps) {
  return (
    <div style={styles.grid}>
      {products.map((product) => (
       <ProductCard
  key={product.id}
  product={product}
  isSelected={product.id === selectedId}
  onSelect={setSelectedId}
/>

      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px',
  },
};

export default ProductGrid;
