import React from 'react';
import "./ExplainedCharges.css";

function ExplainedCharges() {
    return ( 
        <section className='pricing-explainedcharges-section'>
            <div className='container'>
                <div className='upper-div'>
                    <h1>Charges for account opening</h1>

                    <table>
                        <thead>
                            <tr>
                                <th>Type of account</th>
                                <th>Charges</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Online account</td>
                                <td><span>FREE</span></td>
                            </tr>

                            <tr>
                                <td>Offine account</td>
                                <td><span>FREE</span></td>
                            </tr>

                            <tr>
                                <td>NRI account(offline only)</td>
                                <td>Rs. 500</td>
                            </tr>

                            <tr>
                                <td>Patnership, LLP,HUF, or Corporate accounts (offline only)</td>
                                <td>Rs. 500</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='lower-div'>
                    <h1>Charges for optional value added services</h1>

                    <table>
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Billing Frequency</th>
                                <th>Charges</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Tickertape</td>
                                <td>Monthly / Annual</td>
                                <td>Free: 0 | Pro: 249/2399</td>
                            </tr>

                            <tr>
                                <td>Smallcase</td>
                                <td>Per transaction</td>
                                <td>Buy & Invest More: 100 | SIP: 10</td>
                            </tr>

                            <tr>
                                <td>Kite Connect</td>
                                <td>Monthly</td>
                                <td>Connect: 500 | Historical: 500</td>
                            </tr>
                        </tbody>
                        
                    </table>
                </div>
            </div>
        </section>
    );
}

export default ExplainedCharges;