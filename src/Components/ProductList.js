import React from "react";
import ProductItem from "./ProductItem";

const ProductList = ({
  products,
  handleAddToCart,
  handleAddToWishlist,
  isAddedToCart,
  isAddedToWishlist,
}) => {
  return (
    <div className="product-container">
      {products.map((product) => (
        <ProductItem
          key={product._id}
          product={product}
          handleAddToCart={handleAddToCart}
          handleAddToWishlist={handleAddToWishlist}
          isAddedToCart={isAddedToCart(product._id)}
          isAddedToWishlist={isAddedToWishlist(product._id)}
        />
      ))}
    </div>
  );
};

export default ProductList;
