import type { Product } from '../types/product';

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const firstVariant = product.variants[0];

  return (
    <div style={styles.card}>
      <img
        src={product.image}
        alt={product.name}
        style={styles.image}
      />

      <h3>{product.name}</h3>
      <p>Size: {firstVariant.size}</p>
      <p>Price: ${firstVariant.price}</p>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #e5e7eb',
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover' as const,
    marginBottom: '12px',
  },
};

export default ProductCard;
