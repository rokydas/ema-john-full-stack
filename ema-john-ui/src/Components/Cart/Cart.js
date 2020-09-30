import React from 'react';
import { getDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';

const Cart = (props) => {
    const cart = getDatabaseCart();
    const productKeys = Object.keys(cart);
    const counts = Object.values(cart);

    const cartProducts = productKeys.map(key => {
        const product = fakeData.find( pd => pd.key === key);
        return product;
    })

    // console.log(cartProducts);

    for (let i = 0; i < cartProducts.length; i++) {
        cartProducts[i].count = counts[i];
    }

    let total = 0;
    let totalCount = 0;
    for (let i = 0; i < cartProducts.length; i++) {
        total += cartProducts[i].price * cartProducts[i].count;
        totalCount += cartProducts[i].count;
    }

    let shipping = 0;
    if(total > 100){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 10.99;
    }
    // console.log(cart);
    return (
        <div>
            <h5>Order Summary: {totalCount}</h5>
            <p>Items Ordered: {totalCount}</p>
            <p>Shipping Cost: {shipping}</p>
            <p>Total Price: {total + shipping}</p>
            {
                props.children
            }            
            
        </div>
    );
};

export default Cart;