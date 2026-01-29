import type { ProductVariant } from '../types/product';

type VariantSelectorProps = {
  variants: ProductVariant[];
  selectedIndex: number;
  onChange: (index: number) => void;
};

function VariantSelector({
  variants,
  selectedIndex,
  onChange,
}: VariantSelectorProps) {
  return (
    <div style={styles.container}>
      {variants.map((variant, index) => (
        <button
          key={variant.size}
          onClick={(e) => {
            e.stopPropagation();
            onChange(index);
          }}
          style={{
            ...styles.button,
            ...(index === selectedIndex
              ? styles.selected
              : styles.unselected),
          }}
        >
          {variant.size}
        </button>
      ))}
    </div>
  );
}
const styles = {
  container: {
    display: 'flex',
    gap: '8px',
    marginTop: '12px',
  },
  button: {
    padding: '6px 10px',
    borderRadius: '6px',
    border: '1px solid #e5e7eb',
    cursor: 'pointer',
  },
  selected: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    borderColor: '#2563eb',
  },
  unselected: {
    backgroundColor: '#ffffff',
    color: '#000000',
  },
};

export default VariantSelector;