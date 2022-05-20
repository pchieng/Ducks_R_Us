/* this will allow admins to add, edit, & delete products on the front end */

import React from 'react';



const AllProductsList = (props) => {

    const { products } = props;
    console.log(products)

    return (
        <>
            <h1>PRODUCTS</h1>
            <button>Create New Product</button>
            <br />
            <div> {products.map(product =>
                <div key={product.id}>
                    <button>Edit</button>
                    <h3>{`Name: ${product.name}`}</h3>
                    <p>{`Description: ${product.description}`}</p>
                    <p>{`Category: ${product.category}`}</p>
                    <p>{`Quantity: ${product.quantity}`}</p>
                    <p>{`Price: $${product.price}`}</p>
                    {product.isActive ?
                        <p style={{ color: "green" }}>ACTIVE</p>
                        :
                        <p style={{ color: "red" }}>NOT ACTIVE</p>
                    }
                    <p>===========</p>
                </div>
            )}
            </div>
        </>

    )

}


export default AllProductsList;