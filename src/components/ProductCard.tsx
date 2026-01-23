import type { Product } from '../types/product';


type ProductCardProps = {
  product: Product;
  isSelected: boolean;
  onSelect: (id: string) => void;
};


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
  selected:{
    borderColor: "black",
    backgroundColor: "#eff6ff",

  },
  notSelected:{
    borderColor: "black",
  }
};

function ProductCard({ product, isSelected, onSelect }: ProductCardProps) {
  const firstVariant = product.variants[0];

  return (
    <div style={{
      ...styles.card,
      ...(isSelected ? styles.selected : styles.notSelected),
    }}>
      <>
        <img
          src={product.image}
          alt={product.name}
          style={styles.image}
        />
        <h3>{product.name}</h3>
        <p>Size: {firstVariant.size}</p>
        <p>Price: ${firstVariant.price}</p>
      </>
    </div>
  );
}

export default ProductCard;
