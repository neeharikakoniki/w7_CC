import type { Product } from '../types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Basic T-Shirt',
    image: 'https://picsum.photos/300/200',
    category: 'Clothing',
    variants: [
      { size: 38, price: 19.99 },
      { size: 40, price: 21.99 },
    ],
  },
  {
    id: '2',
    name: 'Running Shoes',
    image: 'https://picsum.photos/300/200',
    category: 'Footwear',
    variants: [
      { size: 9, price: 59.99 },
      { size: 10, price: 64.99 },
    ],
  },
  {
    id: '3',
    name: 'Backpack',
    image: 'https://picsum.photos/300/200',
    category: 'Accessories',
    variants: [
      { size: 20, price: 39.99 },
      { size: 25, price: 44.99 },
    ],
  },
];
