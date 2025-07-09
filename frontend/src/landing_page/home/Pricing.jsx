import React from 'react';
import "./Pricing.css";

import { NavLink } from "react-router-dom";

function Pricing() {
    return ( 
        <section className='pricing-section'>
            <div className='container'>

                <div className='pricing-text'>
                    <h1>Unbeatable pricing</h1>
                    <p>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
                    <NavLink to="/pricing">See pricing <i className="fa-solid fa-arrow-right"></i></NavLink>
                </div>

                <div className='pricing-images'>
                    <div className='zero-logo-1'>
                        <img src="media/images/pricing0.svg" alt="zero-img"/>
                        <p>Free account opening</p>
                    </div>
                    
                    <div className='zero-logo-2'>
                        <img src="media/images/pricing0.svg" alt="zero-img"/>
                        <p> Free equity delivery and direct mutual funds</p>
                    </div>

                    <div className='twenty-logo'>
                        <img src="media/images/intradayTrades.svg" alt="twenty-img"/>
                        <p> Intraday and F&O</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Pricing;