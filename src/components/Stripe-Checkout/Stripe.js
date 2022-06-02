import React from 'react';
import { useState } from 'react';
// May need to import Product images. import './StripeStyle.css';
import StripeContainer from './StripeContainer';


function Stripe(props) {
    const [showItem, setShowItem] = useState(false);
    return (
        <div className='App'>
            <h1>Ducks'R'Us</h1>
            {showItem ? (
                <StripeContainer totalAmount={props.totalAmount} />
            ) : (
                <>
                        <h3>${props.totalAmount }</h3>
                    <img src={''} alt='' />
                        <button onClick={() => setShowItem(true)}>Purchase Product</button>
                </>
            )}
        </div>
    );
}

export default Stripe;