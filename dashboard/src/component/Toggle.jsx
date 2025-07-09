import React from 'react';

import { useState } from 'react';

import "./Toggle.css";

function Toggle({funcSell,funcBuy, initailVal,id}) {
    let [check, setCheck]=useState(initailVal);

    function handleToggle(e){
        let isChecked=e.target.checked;

        if(isChecked){
            funcSell(id);
        }else{
            funcBuy(id);
        }
    }

    return ( 
        <div className='toggle-container'>
            <label className="switch">
                <input type="checkbox" onChange={handleToggle} checked={check}/>
                <span className="slider round"></span>
            </label> 
        </div>
     );
}

export default Toggle;