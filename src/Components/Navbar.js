import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = React.useContext(AuthContext);

  return (
    <>
      <nav>
        <div className="nav-logo">
          <Link to="/">
            <h1>BookGeek</h1>
          </Link>
        </div>
        <div className="nav-search-bar">
          <input type="text" />
        </div>
        <div className="nav-links">
          <Link to="/products">All Products</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">{isLoggedIn ? "Logout" : "Login"}</Link>
          <Link to="/user">User</Link>
        </div>
      </nav>
    </>
  );
}
