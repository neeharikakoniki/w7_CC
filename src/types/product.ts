export type ProductVariant = {
  size: number;
  price: number;
};

export type Product = {
  id: string;
  name: string;
  image: string;
  category: string;
  variants: ProductVariant[];
};
