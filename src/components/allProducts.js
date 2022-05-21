/* this will allow admins to add, edit, & delete products on the front end */

import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../axios-services';






const AllProductsList = () => {

    const [products,setProducts] = useState([]);

    useEffect(() => {
        const getProductsList = async () => {
            const products = await getAllProducts();
            setProducts(products);
          }
          getProductsList();
    }, [])

    return (
        <>
            <h1>PRODUCTS</h1>
            <Link to='/allProducts/add'>
                <button>Add New Product</button>
            </Link>
            <br />
            <div> {products.map(product =>
                <div key={product.id}>
                    <Link to={`/allProducts/edit/${product.id}`}>
                    <button>Edit</button>
                    </Link>
                    <h3>{`Name: ${product.name}`}</h3>
                    <p>{`Description: ${product.description}`}</p>
                    <p>{`Category: ${product.category}`}</p>
                    <p>{`Quantity: ${product.quantity}`}</p>
                    <p>{`Price: $${product.price/100}`}</p>
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