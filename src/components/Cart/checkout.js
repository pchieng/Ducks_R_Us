import React from 'react';
import { Link } from 'react-router-dom';



const Checkout = () => {

    return (
        <div className='checkoutPage'>
            <h1>CHECKOUT</h1>
            <div>Your order has been placed!</div>
            <br />
            <div>Please expect 5-7 business days for shipping.</div>
            <br />
            <br />
            <Link to='/products'>
                <button className='continueShopping'>Continue Shopping</button>
            </Link>
        </div>





    )


}

export default Checkout;