/* this will allow admins to add, edit, & delete products on the front end */

import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts, deleteProduct } from '../axios-services';






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
                    <button
                        onClick={async () => {
                            if (window.confirm("Are you sure you want to delete this product?") == true) {
                                await deleteProduct(product.id);
                                alert('Product has been deleted')
                                setProducts(products.filter((filteredProduct) => filteredProduct.id !== product.id))
                            }
                        }}
                    >Delete</button>
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