import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);
    // console.log(products[0]);

    const addButton = (product) => {
        // console.log(product);
        const newCart = [...cart, product];
        setCart(newCart);
        const sameProducts = newCart.filter(pd => pd.key === product.key);
        // console.log(sameProducts);
        const count = sameProducts.length;
        addToDatabaseCart(product.key, count);
    }
    
    // console.log(fakeData);
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(product => <Product showAddToCart={true} key={product.key} addButton={addButton} product={product}></Product>)
                }           
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="cart-button">Review Order</button>
                    </Link>
                </Cart>
            </div>
            
        </div>
    );
};

export default Shop;