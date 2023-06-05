import React, { useContext, useEffect, useReducer, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../Components/Spinner";
import "react-toastify/dist/ReactToastify.css";
import reducer from "../Components/reducer";
import FilterComponent from "../Components/Filter";
import ProductItem from "../Components/ProductItem";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

export default function Products() {
  const { addToWishlist, wishlistItems, fetchWishlistItems } =
    useContext(WishlistContext);
  const { addToCart, cartItems, fetchCartItems } = useContext(CartContext);
  const { products, searchedProducts, isLoading } = useContext(ProductContext);
  const [addedWishlist, setAddedWishlist] = useState([]);
  const [addedCart, setAddedCart] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const initialState = {
    searchQuery: "",
    sortBy: null,
    categories: [],
    priceRange: null,
    rating: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchWishlistItems();
    fetchCartItems();
  }, []);

  useEffect(() => {
    dispatch({ type: "Input_SEARCH", value: searchedProducts });
  }, [searchedProducts]);

  useEffect(() => {
    let filteredData = [...products];

    if (state.searchQuery) {
      filteredData = filteredData.filter((product) =>
        product.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    }

    if (state.categories.length > 0) {
      filteredData = filteredData.filter((product) =>
        state.categories.includes(product.category)
      );
    }

    if (state.priceRange) {
      filteredData = filteredData.filter(
        (product) => product.price <= state.priceRange
      );
    }

    if (state.sortBy === "lowToHigh") {
      filteredData = filteredData.sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
    } else if (state.sortBy === "highToLow") {
      filteredData = filteredData.sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );
    }

    if (state.rating) {
      filteredData = filteredData.filter(
        (product) => product.rating >= state.rating
      );
    }

    setFilterData(filteredData);
  }, [state, products]);

  useEffect(() => {
    setAddedWishlist(wishlistItems.map((item) => item._id));
  }, [wishlistItems]);

  useEffect(() => {
    setAddedCart(cartItems.map((item) => item._id));
  }, [cartItems]);

  const handleCategory = (categoryValue) => {
    if (state.categories.includes(categoryValue)) {
      dispatch({
        type: "FILTER_BY_CATEGORY",
        value: state.categories.filter((cat) => cat !== categoryValue),
      });
    } else {
      dispatch({
        type: "FILTER_BY_CATEGORY",
        value: [...state.categories, categoryValue],
      });
    }
  };

  const handleClearAll = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

  const handleRating = (ratingValue) => {
    dispatch({ type: "FILTER_BY_RATING", value: ratingValue });
  };

  const handleSort = (order) => {
    dispatch({ type: "SORT_BY", value: order });
  };

  const handleAddToWishlist = async (product) => {
    if (isAddedToWishlist(product._id)) {
      return;
    }

    try {
      await addToWishlist(product);
      toast.success("Product added to Wishlist!");
    } catch (error) {
      toast.error("Failed to add product to Wishlist!");
      console.log(error);
    }
  };
  const isAddedToWishlist = (productId) => {
    return addedWishlist.includes(productId);
  };

  const handleAddToCart = async (product) => {
    if (addedCart.includes(product._id)) {
      return;
    } else {
      await addToCart(product);
      setAddedCart((prevAdded) => [...prevAdded, product._id]);
      toast.success("Product added to cart!");
    }
  };

  const isAddedToCart = (productId) => {
    return addedCart.includes(productId);
  };
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="product-outer">
      <FilterComponent
        handleCategory={handleCategory}
        handleRating={handleRating}
        handleSort={handleSort}
        handleClearAll={handleClearAll}
      />
      <div className="product-container">
        {filterData.map((product) => (
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
      <ToastContainer position="bottom-right" />
    </div>
  );
}
