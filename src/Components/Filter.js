import React from "react";
import { useState } from "react";
const FilterComponent = ({
  handleCategory,
  handleRating,
  handleSort,
  handleClearAll,
}) => {
  const [rating, setRating] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [fictionChecked, setFictionChecked] = useState(false);
  const [nonFictionChecked, setNonFictionChecked] = useState(false);
  const [horrorChecked, setHorrorChecked] = useState(false);

  const handleRatingChange = (e) => {
    const value = e.target.value;
    setRating(value);
    handleRating(value);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    handleSort(value);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    if (value === "fiction") {
      setFictionChecked(checked);
    } else if (value === "non-fiction") {
      setNonFictionChecked(checked);
    } else if (value === "horror") {
      setHorrorChecked(checked);
    }

    handleCategory(value, checked);
  };

  const handleClearAllClick = () => {
    setRating("");
    setSortBy("");
    setFictionChecked(false);
    setNonFictionChecked(false);
    setHorrorChecked(false);
    handleClearAll();
  };

  return (
    <div className="filter-method">
      <div>
        <label htmlFor="rating">Rating</label>
        <br />
        <br />
        <select id="rating" value={rating} onChange={handleRatingChange}>
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
        <br />
        <br />
        <select id="sortby" value={sortBy} onChange={handleSortChange}>
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
            checked={fictionChecked}
            onChange={handleCategoryChange}
          />
          <span> Fiction </span>
        </label>{" "}
        <br />
        <label htmlFor="non-fiction">
          <input
            type="checkbox"
            id="non-fiction"
            value="non-fiction"
            checked={nonFictionChecked}
            onChange={handleCategoryChange}
          />
          <span> Non-Fiction </span>
        </label>{" "}
        <br />
        <label htmlFor="horror">
          <input
            type="checkbox"
            id="horror"
            value="horror"
            checked={horrorChecked}
            onChange={handleCategoryChange}
          />
          <span> Horror </span>
        </label>
      </div>
      <div className="clear-button">
        <button onClick={handleClearAllClick}>Clear All</button>
      </div>
    </div>
  );
};

export default FilterComponent;
