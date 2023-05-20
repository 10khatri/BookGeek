import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import ProductContextProvider from "./context/ProductContext";
import AuthContextProvider from "./context/AuthContext";
// Call make Server
makeServer();

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ProductContextProvider>
      <Router>
        <App />
      </Router>
    </ProductContextProvider>
  </AuthContextProvider>
);
