import React from 'react';
import "./Hero.css";

function Hero() {
    return ( 
        <section className='pricing-hero-section'>
            <div className='container'>
                <div className='heading'>
                    <h1>Charges</h1>
                    <h2>List of all charges and taxes</h2>
                </div>

                <div className='pricing-info'>
                    <div className='pricing-info-div div-1'>
                        <img src="media/images/pricing0.svg" alt="zero-image"/>
                        <h1>
                            Free equity delivery
                        </h1>
                        <p>
                            All equity delivery investments (NSE, BSE),
                            <br></br>
                            are absolutely free — ₹ 0 brokerage.
                        </p>
                    </div>

                    <div className='pricing-info-div div-2'>
                        <img src="media/images/intradayTrades.svg" alt="twenty-image"/>
                        <h1>
                            Intraday and F&O trades
                        </h1>
                        <p>
                            Flat ₹ 20 or 0.03% (whichever is lower) per
                            <br></br>
                            executed order on intraday trades across
                            <br></br>
                            equity, currency, and commodity trades. Flat
                            <br></br>
                            ₹20 on all option trades.
                        </p>
                    </div>

                    <div className='pricing-info-div div-3'>
                        <img src="media/images/pricing0.svg" alt="zero-image"/>
                        <h1>
                            Free direct MF
                        </h1>
                        <p>
                            All direct mutual fund investments are
                            <br></br>
                            absolutely free — ₹ 0 commissions & DP
                            <br></br>
                            charges.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;