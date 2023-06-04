import React from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";

import "react-toastify/dist/ReactToastify.css";
import Products from "./pages/Products";
import Navbar from "./Components/Navbar";
import User from "./pages/User";
import "./App.css";
import SignUp from "./pages/SignUp";
import Individual from "./pages/Individual";
import Login from "./pages/Login";
import { RequireAuth } from "./Components/RequireAuth";
export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/user" element={<User />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="products/:productId" element={<Individual />} />
        <Route
          path="/cart"
          element={
            <RequireAuth>
              <Cart />
            </RequireAuth>
          }
        />

        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
