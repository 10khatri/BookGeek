import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

function reducer(state, action) {
  switch (action.type) {
    case "Input_SEARCH": {
      return { ...state, searchQuery: action.value };
    }
    case "SORT_BY": {
      return { ...state, sortBy: action.value };
    }
    case "FILTER_BY_CATEGORY": {
      return { ...state, categories: action.value };
    }
    case "FILTER_BY_PRICE": {
      return { ...state, priceRange: action.value };
    }
    case "FILTER_BY_RATING": {
      return { ...state, rating: action.value };
    }
    default: {
      return state;
    }
  }
}

export default function Products() {
  const [addedWishlist, setAddedWishlist] = useState([]);
  const [addedCart, setAddedCart] = useState([]);
  const { addToWishlist, wishlistItems, fetchWishlistItems } =
    useContext(WishlistContext);
  const { addToCart, cartItems, fetchCartItems } = useContext(CartContext);
  const { products, searchedProducts } = useContext(ProductContext);
  const [filterData, setFilterData] = useState([]);
  const initialState = {
    productData: products,
    searchQuery: "",
    sortBy: null,
    categories: [],
    priceRange: null,
  };
  const [state, dispatch] = React.useReducer(reducer, initialState);

  function handleCategory(categoryValue) {
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
  }

  // function handlePrice(priceValue) {
  //   dispatch({ type: "FILTER_BY_PRICE", value: priceValue });
  // }
  function handleRating(ratingValue) {
    dispatch({ type: "FILTER_BY_RATING", value: ratingValue });
  }
  function handleSort(order) {
    dispatch({ type: "SORT_BY", value: order });
  }

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

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
    setAddedWishlist((prevAdded) => [...prevAdded, product._id]);
  };

  const isAddedToWishlist = (productId) => {
    return addedWishlist.includes(productId);
  };

  const handleAddToCart = (product) => {
    if (addedCart.includes(product._id)) {
      return;
    } else {
      addToCart(product);
      setAddedCart((prevAdded) => [...prevAdded, product._id]);
    }
  };

  const isAddedToCart = (productId) => {
    return addedCart.includes(productId);
  };

  return (
    <div className="product-outer">
      <div className="filter-method">
        <div>
          <label htmlFor="rating">Rating</label>
          <br />
          <select id="rating" onChange={(e) => handleRating(e.target.value)}>
            <option value="">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <label htmlFor="sortby">Sort By</label>
          <select id="sortby" onChange={(e) => handleSort(e.target.value)}>
            <option value="">All</option>
            <option value="lowToHigh">Price Low to High</option>
            <option value="highToLow">Price High to Low</option>
          </select>
        </div>
        <div className="categories-input">
          <h3>Categories</h3>
          <label htmlFor="fiction">
            <input
              type="checkbox"
              id="fiction"
              value="fiction"
              onChange={() => handleCategory("fiction")}
            />
            <span> Fiction </span>
          </label>{" "}
          <br />
          <label htmlFor="non-fiction">
            <input
              type="checkbox"
              id="non-fiction"
              value="non-fiction"
              onChange={() => handleCategory("non-fiction")}
            />
            <span> Non-Fiction </span>
          </label>{" "}
          <br />
          <label htmlFor="horror">
            <input
              type="checkbox"
              id="horror"
              value="horror"
              onChange={() => handleCategory("horror")}
            />
            <span> Horror </span>
          </label>
        </div>
        {/* <div>
          <label htmlFor="price-range">Price Range:</label>
          <br />
          <span>0</span>
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            id="price-range"
            onChange={(e) => handlePrice(e.target.value)}
          />{" "}
          <span>500</span>
        </div> */}
      </div>
      <div className="product-container">
        {filterData.map((product) => {
          const isProductAdded = isAddedToWishlist(product._id);
          const isProductAddedToCart = isAddedToCart(product._id);
          return (
            <div key={product._id} className="product">
              <Link to={`/products/${product.title}`}>
                <a className="book-container" href="" rel="noreferrer noopener">
                  <div className="book">
                    <img alt="" src={product.image} />
                  </div>
                </a>
              </Link>
              <div className="book-data">
                <h2>{product.title}</h2>
                <p>by {product.author}</p>
                <p>Price: {product.price}</p>
                <p>Rating: {product.rating}</p>
              </div>
              <div className="product-buttons">
                {isProductAddedToCart ? (
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
                  disabled={isProductAdded}
                >
                  <span className="front">
                    {isProductAdded ? "Added" : "Wishlist"}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
