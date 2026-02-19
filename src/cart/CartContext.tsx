import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { CartItem } from '../types/cart';

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (productId: string, size: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: Omit<CartItem, 'quantity'>): void => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (cartItem) =>
          cartItem.productId === item.productId && cartItem.size === item.size
      );

      if (existingIndex >= 0) {
        return prevItems.map((cartItem, index) =>
          index === existingIndex
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (productId: string, size: number): void => {
    setItems((prevItems) =>
      prevItems.filter(
        (cartItem) =>
          !(cartItem.productId === productId && cartItem.size === size)
      )
    );
  };

  const clear = (): void => {
    setItems([]);
  };

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      removeItem,
      clear,
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
