import React from "react";
import { products } from "../backend/db/products";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import "../App.css";
import { ProductContext } from "../context/ProductContext";
export default function Home() {
  const { products } = React.useContext(ProductContext);
  return (
    <>
      <Marquee>
        {products.map((product) => {
          return (
            <div style={{ margin: "0 30px" }} className="home-page-container">
              <div>
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
              </div>
            </div>
          );
        })}
      </Marquee>
      <h1 style={{ textAlign: "center" }}>
        Explore all our books here: <Link to="/products">All Books</Link>
      </h1>
    </>
  );
}
