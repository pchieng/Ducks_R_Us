import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllActiveProducts } from "../axios-services/products";
import { getAllCategories } from "../axios-services/categories";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [productsToDisplay, setProductsToDisplay] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const getProductList = async () => {
      const products = await getAllActiveProducts();
      setProducts(products);
      setProductsToDisplay(products);
    };
    const getCategoryList = async () => {
      const categoryList = await getAllCategories();
      setCategoryList(categoryList);
    };

    getProductList();
    getCategoryList();
  }, []);

  return (
    <>
      <h1>PRODUCTS</h1>
      <select
        name="productCategory"
        id="productCategory"
        onChange={(event) => {
          if (event.target.value === "none") {
            return;
          } else if (event.target.value === "all") {
            setProductsToDisplay(products);
          } else {
            setProductsToDisplay(
              products.filter(
                (product) => product.categoryId === parseInt(event.target.value)
              )
            );
          }
        }}
      >
        <option value="none">-- Select Product Category --</option>
        <option value="all">All Products</option>
        {categoryList.sort().map((category) => (
          <option key={category.id} value={category.id}>{`${
            category.name.charAt(0).toUpperCase() + category.name.slice(1)
          }`}</option>
        ))}
      </select>
      <div className="productPage">
        {" "}
        {productsToDisplay.map((product) => (
          <div className="productCard" key={product.id}>
            <Link to={`/products/${product.id}`}>
              <div className="productPictureDiv">
                <img
                  src={`${product.picture}`}
                  className="productPicture"
                  alt={`${product.name}`}
                />
              </div>
              <h3>{`${product.name}`}</h3>
            </Link>
            <p>{`${product.description}`}</p>
            <p>{`$${product.price / 100}`}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
