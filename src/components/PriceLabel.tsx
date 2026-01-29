type PriceLabelProps = {
  price: number;
};

function PriceLabel({ price }: PriceLabelProps) {
  return <p>${price}</p>;
}

export default PriceLabel;
