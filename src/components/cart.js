import React from 'react';
import { Link } from 'react-router-dom';
import Stripe from './Stripe-Checkout/Stripe';
// import {
//     getAllProducts
// } 
// from '../axios-services';


const ShoppingCart = (props) => {
    const { cartProducts } = props;

    let total = 0 
    for (let i = 0; i < cartProducts.length; i++)   {
        // console.log(cartProducts[i])
        let product = cartProducts[i];
        let price = product.price
        total += price 

    }
        
        
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
 
            <Stripe totalAmount={total} />
        </>


    )

}




export default ShoppingCart;