import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

export default function Products() {
  const { addToWishlist, wishlistItems, fetchWishlistItems } =
    useContext(WishlistContext);
  const { addToCart, cartItems, fetchCartItems } = useContext(CartContext);
  const { products, filteredProducts } = useContext(ProductContext);

  const renderProducts =
    filteredProducts.length > 0 ? filteredProducts : products;

  const [addedWishlist, setAddedWishlist] = useState([]);
  const [addedCart, setAddedCart] = useState([]);

  useEffect(() => {
    fetchWishlistItems();
    fetchCartItems();
  }, []);

  useEffect(() => {
    setAddedWishlist(wishlistItems.map((item) => item._id));
  }, [wishlistItems]);
  useEffect(() => {
    setAddedCart(cartItems.map((item) => item._id));
  }, [cartItems]);

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
    setAddedWishlist((prevAdded) => [...prevAdded, product._id]);
  };

  const isAddedToWishlist = (productId) => {
    return addedWishlist.includes(productId);
  };
  const handleAddToCart = (product) => {
    if (addedCart.includes(product._id)) {
      return;
    } else {
      addToCart(product);
      setAddedCart((prevAdded) => [...prevAdded, product._id]);
    }
  };

  const isAddedToCart = (productId) => {
    return addedCart.includes(productId);
  };

  return (
    <div className="product-outer">
      <div className="filter-method">
        <label htmlFor="rating"> Rating </label>
        <select id="rating">
          <option value="one">1</option>
          <option value="two">2</option>
          <option value="three">3</option>
          <option value="four ">4</option>
          <option value="five">5</option>
        </select>
      </div>
      <div className="product-container">
        {renderProducts.map((product) => {
          const isProductAdded = isAddedToWishlist(product._id);
          const isProductAddedToCart = isAddedToCart(product._id);
          return (
            <div key={product._id} className="product">
              <Link to={`/products/${product.title}`}>
                <a className="book-container" href="" rel="noreferrer noopener">
                  <div className="book">
                    <img alt="" src={product.image} />
                  </div>
                </a>
              </Link>
              <div className="book-data">
                <h2>{product.title}</h2>
                <p>by {product.author}</p>
                <p>Price: {product.price}</p>
                <p>Rating: {product.rating}</p>
              </div>
              <div className="product-buttons">
                {isProductAddedToCart ? (
                  <button onClick={() => handleAddToCart(product)}>
                    <span className="front">
                      <Link to="/cart">Cart</Link>
                    </span>
                  </button>
                ) : (
                  <button onClick={() => handleAddToCart(product)}>
                    <span className="front">Add</span>
                  </button>
                )}

                <button
                  onClick={() => handleAddToWishlist(product)}
                  disabled={isProductAdded}
                >
                  <span className="front">
                    {isProductAdded ? "Added" : "Wishlist"}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
