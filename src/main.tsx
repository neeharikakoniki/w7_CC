import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './cart/CartContext';
import './styles.css';

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
