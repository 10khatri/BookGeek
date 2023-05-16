import React from "react";

export default function Cart() {
  fetch("/api/products")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.products);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return <div>Cart</div>;
}
