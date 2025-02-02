import React, { useState } from 'react'
import '../css/Header.css'
import { BiBasket } from "react-icons/bi";
import { MdOutlineLightMode } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer } from '../redux/slices/basketSlice';
import logo from '../images/companylogo.png';
import { findSearchedProducts } from '../redux/slices/productSlice';


function Header() {

  const[theme, setTheme] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { products } = useSelector((store) => store.basket)

  const changeTheme = () => {
    const root = document.getElementById("root");
    if (!theme) {
      root.classList.add("dark-theme");
    } else {
      root.classList.remove("dark-theme");
    }
    setTheme(!theme);
  };

  const handleSearchChange = (e) => {
    dispatch(findSearchedProducts(e.target.value))
  };



  return (
    <div className='header-main-div'>
      <div onClick={()=>navigate('/')} className='flex-row'>
        <img className='logo' src={logo}/>
        <p className='logo-text'>MEA A.Ş</p>
      </div>

      <div className='flex-row'>
        <input className="search-input" type="text" placeholder='Search Something...' onChange={handleSearchChange}/>
        <div >
          {theme ? <MdOutlineLightMode  className='icon1' onClick={changeTheme}/> : <FaMoon className='icon1' onClick={changeTheme}/> }
          <Badge onClick={() => dispatch(setDrawer())} badgeContent={products.length} color='warning'>
            <BiBasket className='icon2'/>
          </Badge>
        </div>
      </div>
    </div>
  )
}

export default Header