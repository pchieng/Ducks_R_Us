import React from 'react';
import { createCart } from '../axios-services/cart';

const ProductToCart = () => {
 

return (
    <>
    <div className='addToCartButton'> 
    <button onClick={async(event) => {
    event.preventDefault();
    await createCart(1, 5);
        
    }}
    >Add to Cart</button>
    </div>
</>
)
};
export default ProductToCart;