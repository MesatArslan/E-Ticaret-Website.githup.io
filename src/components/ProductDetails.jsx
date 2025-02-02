import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { setSelectedProduct } from '../redux/slices/productSlice';
import '../css/ProductDetails.css'
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { addToBasket, calculateBasket } from '../redux/slices/basketSlice';


function ProductDetails() {
    const { id } = useParams();
    const { products , selectedProduct} = useSelector((store)=> store.product)

    const { price, image, title, description } = selectedProduct;   // object destructing

    const [ count, setCount] = useState(0);

    const dispatch = useDispatch();


    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        if(count >0)
        {
            setCount(count - 1)
        }
    }

    const addBasket = () => {
        const payload = {
            id,
            price,
            image,
            title,
            description,
            count
        }
        if(count > 0)
        {
            dispatch(addToBasket(payload));
            dispatch(calculateBasket());
        }
    }


    useEffect(() => {
        getProductById();

    }, [])

    const getProductById = ()=> {
        products && products.map((product)=>{
            if(product.id == id)
            {
                dispatch(setSelectedProduct(product))
            }
        })
    }

    return (
        <div className='productDetails-card'>
            <div className='productDetails-card-image-div'>
                <img src={image} className='productDetails-card-image' alt="" />
            </div>
            <div>
                <h1 className='productDetails-card-title'>{title}</h1>
                <p className='productDetails-card-description'>{description}</p>
                <h1 className='productDetails-card-price'>{price}₺</h1>

                <div className='productDetails-card-icon-div'>
                    <CiCirclePlus onClick={increment} className='productDetails-card-icon-plus'/> 
                    <span className='productDetails-card-span'>{count}</span>
                    <CiCircleMinus onClick={decrement} className='productDetails-card-icon-minus'/>
                </div>

                <div>
                    <button onClick={addBasket} className='productDetails-card-button'>Add To Cart</button>
                </div>
            </div>

        </div>
    )
}

export default ProductDetails