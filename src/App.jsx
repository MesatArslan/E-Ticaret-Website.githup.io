import { useEffect, useState } from 'react';
import './App.css';
import PageContainer from './container/PageContainer';
import Header from './components/Hheader';
import { Routes, Route } from "react-router-dom";
import Loading from './components/Loading';
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { calculateBasket, removeToBasket, setDrawer } from './redux/slices/basketSlice';
import Home from './pages/Home'
import ProductDetails from './components/ProductDetails'

function App() {

  const { products , drawer , totalAmount } = useSelector((store) => store.basket);
  const dispatch = useDispatch();

  const removeBasket = (productId) => {
    dispatch(removeToBasket({ id: productId }));
    dispatch(calculateBasket())
  };

  useEffect(() => {
    dispatch(calculateBasket());
  }, []);

  return (
    <div>
      <PageContainer>
        <Header/>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
          </Routes>

        </div>
        <Loading/>
        <Drawer anchor='right' open={drawer} onClose={() => dispatch(setDrawer())}>
          <div>
            <h2 className='drawer-h2'>Basket</h2>
            <hr />
          </div>
          {
            products && products.map((product) => (
              <div key={product.id}>
                <div className='flex-row drawer'>
                  <img className='drawer-image' src={product.image} alt="" />
                  <p className='drawer-p1'>{product.title} ({product.count})</p>
                  <p className='drawer-p2'>{product.price}₺</p>
                  <button onClick={() => removeBasket(product.id)} className='drawer-button'>Delete</button>
                </div>
              </div>
            ))
          }
          <div>
            <h2 className='drawer-h2'>Total Amount: {totalAmount}</h2>
          </div>
        </Drawer>
      </PageContainer>
    </div>
  );
}

export default App;
