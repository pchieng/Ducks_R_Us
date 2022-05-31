import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import searchBar from './searchBar';
import Announcer from './announcer';

const products = [
    { id: '1', name: 'This first post is about React' },
    { id: '2', name: 'This next post is about Preact' },
    { id: '3', name: 'We have yet another React post!' },
    { id: '4', name: 'This is the fourth and final post' },
];

const filterProducts = (products, query) => {
    if (!query) {
        return posts;
    }

    return products.filter((products) => {
        const products.Name = products.name.toLowerCase();
        return productsName.includes(query);
    });
};

const App = () => {
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const filteredProducts = filterProducts(products, searchQuery);

    return (
        <Router>
            <div className="App">
                <Announcer
                    message={`${filteredProducts.length} posts`}
                />
                <img src={logo} className="App-logo" alt="logo" />
                <Search
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
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

export default searchApp;