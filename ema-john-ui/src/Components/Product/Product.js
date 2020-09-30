import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props.product);
    const product = props.product;
    const features = product.features;
    const addButton = props.addButton;
    // console.log(features);
    // console.log(props.features[0]);
    return (
        <div className="product-box">
            <div className="product-img">
                <img src={product.img} alt=""/>
            </div>
            <div className="product-details">
                <h6><Link to={"/products/"+product.key}>{product.name}</Link></h6>
                <div className="brand-feature">
                    <div className="brand">
                        <h6>by: {product.seller}</h6>
                        <h6>${product.price}</h6>
                        <h6>Only {product.stock} left in stock - order soon</h6>
                        {props.showAddToCart && 
                        <button onClick={() => addButton(product)} className="cart-button">
                            <FontAwesomeIcon icon={faShoppingCart} />
                            Add to cart
                        </button>}
                    </div>
                    <div className="feature">
                        <ul>
                            {
                                features.map(feature => <li>{feature.description}: {feature.value}</li>)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;