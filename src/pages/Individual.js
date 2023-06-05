import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { ProductContext } from "../context/ProductContext";

export default function Individual() {
  const { addToWishlist, wishlistItems } = useContext(WishlistContext);
  const { addToCart, cartItems } = useContext(CartContext);
  const { productId } = useParams();
  const { products } = useContext(ProductContext);
  const productToRender = products.filter((p) => p.title === productId);
  const addedWishlist = wishlistItems.map((item) => item._id);
  const addedCart = cartItems.map((item) => item._id);

  function handleCart(product) {
    if (addedCart.includes(product._id)) {
      return;
    }
    addToCart(product);
    toast.success("Product added to cart!");
  }

  function handleWishlist(product) {
    if (addedWishlist.includes(product._id)) {
      return;
    }
    addToWishlist(product);
    toast.success("Product added to Wishlist!");
  }

  const isAddedToWishlist = (productId) => {
    return addedWishlist.includes(productId);
  };
  const isAddedToCart = (productId) => {
    return addedCart.includes(productId);
  };

  return (
    <div>
      <div className="product-container individual-container">
        {productToRender.map((product) => {
          const isWishlistDisabled = isAddedToWishlist(product._id);
          const wishlistButtonText = isWishlistDisabled ? "Added" : "wishlist";
          const isInCart = isAddedToCart(product._id);

          return (
            <div className="individual-product" key={product._id}>
              <div className="product">
                <button className="book-container">
                  <div className="book">
                    <img alt="" src={product.image} />
                  </div>
                </button>

                <div className="book-data">
                  <h2>{product.title}</h2>
                  <p>by {product.author}</p>
                </div>
              </div>
              <div className="desc">
                {product.description}
                <div className="product-buttons">
                  {isInCart ? (
                    <button>
                      <span className="front">
                        <Link to="/cart">Cart</Link>
                      </span>
                    </button>
                  ) : (
                    <button onClick={() => handleCart(product)}>
                      <span className="front">Add</span>
                    </button>
                  )}
                  <button
                    disabled={isWishlistDisabled}
                    onClick={() => {
                      handleWishlist(product);
                    }}
                  >
                    <span className="front">{wishlistButtonText}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
