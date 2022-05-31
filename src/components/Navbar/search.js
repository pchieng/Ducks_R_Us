import React from "react";
import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './SearchStyle.css';
import SearchBar from './searchBar';
import Announcer from './announcer';
import { getAllActiveProducts } from "../../axios-services/products";

const filterProducts = (products, query) => {
    if (!query) {
        return products;
    }

    return products.filter((products) => {
        products.name = products.name.toLowerCase();
        return products.name.includes(query);
    });
};

const Search = () => {
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState(query || '');
    const filteredProducts = filterProducts(products, searchQuery);

    return (
        <Router>
            <div className="App">
                <Announcer
                    message={`${filteredProducts.length} products`}
                />
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSubmit={async (e) => {
                        setProducts(await getAllActiveProducts());
                    }}
                />
                <ul>
                    {filteredProducts.map((product) => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
            </div>
        </Router>
    );
};

export default Search;