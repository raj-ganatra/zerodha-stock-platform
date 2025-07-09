import React from 'react';
import "./Hero.css";

function Hero() {
    return ( 
        <section className='hero-section'>
            <div className='container'>
                <div className='image-div'>
                    <img src="media/images/homeHero.png" alt="abc"/>
                </div>
                <h1>Invest in everything</h1>
                <p>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
                <br></br>
                <br></br>
                <br></br>
                <button className='hero-btn'>Sign up for free</button>
            </div>
        </section>
    );
}

export default Hero;