import React from "react";
export const ProductContext = React.createContext();
export default function ProductContextProvider({ children }) {
  const [products, setProducts] = React.useState([]);

  const [searchedProducts, setSearchedProducts] = React.useState("");
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <ProductContext.Provider
      value={{ products, setProducts, searchedProducts, setSearchedProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
}
