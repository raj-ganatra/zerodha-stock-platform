import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './landing_page/home/HomePage'
import About from "./landing_page/about/About.jsx";
import Products from './landing_page/products/Products.jsx';
import Support from "./landing_page/support/Support.jsx";
import Pricing from "./landing_page/pricing/Pricing.jsx";
import Signup from './landing_page/signup/Signup.jsx';

import ScrollTop from './landing_page/ScrollTop.jsx';

import axios from "axios";

// https://frontend-l0do.onrender.com  render route

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ScrollTop/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/pricing" element={<Pricing/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/support" element={<Support/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
