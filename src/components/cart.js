
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart, removeFromCart } from '../axios-services/cart';
// import {
//     getAllProducts
// } 
// from '../axios-services';



const ShoppingCart = () => {
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        const getMyCart = async () => {
            const currentCartProducts = await getCart();
            setCartProducts(currentCartProducts)
        };
        getMyCart();
    }, [])
    return (
        <>

            <h1 className='CartTitle'>Shopping Cart</h1>
            <div className='cartPage'> {cartProducts.map(cart => {
                const product = cart.product
                return <div className='cartCard' key={product.id}>
                    <Link to={`/products/${product.id}`}>
                        <h3>{`${product.name}`}</h3>
                        <div className='cartPictureDiv'>
                            <img src={`${product.picture}`} className='cartPicture' alt={`${product.name}`} />
                        </div>
                    </Link>
                    <div id="mainDiv">
                        <input id='quantity' type={"number"} min={1} max={cart.product.quantity}></input>
                    </div>
                    <p>{`${product.description}`}</p>

                    <p>{`$${product.price}`}</p>
                    <button className='cartDeleteButton' onClick={async () => {
                        // if (window.confirm("Are you sure you want to delete this product from cart") === true) {
                        await removeFromCart(localStorage.getItem('userId'), product.id);
                        alert('Product has been removed from Cart')
                        setCartProducts(cartProducts.filter((filteredProduct) => filteredProduct.id !== product.id))
                        //}
                    }}
                    >X</button>
                </div>
            }
            )}
            </div>
            <div>
                <button className='Checkout'>Proceed to Checkout</button>
            </div>
        </>


    )

}




export default ShoppingCart;