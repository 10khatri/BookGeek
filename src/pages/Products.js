import React from "react";
import { ProductContext } from "../context/ProductContext";
export default function Products() {
  const { products } = React.useContext(ProductContext);
  return (
    <div className="product-container">
      {products.map((product) => {
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
                <span class="front">cart</span>
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
  );
}
