import { useHistory } from 'react-router-dom';
import "/searchStyle.css"
import { getAllActiveProducts } from "../axios-services/products";

const searchBar = ({ searchQuery, setSearchQuery }) => {
    const history = useHistory();
    const onSubmit = (e) => {
        history.push(`?s=${searchQuery}`);
        e.preventDefault();
    };

    return (
    
        <form
            action="/"
            method="get"
            autoComplete="off"
            onSubmit={onSubmit}
        >
            <label htmlFor="header-search">
                <span className="visually-hidden">
                    Search Products
                </span>
            </label>
            <input
                value={searchQuery}
                onInput={(e) => setSearchQuery(e.target.value)}
                type="text"
                id="header-search"
                placeholder="Products"
                name="s"
            />
            <button type="submit">Search</button>
            </form>
    );
};

export default SearchBar;