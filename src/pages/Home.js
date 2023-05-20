import React from "react";
import { products } from "../backend/db/products";
import "../App.css";
import { Modal } from "../Components/Dialog";
export default function Home() {
  return (
    <>
      <div className="home-page-container">
        <div>
          <a
            class="book-container"
            href=""
            target="_blank"
            rel="noreferrer noopener"
          >
            <div class="book">
              <img alt="" src={products[0].image} />
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
