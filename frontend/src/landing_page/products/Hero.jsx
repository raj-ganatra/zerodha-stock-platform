import React from 'react';
import "./Hero.css";

function Hero() {
    return ( 
        <section className='product-hero-section'>
            <div className='container'>
                <h1>Zerodha Products</h1>
                <h2>Sleek, modern, and intuitive trading platforms</h2>
                <p>Check out our <a>investment offerings  →</a></p>
            </div>
            <hr></hr>
        </section>
    );
}

export default Hero;