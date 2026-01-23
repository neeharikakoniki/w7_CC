import type { Product } from '../types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Samsung QLED',
    image: 'https://picsum.photos/300/200?1',
    category: 'TV',
    variants: [
      { size: 66, price: 1200 },
      { size: 77, price: 1600 },
      { size: 88, price: 2100 },
    ],
  },
  {
    id: '2',
    name: 'LG OLED',
    image: 'https://picsum.photos/300/200?2',
    category: 'TV',
    variants: [
      { size: 55, price: 1400 },
      { size: 65, price: 1800 },
    ],
  },
];
