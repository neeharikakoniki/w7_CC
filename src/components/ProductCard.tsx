import { useState } from 'react';
import type { Product } from '../types/product';
import VariantSelector from './VariantSelector';
import PriceLabel from './PriceLabel';
import { useMemo } from 'react';

type AddToCartPayload={
   productId: string;
    baseName: string;
    size: number;
    price: number;
};

type ProductCardProps = {
  product: Product;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onAddToCart: (payload: AddToCartPayload) =>void;
};



function ProductCard({ product, isSelected, onSelect, onAddToCart }: ProductCardProps) {
  const [variantIndex, setVariantIndex] = useState<number>(0);


  const { displayName, price, size } = useMemo(() => {
    const variant = product.variants[variantIndex];
    return {
      displayName: `${product.name} ${variant.size}"`,
      price: variant.price,
      size: variant.size,
    };

  }, [product, variantIndex]);

  const handleAddToCart = () =>{
    onAddToCart({
      productId: product.id,
      baseName: product.name,
      size,
      price,
    });
  };




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

      <h3>{displayName}</h3>


      <PriceLabel price={price} />

      <VariantSelector
        variants={product.variants}
        selectedIndex={variantIndex}
        onChange={setVariantIndex}
      />
      <button
        style = {styles.addButton}
        onClick={(e) =>{
          e.stopPropagation();
          handleAddToCart();
        }}
        >
          Add to Cart
        </button>
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
  addButton:{
    marginTop:'12px',
    padding: '8px 12px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor:'pointer',
  },
};

export default ProductCard;
