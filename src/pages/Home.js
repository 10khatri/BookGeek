import React from "react";
import { products } from "../backend/db/products";
import Marquee from "react-fast-marquee";
import "../App.css";
import { ProductContext } from "../context/ProductContext";
export default function Home() {
  const { product } = React.useContext(ProductContext);
  return (
    <>
      <Marquee>
        {products.map((product) => {
          return (
            <div style={{ margin: "0 30px" }} className="home-page-container">
              <div>
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
              </div>
            </div>
          );
        })}
      </Marquee>
    </>
  );
}
