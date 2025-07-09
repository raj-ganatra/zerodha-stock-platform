import React from 'react';
import "./Hero.css";

function Hero() {
    return ( 
        <section className='about-hero-section'>
            <div className='container'>
                <div className='upper-text'>
                    <h2>
                        We pioneered the discount broking model in India.
                        <br></br>
                        Now, we are breaking ground with our technology.
                    </h2>
                </div>
                <hr></hr>
                <div className='lower-text'>
                    <div className='lower-left-text'>
                        <p>
                            We kick-started operations on the 15th of August, 2010 
                            with the goal of breaking all barriers that traders and 
                            investors face in India in terms of cost, support, and 
                            technology. We named the company Zerodha, a combination 
                            of Zero and "Rodha", the Sanskrit word for barrier.
                        </p>

                        <p>
                            Today, our disruptive pricing models and in-house technology 
                            have made us the biggest stock broker in India.
                        </p>

                        <p>
                            Over 1.6+ crore clients place billions of orders every year 
                            through our powerful ecosystem of investment platforms, 
                            contributing over 15% of all Indian retail trading volumes.
                        </p>
                    </div>
                    
                    <div className='lower-right-text'>
                        <p>
                            In addition, we run a number of popular open online educational 
                            and community initiatives to empower retail traders and investors.
                        </p>

                        <p>
                            <a>Rainmatter</a>, our fintech fund and incubator, has invested in several 
                            fintech startups with the goal of growing the Indian capital markets.
                        </p>

                        <p>
                            And yet, we are always up to something new every day. Catch up on the latest 
                            updates on our <a>blog</a> or see what the media is <a>saying about us</a> or learn more about 
                            our business and product <a>philosophies</a>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;