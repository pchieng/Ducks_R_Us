import React from 'react';
// import {
//     getAllProducts
// } 
// from '../axios-services';

const ProductList = (props) => {
    const { products } = props;
    return (
        <>
            <h1>PRODUCTS</h1>
            <div> {products.map(product =>
                <div className='productCard' key={product.id}>
                    <h3>{`${product.name}`}</h3>
                    <p>{`${product.description}`}</p>
                    <p>{`$${product.price}`}</p>
                </div>
            )}
            </div>
        </>


    )

}

export default ProductList;