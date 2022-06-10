
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart, removeFromCart } from '../../axios-services/cart';
import './cart.css'


const ShoppingCart = (props) => {
    const { isLoggedIn } = props;
    const [cartProducts, setCartProducts] = useState([]);
    const [subTotal, setSubTotal] = useState(0);

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
            {isLoggedIn ?
                <>
                    <div className='cartPage'> {cartProducts.map(cart => {
                        const product = cart.product
                        return <div className='cartCard' key={product.id}>
                            <div className='cartPictureDiv'>
                                <img src={`${product.picture}`} className='cartPicture' alt={`${product.name}`} />
                                <Link to={`/products/${product.id}`}>
                                    <p>{`${product.name}`}</p>
                                </Link >
                            </div>
                            <p id='cartPrice'>{`$${product.price / 100}`}</p>
                            <label htmlFor='quantity'>Qty:</label>
                            <input id='quantity' type="number" min='1' max={cart.product.quantity} required></input>
                            <button className='cartDeleteButton' onClick={async () => {
                                await removeFromCart(localStorage.getItem('userId'), product.id);
                                alert('Product has been removed from Cart')
                                setCartProducts(cartProducts.filter((filteredProduct) => filteredProduct.id !== product.id))
                                window.location.reload(false);
                            }}
                            >Remove</button>
                        </div>
                    }
                    )}
                    </div>
                    <div className='checkoutTotal'>
                        total
                    </div>
                    <div>
                        <button className='Checkout'>Proceed to Checkout</button>
                    </div>
                </>
                :
                <div>Please log in to view cart</div>



            }

        </>


    )

}




export default ShoppingCart;