import React from 'react'
import '../css/Product.css'
import { useNavigate } from 'react-router-dom';

function Product({ product }) {
    const { id, price, image, title, description } = product;   // object destructing

    const navigate = useNavigate();

    return (
        <div className='card'>
            <img className='image' src={image} alt="" />

            <div>
                <p className='card-p'>{title}</p>
                <h3 className='card-h3'>{price} ₺</h3>
            </div>

            <div className='flex-row'>
                <button onClick={()=>navigate("/product-details/" + id)} className='card-detailButton'>Details</button>
            </div>

        </div>
    )
}

export default Product