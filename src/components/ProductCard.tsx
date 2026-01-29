import { useState } from 'react';
import type { Product } from '../types/product';
import VariantSelector from './VariantSelector';
import PriceLabel from './PriceLabel';

type ProductCardProps = {
  product: Product;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

function ProductCard({ product, isSelected, onSelect }: ProductCardProps) {
  const [variantIndex, setVariantIndex] = useState<number>(0);
  const selectedVariant = product.variants[variantIndex];

  return (
    <div
      style={{
        ...styles.card,
        ...(isSelected ? styles.selected : styles.unselected),
      }}
      onClick={() => onSelect(product.id)}
    >
      <img
        src={product.image}
        alt={product.name}
        style={styles.image}
      />

      <h3>
        {product.name} {selectedVariant.size}"
      </h3>

      <PriceLabel price={selectedVariant.price} />

      <VariantSelector
        variants={product.variants}
        selectedIndex={variantIndex}
        onChange={setVariantIndex}
      />
    </div>
  );
}

const styles = {
  card: {
    padding: '16px',
    borderRadius: '8px',
    border: '2px solid transparent',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  selected: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  unselected: {
    borderColor: '#e5e7eb',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover' as const,
    marginBottom: '12px',
  },
};

export default ProductCard;
