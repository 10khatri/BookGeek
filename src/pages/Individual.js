import React from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
export default function Individual() {
  const { productId } = useParams();
  const { products } = React.useContext(ProductContext);
  const productToRender = [...products].filter((p) => p.title === productId);
  console.log(productToRender);
  return (
    <div>
      <div className="product-container individual-container">
        {productToRender.map((product) => {
          return (
            <div className="individual-product">
              <div key={product.id} className="product">
                <a class="book-container" href="" rel="noreferrer noopener">
                  <div class="book">
                    <img alt="" src={product.image} />
                  </div>
                </a>

                <div className="book-data">
                  <h2>{product.title}</h2>
                  <p>by {product.author}</p>
                </div>
              </div>
              <div className="desc">
                {product.description}
                <div className="product-buttons">
                  <button
                  // onClick={() => {
                  //   addToCart(product);
                  // }}
                  >
                    <span class="front">cart</span>
                  </button>
                  <button
                  // onClick={() => {
                  //   addToWishlist(product);
                  // }}
                  >
                    {" "}
                    <span class="front">wishlist</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
