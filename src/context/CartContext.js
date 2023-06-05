import React from "react";

export const CartContext = React.createContext();

export default function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = React.useState([]);
  const [isCheckout, setIsCheckout] = React.useState(false);

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
        // fetchCartItems(); original
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
        setCartItems((prevItems) => [...prevItems, result]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function removeFromCart(productId) {
    try {
      const response = await fetch(`/api/user/cart/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("encodedToken"),
        },
      });

      if (response.status === 200) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item._id !== productId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function updatePoductQuantity(productId, actionType) {
    try {
      const response = await fetch(`/api/user/cart/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("encodedToken"),
        },
        body: JSON.stringify({
          action: {
            type: actionType,
          },
        }),
      });

      if (response.status === 200) {
        setCartItems((prevItems) => {
          const updatedItems = prevItems.map((item) => {
            if (item._id === productId) {
              const updatedQuantity =
                actionType === "increment" ? item.qty + 1 : item.qty - 1;
              if (updatedQuantity === 0) {
                return null;
              }
              return {
                ...item,
                qty: updatedQuantity,
              };
            }
            return item;
          });
          return updatedItems.filter((item) => item !== null);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cartItems,
        setCartItems,
        fetchCartItems,
        removeFromCart,
        updatePoductQuantity,
        isCheckout,
        setIsCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
