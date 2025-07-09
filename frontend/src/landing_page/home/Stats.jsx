import React from 'react';
import "./Stats.css"

import { NavLink } from "react-router-dom";

function Stats() {
    return ( 
        <section className="ecosystem-section">
            <div className='container'>
                <div className='ecosystem-text'>
                    <h1>Trust with confidence</h1>

                    <div className='ecosystem-text-div'>
                        <h2>Customer-first always</h2>
                        <p>That's why 1.6+ crore customers trust Zerodha with ~ ₹6 lakh crores of equity investments and contribute to 15% of daily retail exchange volumes in India.</p>
                    </div>

                    <div className='ecosystem-text-div'>
                        <h2>No spam or gimmicks</h2>
                        <p>No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like. <a>Our philosophies</a>.</p>
                    </div>

                    <div className='ecosystem-text-div'>
                        <h2>The Zerodha universe</h2>
                        <p>Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.</p>
                    </div>

                    <div className='ecosystem-text-div'>
                        <h2>Do better with money</h2>
                        <p>With initiatives like <a>Nudge</a> and <a>Kill Switch</a>, we don't just facilitate transactions, but actively help you do better with your money.</p>
                    </div>

                </div>

                <div className='ecosystem-image'>
                    <NavLink to="/products"><img src="media/images/ecosystem.png" alt="Ecosystem-Image"/></NavLink>
                    <div className='anchor-div'>
                        <NavLink to="/products" className='a1'>Explore our products <i className="fa-solid fa-arrow-right"></i></NavLink>
                        <a href="http://localhost:5175/" className='a2'>Try Kite demo <i className="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Stats;