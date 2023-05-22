import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import ProductContextProvider from "./context/ProductContext";
import AuthContextProvider from "./context/AuthContext";
import CartContextProvider from "./context/CartContext";
import WishlistContextProvider from "./context/WishlistContext";
// Call make Server
makeServer();

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ProductContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>
          <Router>
            <App />
          </Router>
        </WishlistContextProvider>
      </CartContextProvider>
    </ProductContextProvider>
  </AuthContextProvider>
);
