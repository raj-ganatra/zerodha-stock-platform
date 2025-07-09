import React from 'react';
import "./Navbar.css";

import { NavLink } from "react-router-dom";

function Navbar() {
    return ( 
        <section className='navbar-section'>
            <div className='container'>
                <div className='navbar-zerodha-logo'>
                    <img src="media/images/logo.svg" alt="zerodha-logo"/>
                </div>

                <div className='navbar-links'>

                    <NavLink to="/signup" className={({isActive})=>{
                        return isActive ? "color" : null
                    }}>Signup</NavLink>

                    <NavLink to="/about" className={({isActive})=>{
                        return isActive ? "color" : null
                    }}>About</NavLink>

                    <NavLink to="/products" className={({isActive})=>{
                        return isActive ? "color" : null
                    }}>Products</NavLink>

                    <NavLink to="/pricing" className={({isActive})=>{
                        return isActive ? "color" : null
                    }}>Pricing</NavLink>

                    <NavLink to="/support" className={({isActive})=>{
                        return isActive ? "color" : null
                    }}>Support</NavLink>
                    
                    <i className="fa-solid fa-bars"></i>
                </div>
            </div>
        </section>
    );
}

export default Navbar;