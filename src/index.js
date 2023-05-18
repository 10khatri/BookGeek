import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import ProductContextProvider from "./context/ProductContext";
// Call make Server
makeServer();

createRoot(document.getElementById("root")).render(
  <ProductContextProvider>
    <Router>
      <App />
    </Router>
  </ProductContextProvider>
);
