import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
export default function Products() {
  const { addToWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const { products, filteredProducts } = React.useContext(ProductContext);

  const renderProducts =
    filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <div className="product-container">
      {renderProducts.map((product) => {
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
              <button
                onClick={() => {
                  addToCart(product);
                }}
              >
                <span class="front">cart</span>
              </button>
              <button
                onClick={() => {
                  addToWishlist(product);
                }}
              >
                {" "}
                <span class="front">wishlist</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
