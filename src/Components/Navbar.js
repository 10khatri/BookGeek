import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ProductContext } from "../context/ProductContext";
export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn, set } = React.useContext(AuthContext);
  const { products, setProducts, filteredProducts, setFilteredProducts } =
    useContext(ProductContext);

  function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm)
    );
    setFilteredProducts(filtered);
  }
  return (
    <>
      <nav>
        <div className="nav-logo">
          <Link to="/">
            <h1>BookGeek</h1>
          </Link>
        </div>
        <div className="nav-search-bar">
          <input type="text" onChange={handleSearch} />
        </div>
        <div className="nav-links">
          <Link to="/products">All Products</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">{isLoggedIn ? "Logout" : "Login"}</Link>
          {isLoggedIn && <Link to="/user">User</Link>}
        </div>
      </nav>
    </>
  );
}
