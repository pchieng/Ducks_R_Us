
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart, removeFromCart, clearCart } from '../../axios-services/cart';
import './cart.css'


const ShoppingCart = (props) => {
    const { isLoggedIn } = props;
    const [cartProducts, setCartProducts] = useState([]);


    useEffect(() => {
        const getMyCart = async () => {
            const currentCartProducts = await getCart();
            setCartProducts(currentCartProducts)
        };
        getMyCart()
    }, [])



    return (
        <>

            <h1 className='CartTitle'>Shopping Cart</h1>
            {isLoggedIn ?
                <>
                    <div className='cartPage'> {

                        cartProducts.length ?
                            <>
                                {cartProducts.map(cart => {
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
                                        <select id='quantity'>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                            <option value='5'>5</option>
                                        </select>
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
                                <Link to='/checkout'>
                                    <button
                                        className='Checkout'
                                        onClick={async () => {
                                            await clearCart(localStorage.getItem('userId'));
                                            setCartProducts([]);
                                            console.log(cartProducts)
                                        }
                                        }
                                    >Proceed to Checkout</button>
                                </Link>
                            </>
                            :
                            <div>Cart is empty</div>}
                    </div>

                </>
                :
                <div className='logInMessage'>Please log in to view cart</div>



            }

        </>


    )

}




export default ShoppingCart;