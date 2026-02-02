import { useState } from 'react';
import type  { Product } from '../../types/product';
import VariantSelector from './VariantSelector';
import PriceLabel from './PriceLabel';
import { useMemo } from 'react';
import { products } from '../../data/products';

export type AddToCartPayload={
   productId: string;
    baseName: string;
    size: number;
    price: number;
};

type ProductCardProps = {
  product: Product;
  onAddToCart: (payload: AddToCartPayload) =>void;
};

export const ProductCard: React.FC<ProductCardProps>=({
product,
onAddToCart,})=>{
  const[ variantIndex, setVariantIndex] = useState(0);
  const hasVariants= product.variants.length >0 ;
  const derived = useMemo(()=>
  {
    if(!hasVariants)
    {
      return null;
    }
    const variant = product.variants[variantIndex];
    return {
      displayName: `${product.name} ${variant.size}"`,
      price: variant.price,
      size: variant.size,
    };
  },[products, variantIndex, hasVariants]);

  const handleAddToCart=()=>{
    if(!derived)
    {
      return ;
    }

    onAddToCart({
      productId: product.id,
      baseName:product.name,
      size:derived.size,
      price:derived.price,
    });
  };
 return (
    <div
      style={{
        ...styles.card,
      }}
      >
      <h3>{derived ? derived.displayName: product.name}</h3>
      <VariantSelector
      variants={product.variants}
      selectedIndex={variantIndex}
      onChange={setVariantIndex}
      />

    
      <button
        onClick={handleAddToCart}
        disabled={!derived}
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
