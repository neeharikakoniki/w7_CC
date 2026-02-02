import type { ProductVariant } from '../../types/product';
import React from 'react';
export type VariantSelectorProps = {
  variants: ProductVariant[];
  selectedIndex: number;
  onChange: (index: number) => void;
};

export const VariantSelector: React.FC<VariantSelectorProps>=({
  variants,
  selectedIndex,
  onChange,
}) =>{
if(variants.length ===0)
{
  return null;
}


  return (
    <div style={styles.container}>
      {variants.map((variant, index) => {
        const isSelected = index === selectedIndex;
        const isDisabled = variants.length === 1;
        return (
          <button
            key={variant.size}
            disabled = {isDisabled}
            onClick={() => {
              onChange(index);
            }}
            style={{
              ...styles.button,
              ...(isSelected
                ? styles.selected
                : styles.unselected),
            }}
          >
            {variant.size}
          </button>
        );
      })}
    </div>
   );
};

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