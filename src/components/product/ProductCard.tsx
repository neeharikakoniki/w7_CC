import { useEffect, useMemo, useState } from 'react';
import type { Product } from '../../types/product';
import VariantSelector from './VariantSelector';
import PriceLabel from './PriceLabel';
import type { CartItem } from '../../types/cart';

export type AddToCartPayload = Omit<CartItem, 'quantity'>;

type ProductCardProps = {
  product: Product;
  onAddToCart: (payload: AddToCartPayload) => void;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  const [variantIndex, setVariantIndex] = useState(0);
  const [showAdded, setShowAdded] = useState(false);
  const hasVariants = product.variants.length > 0;
  const derived = useMemo(() => {
    if (!hasVariants) {
      return null;
    }
    const variant = product.variants[variantIndex];
    return {
      displayName: product.name,
      price: variant.price,
      size: variant.size,
    };
  }, [product, variantIndex, hasVariants]);

  const handleAddToCart = () => {
    if (!derived) {
      return;
    }

    onAddToCart({
      productId: product.id,
      baseName: product.name,
      size: derived.size,
      price: derived.price,
    });
    setShowAdded(true);
  };

  useEffect(() => {
    if (!showAdded) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShowAdded(false);
    }, 1400);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [showAdded]);

  return (
    <article className="product-card">
      <img
        className="product-image"
        src={product.image}
        alt={product.name}
      />
      <h3 className="product-name">{derived ? derived.displayName : product.name}</h3>
      {derived && <PriceLabel price={derived.price} />}
      <VariantSelector
        variants={product.variants}
        selectedIndex={variantIndex}
        onChange={setVariantIndex}
      />
      <button
        type="button"
        className="add-button"
        onClick={handleAddToCart}
        disabled={!derived}
      >
        Add to cart
      </button>
      {showAdded && <p className="added-note">Added to cart</p>}
    </article>
  );
};

export default ProductCard;
