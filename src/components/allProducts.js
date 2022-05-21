/* this will allow admins to add, edit, & delete products on the front end */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts, deleteProduct } from '../axios-services';






const AllProductsList = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProductsList = async () => {
            const products = await getAllProducts();
            setProducts(products);
        }
        getProductsList();
    }, [])

    return (
        <>
            <h1>PRODUCTS (Administrator View)</h1>
            <Link to='/allProducts/add'>
                <button>Add New Product</button>
            </Link>
            <br />
            <div> {products.map(product =>
                <div 
                    key={product.id}
                    style={{
                        borderStyle: "solid",
                        borderWidth: "2px",
                        borderRadius: "5px",
                        lineHeight: "0.3",
                        padding: "10px",
                        margin: "10px"
                    }}
                    >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly"
                        }}>
                    <Link to={`/allProducts/edit/${product.id}`}>
                        <button>Edit</button>
                    </Link>
                    <button
                        onClick={async () => {
                            if (window.confirm("Are you sure you want to delete this product?") == true) {
                                await deleteProduct(product.id);
                                alert('Product has been deleted')
                                setProducts(products.filter((filteredProduct) => filteredProduct.id !== product.id))
                            }
                        }}
                    >Delete</button>
                    </div>
                    <h3>{`Name: ${product.name}`}</h3>
                    <p>{`Description: ${product.description}`}</p>
                    <p>{`Category: ${product.category}`}</p>
                    <p>{`Quantity: ${product.quantity}`}</p>
                    <p>{`Price: $${product.price / 100}`}</p>
                    {product.isActive ?
                        <p style={{ color: "green", fontWeight: "bold" }}>ACTIVE</p>
                        :
                        <p style={{ color: "red", fontWeight: "bold" }}>NOT ACTIVE</p>
                    }
                </div>
            )}
            </div>
        </>

    )

}


export default AllProductsList;