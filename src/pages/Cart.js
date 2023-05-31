import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { Modal } from "../Components/Dialog";
export default function Cart() {
  const {
    cartItems,
    fetchCartItems,
    removeFromCart,
    updatePoductQuantity,
    isCheckout,
    setIsCheckout,
  } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((product) => {
      totalPrice += product.price * product.qty;
    });
    setTotalPrice(totalPrice);
  };
  const handleCheckout = () => {
    setIsCheckout(true);
  };

  const closeModal = () => {
    setIsCheckout(false);
  };

  return (
    <div className="cart-container">
      <div className="product-container cart">
        {cartItems.map((product, index) => {
          return (
            <div key={`${product._id}-${index}`} className="product">
              <a className="book-container" href="" rel="noreferrer noopener">
                <div className="book">
                  <img alt="" src={product.image} />
                </div>
              </a>
              <div className="book-data">
                <h2>{product.title}</h2>
                <p>by {product.author}</p>
              </div>
              <div className="product-buttons">
                <button
                  onClick={() => {
                    removeFromCart(product._id);
                  }}
                >
                  <span className="front">Delete</span>
                </button>
                <button>
                  <span className="front">wishlist</span>
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
    </div>
  );
}
