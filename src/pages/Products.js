import React from "react";
import { products } from "../backend/db/products";
export default function Products() {
  console.log(products);
  return (
    <div className="product-container">
      {products.map((product) => {
        return (
          <div className="product">
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
              <button>cart</button>
              <button>wishlist</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
