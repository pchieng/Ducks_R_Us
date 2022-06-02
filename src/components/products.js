import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllActiveProducts } from "../axios-services/products";
import { getAllCategories } from "../axios-services/categories";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [productsToDisplay, setProductsToDisplay] = useState([]);
  const [categoryList, setCategoryList] = useState([]);


  useEffect(() => {
    const getProductList = async () => {
      const products = await getAllActiveProducts();
      setProducts(products);
      setProductsToDisplay(products)
    }
    const getCategoryList = async () => {
      const categoryList = await getAllCategories();
      setCategoryList(categoryList);
    }

    getProductList();
    getCategoryList();
  }, [])


  return (
    <>
      <img
        id="productPageBanner"
        src="https://cdn.shopify.com/s/files/1/0266/3946/6556/collections/AO_Shop_-_generic_banner_option_A_blue_on_blue_-_full_size_f55e1614-a4bb-4b31-a44d-ceba4f9a3f6c_1500x.png?v=1608243228"
        style={{
          width: '100vw',
          height: '50vh',
          marginTop: '10px',
          objectFit: 'none'
        }}
      />
      <h1
        style={{
          margin: '5px'
        }}>PRODUCTS</h1>
      <select
        name='productCategory'
        id='productCategory'
        style={{
          margin: '30px',
          fontSize: '1.1rem',
          borderRadius: '10px',
          padding: '0.2rem 0.8rem'
        }}
        onChange={(event) => {
          if (event.target.value === 'none') {
            return;
          } else if (event.target.value === 'all') {
            setProductsToDisplay(products);
          } else {
            setProductsToDisplay(products.filter(product => product.categoryId === parseInt(event.target.value)))
          }
        }}
      >
        <option value='none'>- Select Product Category -</option>
        <option value='all'>All Products</option>
        {categoryList.sort().map((category) =>
          <option
            key={category.id}
            value={category.id}
          >{`${category.name.charAt(0).toUpperCase() + category.name.slice(1)}`}</option>
        )}
      </select>
      <div className='productPage'> {productsToDisplay.map(product =>
        <div className='productCard' key={product.id}>
          <Link to={`/products/${product.id}`}>
            <div className='productPictureDiv'>
              <img src={`${product.picture}`} className='productPicture' alt={`${product.name}`} />
            </div>
            <h3>{`${product.name}`}</h3>
          </Link>
          <p>{`${product.description}`}</p>
          <p>{`$${product.price / 100}`}</p>
        </div>
      )}
      </div>
    </>

  )}


export default ProductList;
