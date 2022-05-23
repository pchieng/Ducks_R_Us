import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllActiveProducts, getActiveProductsByCategory } from '../axios-services';



const ProductList = () => {

    const [products, setProducts] = useState([]);
    const [productsToDisplay, setProductsToDisplay] = useState([]);

    useEffect(() => {
        const getProductList = async () => {
            const products = await getAllActiveProducts();
            setProducts(products);
            setProductsToDisplay(products)
        }
        getProductList();
    }, [])

    // Collect all categories from the current product list
    const productCategories = products.map((product) => product.category);

    // Remove duplicate categories and alphabetize list
    const productCategoriesList = productCategories.filter(onlyUnique).sort();

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    const displayProductHandler = async (category) => {
        let displayedProducts = await getActiveProductsByCategory(category);
        setProductsToDisplay(displayedProducts)

    }


    return (
        <>
            <h1>PRODUCTS</h1>
            <select
                name='productCategory'
                id='productCategory'
                onChange={async (event) => {
                    if (event.target.value === '') {
                        return;
                    } else if (event.target.value === 'all') {
                        setProductsToDisplay(products);
                        return;
                    }
                    displayProductHandler(event.target.value)
                }}
            >
                <option value=''>-- Select Product Category --</option>
                <option value='all'>All Products</option>
                {productCategoriesList.map((category) =>
                    <option
                        key={category}
                        value={category}
                    >
                        {`${category.charAt(0).toUpperCase() + category.slice(1)}`}
                    </option>
                )}
            </select>
            <div className='productPage'> {productsToDisplay.map(product =>
                <div className='productCard' key={product.id}>
                    <Link to={`/products/${product.id}`}>
                    <div className='productPictureDiv'>
                        <img src={`${product.picture}`} className='productPicture' alt={`${product.name}`}/>
                    </div>
                        <h3>{`${product.name}`}</h3>
                    </Link>
                    <p>{`${product.description}`}</p>
                    <p>{`$${product.price/100}`}</p>
                </div>
            )}
            </div>
        </>


    )

}

export default ProductList;