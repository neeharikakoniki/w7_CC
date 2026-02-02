import React from "react";
type PriceLabelProps = {
  price: number;
};

export const PriceLabel:React.FC<PriceLabelProps>= ({ price}) =>{
  return <div style = {{ fontWeight:600}} >${price.toLocaleString()}</div>
}
  


export default PriceLabel;
