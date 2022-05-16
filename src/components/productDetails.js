import React from 'react';
import { useParams, Link } from 'react-router-dom';


const ProductDetails = (props) => {
    const { products } = props;
    const { productId } = useParams();

    const [product] = products.filter(product => product.id === parseInt(productId));

    return (
        <div className='productDetailsCard'>
            <h3>{`${product.name}`}</h3>
            <p>{`${product.description}`}</p>
            <p>{`$${product.price}`}</p>
            <Link to='/products'>
                <button>Back</button>
            </Link>
        </div>

    )
}

export default ProductDetails; 