import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
export default function Cart() {
  const { cartItems, fetchCartItems } = useContext(CartContext);
  console.log(cartItems);
  React.useEffect(() => {
    fetchCartItems();
  }, []);
  console.log(cartItems);
  return (
    <div>
      <div className="product-container">
        {cartItems.map((product) => {
          return (
            <div key={product.id} className="product">
              <a
                class="book-container"
                href=""
                target="_blank"
                rel="noreferrer noopener"
              >
                <div class="book">
                  <img alt="" src={product.image} />
                </div>
              </a>
              <div className="book-data">
                <h2>{product.title}</h2>
                <p>by {product.author}</p>
              </div>
              <div className="product-buttons">
                <button>
                  <span class="front">Delete</span>
                </button>
                <button>
                  {" "}
                  <span class="front">wishlist</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
