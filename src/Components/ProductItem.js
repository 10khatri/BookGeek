import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({
  product,
  handleAddToCart,
  handleAddToWishlist,
  isAddedToCart,
  isAddedToWishlist,
}) => {
  return (
    <div key={product._id} className="product">
      <Link to={`/products/${product.title}`}>
        <a className="book-container">
          <div className="book">
            <img alt="" src={product.image} />
          </div>
        </a>
      </Link>
      <div className="book-data">
        <h2>{product.title}</h2>
        <p>by {product.author}</p>
        <p>{product.category}</p>
        <p>Price: {product.price} INR</p>
        <p>Rating: {product.rating}</p>
      </div>
      <div className="product-buttons">
        {isAddedToCart ? (
          <button onClick={() => handleAddToCart(product)}>
            <span className="front">
              <Link to="/cart">Cart</Link>
            </span>
          </button>
        ) : (
          <button onClick={() => handleAddToCart(product)}>
            <span className="front">Add</span>
          </button>
        )}

        <button
          onClick={() => handleAddToWishlist(product)}
          disabled={isAddedToWishlist}
        >
          <span className="front">
            {isAddedToWishlist ? "Added" : "Wishlist"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
