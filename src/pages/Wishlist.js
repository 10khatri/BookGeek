import React, { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
export default function Cart() {
  const { wishlistItems, fetchWishlistItems, deleteFromWishlist } =
    useContext(WishlistContext);

  React.useEffect(() => {
    fetchWishlistItems();
  }, []);

  return (
    <div>
      <div className="product-container wishlist">
        {wishlistItems.map((product) => {
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
                    deleteFromWishlist(product._id);
                  }}
                >
                  <span class="front">Delete</span>
                </button>
                <button>
                  {" "}
                  <span class="front">Cart</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
