import React, { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export default function Cart() {
  const { addToCart, cartItems } = useContext(CartContext);
  const { wishlistItems, fetchWishlistItems, deleteFromWishlist } =
    useContext(WishlistContext);

  React.useEffect(() => {
    fetchWishlistItems();
  }, []);

  const handleDeleteFromWishlist = (productId) => {
    deleteFromWishlist(productId);
    toast.success("Item deleted from wishlist!");
  };

  const handleAddToCart = (product) => {
    const existingCartItem = cartItems.find((item) => item._id === product._id);
    if (existingCartItem) {
      toast.info("Item already in cart!");
      return;
    }

    addToCart(product);
    toast.success("Item added to cart!");
  };

  return (
    <div>
      <div className="product-container wishlist">
        {wishlistItems.length === 0 ? (
          <h1
            style={{ marginTop: "10rem", width: "100vw", textAlign: "center" }}
          >
            Wishlist Is Empty!
          </h1>
        ) : (
          <>
            {wishlistItems.map((product) => {
              return (
                <div key={product.id} className="product">
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
                  </div>
                  <div className="product-buttons">
                    <button
                      onClick={() => {
                        handleDeleteFromWishlist(product._id);
                      }}
                    >
                      <span className="front">Delete</span>
                    </button>
                    {cartItems.some((item) => item._id === product._id) ? (
                      <button>
                        <Link to="/cart">
                          {" "}
                          <span className="front">Cart</span>
                        </Link>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          handleAddToCart(product);
                        }}
                      >
                        <span className="front">Add to </span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
