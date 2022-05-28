import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import ProductList from "./products";
import ProductDetails from "./productDetails";
import Login from "./login";
import Register from "./register";
import ShoppingCart from "./cart";
import UsersList from "./allUsers";
import ReviewsList from "./allReviews";
import AllProductsList from "./allProducts";
import AddProduct from "./addProduct";
import EditProduct from "./editProduct";
import Navbar from "./Navbar/Navbar";

// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from "../axios-services";
import { getAllUsers } from "../axios-services/user";
import {
  getAllActiveProducts,
  getAllProducts,
} from "../axios-services/products";
import { getAllReviews } from "../axios-services/reviews";
import { getCartProducts } from "../axios-services/cart";

import "../style/App.css";

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
    };
    const getProductList = async () => {
      const products = await getAllActiveProducts();
      setProducts(products);
    };
    const getCart = async () => {
      const currentCartProducts = await getCartProducts();
      setCartProducts(currentCartProducts);
    };
    const getUsersList = async () => {
      const users = await getAllUsers();
      setUsers(users);
    };

    const getProductsList = async () => {
      const products = await getAllProducts();
      setProducts(products);
    };

    const getReviewsList = async () => {
      const reviews = await getAllReviews();
      setReviews(reviews);
    };
    const validToken = localStorage.getItem("token");
    if (validToken) setIsLoggedIn(true);

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getProductList();
    getCart();
    getAPIStatus();
    getUsersList();
    getProductsList();
    getReviewsList();
  }, []);

  return (
    <div className="app-container">
      <div>
        <Navbar />
      </div>
      <p>API Status: {APIHealth} ***We can take this off whenever.***</p>
      <Router>
        <div className="navabr">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/products">Products</Link>
          {/* <Link to="/cart">My Cart </Link> */}
        </div>
        <Route exact path="/products">
          <ProductList />
        </Route>
        <Route path="/products/:productId">
          <ProductDetails />
        </Route>
        <Route exact path="/login">
          <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/cart">
          <ShoppingCart cartProducts={cartProducts} />
        </Route>
        <Route path="/allReviews">
          <ReviewsList reviews={reviews} />
        </Route>
        <Route path="/allUsers">
          <UsersList users={users} />
        </Route>
        <Route exact path="/allProducts">
          <AllProductsList products={products} />
        </Route>
        <Route path="/allProducts/add">
          <AddProduct />
        </Route>
        <Route path="/allProducts/edit/:productId">
          <EditProduct />
        </Route>
      </Router>
    </div>
  );
};

export default App;
