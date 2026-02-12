import React from 'react';

type PriceLabelProps = {
  price: number;
};

export const PriceLabel: React.FC<PriceLabelProps> = ({ price }) => {
  return <div className="price-label">${price.toLocaleString()}</div>;
};

export default PriceLabel;
