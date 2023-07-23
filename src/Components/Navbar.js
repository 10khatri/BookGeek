import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ProductContext } from "../context/ProductContext";

export default function Navbar() {
  const { isLoggedIn, logout } = React.useContext(AuthContext);
  const { setSearchedProducts } = useContext(ProductContext);

  function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    setSearchedProducts(searchTerm);
  }

  function handleLogout() {
    logout();
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
          <input
            style={{ padding: "0 20px" }}
            type="text"
            placeholder="Search Books"
            onChange={handleSearch}
          />
        </div>
        <div className="nav-links">
          <Link to="/products">All Products</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart</Link>
          {isLoggedIn ? (
            <>
              <Link to="/user">User</Link>
              <Link to="/login" onClick={handleLogout}>
                Logout
              </Link>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
    </>
  );
}
