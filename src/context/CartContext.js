import React from "react";

export const CartContext = React.createContext();

export default function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = React.useState([]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch("/api/user/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("encodedToken"),
        },
      });
      const result = await response.json();

      if (response.status === 200) {
        setCartItems(result.cart);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function addToCart(product) {
    try {
      const response = await fetch("/api/user/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("encodedToken"),
        },
        body: JSON.stringify({ product }),
      });
      const result = await response.json();

      if (response.status === 200) {
        setCartItems((prevItems) => [...prevItems, result.cart]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CartContext.Provider
      value={{ addToCart, cartItems, setCartItems, fetchCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
}
