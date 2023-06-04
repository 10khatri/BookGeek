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
    case "CLEAR_FILTERS": {
      return {
        searchQuery: "",
        sortBy: null,
        categories: [],
        priceRange: null,
        rating: null,
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;
