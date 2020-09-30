import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    const data = props.data;
    const removeItem = props.removeItem;
    return (
        <div className="box">
            <h4>{data.name}</h4>
            <p>Price: {data.price}</p>
            <p>Key: {data.key}</p>
            <p>Sold by: {data.seller}</p>
            <p>Quantity: {data.count}</p>
            <button onClick={ () => removeItem(data.key)} className="cart-button">Remove</button>
        </div>
    );
};

export default ReviewItem;