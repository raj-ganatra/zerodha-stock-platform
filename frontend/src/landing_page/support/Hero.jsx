import React from 'react';
import "./Hero.css";

function Hero() {
    return ( 
        <section className='support-hero-section'>
            <div className='container'>
                <div className='left-text'>
                    <h1>Support Portal</h1>
                    <h2>Search for an answer or browse help topics to create a <br></br>ticket</h2>

                    <input placeholder='Eg: how do i active F&O, why is my order getting rejected ...'/>
                    <i className="fa-solid fa-magnifying-glass"></i>

                    <a href="#">Track account opening</a>
                    <a href="#">Track segment activation</a>
                    <a href="#">Intraday margins</a>
                    <br></br>
                    <br></br>
                    <a href="#">Kite user manual</a>
                </div>

                <div className='right-text'>
                    <a href="#" className='upper-link'>Track Tickets</a>
                    
                    <h1>Featured</h1>

                    <p>1. <a href="#">Surveillance measure on scrips - June 2025</a></p>
                    <p>2. <a href="#">Rights Entitlements listing in June 2025</a></p>
                </div>
            </div>
        </section>
    );
}

export default Hero;