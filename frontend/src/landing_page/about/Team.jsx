import React from 'react';
import "./Team.css";

function Team() {
    return ( 
        <section className='team-section'>
            <div className='container'>
                <h1>People</h1>

                <div className='ceo-info'>
                    <div className='ceo-image'>
                        <img src="media/images/nithinKamath.jpg" alt="ceo-image"/>

                        <div className='ceo-name'>
                            <h2>Nithin Kamath</h2>
                            <p>Founder, CEO</p>
                        </div>
                    </div>

                    <div className='ceo-text'>
                        <p>
                            Nithin bootstrapped and founded Zerodha in 2010 to overcome the 
                            hurdles he faced during his decade long stint as a trader. 
                            Today, Zerodha has changed the landscape of the Indian broking industry.
                        </p>

                        <p>
                            He is a member of the SEBI Secondary Market Advisory Committee (SMAC) 
                            and the Market Data Advisory Committee (MDAC).
                        </p>

                        <p>
                            Playing basketball is his zen.
                        </p>

                        <p>
                            Connect on <a>Homepage</a> / <a>TradingQnA</a> / <a>Twitter</a>
                        </p>
                    </div>
                </div>

                <div className='team-info'></div>
            </div>
        </section>
    );
}

export default Team;