import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey} = useParams();
    const ProductDetails = fakeData.find(pd => pd.key === productKey);
    // console.log(ProductDetails.key);
    // const {key, name, img, price, seller, shipping, star} = ProductDetails;
    return (
        <div>
            {/* <h1>Product details: </h1>
            <img src={img} alt=""/>
            <h3>Product key: {key}</h3>
            <h3>Product name: {name}</h3>
            <h3>Product price: {price}</h3>
            <h3>Product seller: {seller}</h3>
            <h3>Product shipping: {shipping}</h3>
            <h3>Product star: {star}</h3> */}
            <Product showAddToCart={false} key={ProductDetails.key} product={ProductDetails}></Product>
        </div>
    );
};

export default ProductDetails;