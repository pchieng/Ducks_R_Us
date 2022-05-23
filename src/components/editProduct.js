import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../axios-services';
import { Link } from 'react-router-dom';





const EditProduct = () => {

    const { productId } = useParams();
    const [originalProduct, setOriginalProduct] = useState({});
    const [updatedProductName, setUpdatedProductName] = useState(null);
    const [updatedProductDescription, setUpdatedProductDescription] = useState(null);
    const [updatedProductCategory, setUpdatedProductCategory] = useState(null);
    const [updatedProductQuantity, setUpdatedProductQuantity] = useState(null);
    const [updatedProductPrice, setUpdatedProductPrice] = useState(null);
    const [updatedProductActive, setUpdatedProductActive] = useState(null);


    useEffect(() => {
        const getProductToEdit = async () => {
            const originalProduct = await getProductById(productId);
            setOriginalProduct(originalProduct);
        }
        getProductToEdit();
    }, [productId]);

    let updatedProductValues = {}


    if (updatedProductName) updatedProductValues.name = updatedProductName;
    if (updatedProductDescription) updatedProductValues.description = updatedProductDescription;
    if (updatedProductPrice) updatedProductValues.price = updatedProductPrice;
    if (updatedProductQuantity) updatedProductValues.quantity = updatedProductQuantity;
    if (updatedProductCategory) updatedProductValues.category = updatedProductCategory;
    if (updatedProductActive !== null) updatedProductValues.isActive = updatedProductActive;


    return (
        <>

            <h1>Update Product Information</h1>
            <form>
                <label htmlFor="updateProductName">Name: </label>
                <input
                    type="text"
                    id="updateProductName"
                    name="updateProductName"
                    defaultValue={originalProduct.name}
                    onChange={(event) => setUpdatedProductName(event.target.value)}
                />
                <br />
                <label htmlFor="updateProductDescription">Description: </label>
                <input
                    type="text"
                    id="updateProductDescription"
                    name="updateProductDescription"
                    style={{ height: "4rem", width: "400px", overflowWrap: "break-word"}}
                    defaultValue={originalProduct.description}
                    onChange={(event) => setUpdatedProductDescription(event.target.value)}
                />
                <br />
                <label htmlFor='updateProductCategory'>Category: </label>
                <input
                    type='text'
                    id='updateProductCategory'
                    name='updateProductCategory'
                    defaultValue={originalProduct.category}
                    onChange={(event) => setUpdatedProductCategory(event.target.value)}
                />
                <br />
                <label htmlFor='updateProductQuantity'>Quantity: </label>
                <input
                    type='text'
                    id='updateProductQuantity'
                    name='updateProductQuantity'
                    defaultValue={originalProduct.quantity}
                    onChange={(event) => setUpdatedProductQuantity(event.target.value)}
                />
                <br />
                <label htmlFor='updateProductPrice'>Price (in cents): </label>
                <input
                    type='text'
                    id='updateProductPrice'
                    name='updateProductPrice'
                    defaultValue={originalProduct.price}
                    onChange={(event) => setUpdatedProductPrice(event.target.value)}
                />
                <br />
                <label htmlFor='updateProductActive'>Status: </label>
                <select
                    id='updateProductActive'
                    name='updateProductActive'
                    onChange={(event) =>
                        setUpdatedProductActive(event.target.value === "Active")
                    }
                >
                    {originalProduct.isActive ?
                        <>
                            <option>Not Active</option>
                            <option selected>Active</option>
                        </>
                        :
                        <>
                            <option selected>Not Active</option>
                            <option>Active</option>
                        </>
                    }
                </select>
                <br />
                <br />

                <Link to='/allProducts'>
                    <button>Back</button>
                </Link>

                <button
                    onClick={async (event) => {
                        event.preventDefault();
                        const result = await updateProduct(productId, updatedProductValues);
                        if (result) alert('Product has been updated');
                    }}
                >Submit Changes</button>


            </form>
        </>

    )




}


export default EditProduct;