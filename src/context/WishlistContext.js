import React from "react";

export const WishlistContext = React.createContext();

export default function WishlistContextProvider({ children }) {
  const [wishlistItems, setWishlistItems] = React.useState([]);

  const fetchWishlistItems = async () => {
    try {
      const response = await fetch("/api/user/wishlist", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("encodedToken"),
        },
      });
      const result = await response.json();

      if (response.status === 200) {
        setWishlistItems(result.wishlist);
        // fetchWishlistItems(); original
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function addToWishlist(product) {
    try {
      const response = await fetch("/api/user/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("encodedToken"),
        },
        body: JSON.stringify({ product }),
      });
      const result = await response.json();

      if (response.status === 200) {
        setWishlistItems((prevItems) => [...prevItems, result]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const deleteFromWishlist = async (productId) => {
    try {
      const response = await fetch(`/api/user/wishlist/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("encodedToken"),
        },
      });

      if (response.status === 200) {
        setWishlistItems((prevItems) =>
          prevItems.filter((item) => item._id !== productId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        addToWishlist,
        wishlistItems,
        setWishlistItems,
        fetchWishlistItems,
        deleteFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
