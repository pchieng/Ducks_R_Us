import React from 'react';
import { Link } from 'react-router-dom';
// import {
//     getAllProducts
// } 
// from '../axios-services';


const ShoppingCart = (props) => {
    const { cartProducts } = props;
    return (
        <>
            
            <h1>Shopping Cart</h1>
            <div className='productPage'> {cartProducts.map(product =>
                <div className='productCard' key={product.id}>
                    <Link to={`/products/${product.id}`}>
                        <h3>{`${product.name}`}</h3>
                    </Link>
                    <p>{`${product.description}`}</p>
                    <p>{`$${product.price}`}</p>
                </div>
            )}
            </div>
        </>


    )

}




export default ShoppingCart;