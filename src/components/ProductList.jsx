import React from 'react'
import { useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { getAllProducts } from '../redux/slices/productSlice';
import Product from './Product';


function ProductList() {
    const dispatch = useDispatch();
    const {products , searchedProducts} = useSelector((store)=> store.product)

    useEffect(()=>{
        dispatch(getAllProducts())
    }, [])

  return (
    <div className='flex-row' style={{flexWrap:'wrap', marginTop:'25px'}}>
      {
        // Eğer searchedProducts doluysa, onları göster
        (searchedProducts.length > 0 ? searchedProducts : products).map((product) => (
          <Product key={product.id} product={product} />
        ))
      }
    </div>
  )
}

export default ProductList 
