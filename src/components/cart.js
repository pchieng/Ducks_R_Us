
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCartProducts, removeFromCart } from '../axios-services';
// import {
//     getAllProducts
// } 
// from '../axios-services';



const ShoppingCart = () => {
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        const getCart = async () => {
            const currentCartProducts = await getCartProducts();
            setCartProducts(currentCartProducts)
        };
        getCart();
    }, [])
    return (
        <>

            <h1>Shopping Cart</h1>
            <div className='cartPage'> {cartProducts.map(product =>
                <div className='cartCard' key={product.id}>
                    <Link to={`/products/${product.id}`}>
                        <h3>{`${product.name}`}</h3>
                        <div className='cartPictureDiv'>
                            <img src={`${product.picture}`} className='cartPicture' alt={`${product.name}`} />
                        </div>
                    </Link>

                    <div id="mainDiv">
                        <button id="minus">-</button>
                        <span id="numberPlace">0</span>
                        <button id="plus">+</button>
                    </div>
                    <p>{`${product.description}`}</p>

                    <p>{`$${product.price}`}</p>
                    <button className='cartDeleteButton' onClick={async () => {
                        if (window.confirm("Are you sure you want to delete this product from cart") === true) {
                            await removeFromCart(product.id);
                            alert('Product has been removed from Cart')
                            setCartProducts(cartProducts.filter((filteredProduct) => filteredProduct.id !== product.id))
                        }
                    }}
                    >X</button>
                </div>
            )}
            </div>
        </>


    )

}




export default ShoppingCart;