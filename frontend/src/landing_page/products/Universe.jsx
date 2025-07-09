import React from 'react';
import "./Universe.css";

function Universe() {
    return ( 
        <section className='products-universe-section'>
            <div className='container'>
                <div className='universe-text'>
                    <h2>Want to know more about our technology stack? Check out the <a>Zerodha.tech</a> blog.</h2>
                    <h1>The Zerodha Universe</h1>
                    <p>Extend your trading and investment experience even further with our partner platforms</p>
                </div>

                <div className='universe-logos'>
                    <div className='upper-logos'>
                        <div className='logo-div'>
                            <a>
                                <img src="media/images/zerodhaFundhouse.png" alt="zerodha-fund-image"/>
                                <p>
                                    Our asset managment venture 
                                    <br></br>
                                    that is creating simple and transparent index
                                    <br></br>
                                    funds to help you save for your goals.
                                </p>
                            </a>
                        </div>

                        <div className='logo-div'>
                            <a>
                                <img src="media/images/sensibullLogo.svg" alt="sensibull-image"/>
                                <p>
                                    Options trading platform that lets you
                                    <br></br>
                                    create strategies, analyze positions, and examine
                                    <br></br>
                                    data points like open interset, FII/DII, and more.
                                </p>
                            </a>
                        </div>

                        <div className='logo-div'>
                            <a>
                                <img src="media/images/tijori.svg" alt="tijori-image"/>
                                <p>
                                    Investment research platform
                                    <br></br>
                                    that offers detailed insights on stocks,
                                    <br></br>
                                    sectors, supply chains, and more.
                                </p>
                            </a>
                        </div>
                    </div>

                    <div className='lower-logos'>
                        <div className='logo-div'>
                            <a>
                                <img src="media/images/streakLogo.png" alt="streak-image"/>
                                <p>
                                    Systematic trading platform
                                    <br></br>
                                    that allows you to create and backtest
                                    <br></br>
                                    strategies without coding.
                                </p>
                            </a>
                        </div>
                        <div className='logo-div'>
                            <a>
                                <img src="media/images/smallcaseLogo.png" alt="smallcase-image" style={{width:"200px"}}/>
                                <p>
                                    Thematic investing platform
                                    <br></br>
                                    that helps you invest in diversified
                                    <br></br>
                                    baskets of stocks on ETFs.
                                </p>
                            </a>
                        </div>
                        <div className='logo-div'>
                            <a>
                                <img src="media/images/dittoLogo.png" alt="ditto-image" style={{width:"140px"}}/>
                                <p>
                                    Personalized advice on life
                                    <br></br>
                                    and health insurance. No spam
                                    <br></br>
                                    and no mis-selling.
                                </p>
                            </a>
                        </div>
                    </div>
                </div>

                <button>Signup for free</button>
            </div>
        </section>
     );
}

export default Universe;