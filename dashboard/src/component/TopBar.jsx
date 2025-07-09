import React from 'react';

import "./TopBar.css";

function TopBar() {
    return ( 
        <div className='topbar-container'>
            <div className='nifty'>
                <p className='logo'>NIFTY 50</p>
                <p className='price'>24718.60</p>
                <p className='up-down'>-169.60 (-0.68%)</p>
            </div>
            <div className='sensex'>
                <p className='logo'>SENSEX</p>
                <p className='price'>81118.60</p>
                <p className='up-down'>-573.38 (-0.70%)</p>
            </div>
        </div>
    );
}

export default TopBar;