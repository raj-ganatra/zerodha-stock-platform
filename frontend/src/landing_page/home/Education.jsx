import React from 'react';
import "./Education.css"

function Education() {
    return ( 
        <section className='education-section'>
            <div className='container'>
                <div className='education-image'>
                    <a><img src="media/images/education.svg" alt="education-image"/></a>
                </div>
                <div className='education-text'>
                    <h1>Free and open market education</h1>

                    <div className='education-para'>
                        <p>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>

                        <a>Varsity <i className="fa-solid fa-arrow-right"></i></a>
                    </div>

                    <div className='education-para'>
                        <p>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>

                        <a>TradingQ&A <i className="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Education;