import { useMemo } from 'react';
import { useCart } from '../cart/CartContext';

function Header() {
  const { items } = useCart();
  const totalQuantity = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  return (
    <header className="header">
      <div className="header-inner">
        <p className="header-kicker">Curated Storefront</p>
        <h1 className="header-title">Shop</h1>
        <p className="header-cart-count">Cart items: {totalQuantity}</p>
      </div>
    </header>
  );
}

export default Header;
