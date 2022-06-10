import React from 'react';
import { createCart } from '../../axios-services/cart';

const AddToCart = (props) => {

    const { productId } = props

    return (
        <>
            <div className='addToCartButton'>
                <button onClick={
                        async (event) => {
                            event.preventDefault()
                            await createCart(localStorage.getItem('userId'), productId)
                        }}
                >Add to Cart</button>
            </div>
        </>
    )
};
export default AddToCart;