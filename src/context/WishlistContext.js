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
      console.log(result.wishlist);
      if (response.status === 200) {
        setWishlistItems(result.wishlist);
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
      console.log(result.wishlist);
      if (response.status === 200) {
        setWishlistItems((prevItems) => [...prevItems, result.wishlist]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        addToWishlist,
        wishlistItems,
        setWishlistItems,
        fetchWishlistItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
