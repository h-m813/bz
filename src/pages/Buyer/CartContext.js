import React, { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.name === product.name);
      if (found) {
        return prev.map((item) =>
          item.name === product.name ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  const setQty = (name, qty) => {
    setCart((prev) =>
      prev.map((item) => (item.name === name ? { ...item, qty } : item))
    );
  };

  const removeFromCart = (name) => {
    setCart((prev) => prev.filter((item) => item.name !== name));
  };

  // Calculate total items count
  const cartCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.qty, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, setQty, removeFromCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
}
