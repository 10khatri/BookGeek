import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "../Components/Dialog";
import "@reach/dialog/styles.css";
import { WishlistContext } from "../context/WishlistContext";

export default function Cart() {
  const {
    cartItems,
    fetchCartItems,
    removeFromCart,
    updatePoductQuantity,
    isCheckout,
    setIsCheckout,
  } = useContext(CartContext);
  const { addToWishlist, wishlistItems } = useContext(WishlistContext);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  const handleDelete = (productId) => {
    removeFromCart(productId);
    toast.success("Item deleted from cart");
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((product) => {
      totalPrice += product.price * product.qty;
    });
    setTotalPrice(totalPrice);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty");
    } else {
      setIsCheckout(true);
    }
  };

  const closeModal = () => {
    setIsCheckout(false);
  };

  const handleWishlist = (product) => {
    const isAlreadyInWishlist = wishlistItems.some(
      (item) => item._id === product._id
    );

    if (isAlreadyInWishlist) {
      return;
    } else {
      addToWishlist(product);
      toast.success("Item added to wishlist");
    }
  };

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <h1 style={{ marginTop: "10rem", textAlign: "center" }}>
          Cart is empty!
        </h1>
      ) : (
        <div style={{ marginLeft: "0px" }} className="product-container cart">
          {cartItems.map((product, index) => {
            const isItemInWishlist = wishlistItems.some(
              (item) => item._id === product._id
            );

            return (
              <div key={`${product._id}-${index}`} className="product">
                <Link to={`/products/${product.title}`}>
                  <a
                    className="book-container"
                    href=""
                    rel="noreferrer noopener"
                  >
                    <div className="book">
                      <img alt="" src={product.image} />
                    </div>
                  </a>
                </Link>
                <div className="book-data">
                  <h2>{product.title}</h2>
                  <p>by {product.author}</p>
                </div>
                <div className="product-buttons">
                  <button
                    onClick={() => {
                      handleDelete(product._id);
                    }}
                  >
                    <span className="front">Delete</span>
                  </button>
                  <button
                    disabled={isItemInWishlist}
                    onClick={() => {
                      handleWishlist(product);
                    }}
                  >
                    <span className="front">
                      {isItemInWishlist ? "Added " : "Wishlist"}
                    </span>
                  </button>
                </div>
                <div className="qty-button">
                  <h4>Quantity:</h4>
                  <button
                    disabled={product.qty <= 1}
                    onClick={() => {
                      updatePoductQuantity(product._id, "decrement");
                    }}
                  >
                    -
                  </button>
                  {product.qty}
                  <button
                    onClick={() => {
                      updatePoductQuantity(product._id, "increment");
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="checkout">
        <h1>Total</h1>
        <h2>{cartItems.length} items</h2>
        <h2>Price: {totalPrice}</h2>
        <div className="product-buttons">
          <button onClick={handleCheckout}>
            <span className="front">Checkout</span>
          </button>
        </div>
      </div>
      {isCheckout && <Modal closeModal={closeModal} />}
      <ToastContainer position="bottom-right" />
    </div>
  );
}
