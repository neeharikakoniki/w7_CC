import { useState } from 'react';
import type { Product } from '../types/product';

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
        ...(isSelected ? styles.selected : styles.notSelected),
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

      <p>${selectedVariant.price}</p>

      <div style={styles.variantContainer}>
        {product.variants.map((variant, index) => (
          <button
            key={variant.size}
            onClick={(e) => {
              e.stopPropagation();
              setVariantIndex(index);
            }}
            style={{
              ...styles.variantButton,
              ...(index === variantIndex
                ? styles.variantSelected
                : styles.variantUnselected),
            }}
          >
            {variant.size}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  card: {
    padding: '16px',
    borderRadius: '8px',
    border: '2px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: '#fff',
  },
  selected: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  notSelected: {
    borderColor: '#e5e7eb',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover' as const,
    marginBottom: '12px',
  },
  variantContainer: {
    display: 'flex',
    gap: '8px',
    marginTop: '12px',
  },
  variantButton: {
    padding: '6px 10px',
    borderRadius: '6px',
    border: '1px solid #e5e7eb',
    cursor: 'pointer',
  },
  variantSelected: {
    backgroundColor: '#2563eb',
    color: '#fff',
    borderColor: '#2563eb',
  },
  variantUnselected: {
    backgroundColor: '#fff',
    color: '#000',
  },
};

export default ProductCard;
