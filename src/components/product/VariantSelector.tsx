import type { ProductVariant } from '../../types/product';
import React from 'react';

export type VariantSelectorProps = {
  variants: ProductVariant[];
  selectedIndex: number;
  onChange: (index: number) => void;
};

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedIndex,
  onChange,
}) => {
  if (variants.length === 0) {
    return null;
  }

  return (
    <div className="variant-row">
      {variants.map((variant, index) => {
        const isSelected = index === selectedIndex;
        const isDisabled = variants.length === 1;
        return (
          <button
            key={variant.size}
            disabled={isDisabled}
            onClick={() => {
              onChange(index);
            }}
            className={`variant-button ${isSelected ? 'is-selected' : ''}`}
          >
            {variant.size}
          </button>
        );
      })}
    </div>
  );
};

export default VariantSelector;
