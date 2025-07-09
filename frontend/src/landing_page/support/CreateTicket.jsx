import React from 'react';
import "./CreateTicket.css";

function CreateTicket() {
    return (
        <section className='support-createticket-section'>
            <div className='container'>
                <div className='upper-text'><h1>To create a ticket, select a relevant topic</h1></div>
                <div className='links'>
                    <div className='upper-links'>
                        <div className="upper-link-div div-1">
                            <h2><i className="fa-solid fa-circle-plus"></i> &nbsp;Account Opening</h2>

                            <a href="#">Resident individual</a>
                            <a href="#">Minor</a>
                            <a href="#">Non Resident Indian (NRI)</a>
                            <a href="#">Company, Partnership, HUF and LLP</a>
                            <a href="#">Glossary</a>
                        </div>

                        <div className="upper-link-div div-2">
                            <h2><i className="fa-regular fa-user"></i> &nbsp;Your Zerodha Account</h2>

                            <a href="#">Your Profile</a>
                            <a href="#">Account modification</a>
                            <a href="#">Client Master Report (CMR) and Depository Participant (DP)</a>
                            <a href="#">Nomination</a>
                            <a href="#">Transfer and conversion of securities</a>
                        </div>

                        <div className="upper-link-div div-3">
                            <h2><i className="fa-solid fa-money-bill-trend-up"></i> &nbsp;Kite</h2>

                            <a href="#">IPO</a>
                            <a href="#">Trading FAQs</a>
                            <a href="#">Margin Trading Facility (MTF) and Margins</a>
                            <a href="#">Charts and orders</a>
                            <a href="#">Alerts and Nudges</a>
                            <a href="#">General</a>
                        </div>
                    </div>
                    <div className='lower-links'>
                        <div className="lower-link-div div-1">
                            <h2><i className="fa-solid fa-box-archive"></i> &nbsp;Funds</h2>

                            <a href="#">Add money</a>
                            <a href="#">Withdraw money</a>
                            <a href="#">Add bank accounts</a>
                            <a href="#">eMandates</a>
                        </div>

                        <div className="lower-link-div div-2">
                            <h2><i className="fa-solid fa-spinner"></i> &nbsp;Console</h2>

                            <a href="#">Portfolio</a>
                            <a href="#">Corporate actions</a>
                            <a href="#">Funds statment</a>
                            <a href="#">Reports</a>
                            <a href="#">Profile</a>
                            <a href="#">Segments</a>
                        </div>

                        <div className="lower-link-div div-3">
                            <h2><i className="fa-solid fa-circle-notch"></i> &nbsp;Coin</h2>

                            <a href="#">Mutual funds</a>
                            <a href="#">National Pension Scheme (NPS)</a>
                            <a href="#">Features on Coin</a>
                            <a href="#">Payments and Orders</a>
                            <a href="#">General</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CreateTicket;