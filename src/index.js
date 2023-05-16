import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";

// Call make Server
makeServer();

createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>
);
