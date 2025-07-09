import React from 'react';
import axios from "axios";

import { useState } from 'react';
import "./SellWindow.css";
import Input from "./Input.jsx";
import Toggle from './Toggle.jsx';

function SellWindow({funcSell, funcBuy, companyInfo, addOrders, deletePositions, deleteHoldings,username}) {
    let [priceVal,setPriceVal]=useState(Number(companyInfo.price).toFixed(2));

    let [qtyVal,setQtyVal]=useState(companyInfo.qty);

    // console.log(deletePositions+"  "+deleteHoldings);
    
    function handleValChange(e){
        console.log(Number(e.target.value).toFixed(2));
        setPriceVal(()=>{
            return Number(e.target.value).toFixed(2);
        })
    }
    
    function handleQtyChange(e){
        setQtyVal(()=>{
            return e.target.value;
        });
    }

    async function handleSubmit(e){
        e.preventDefault();

        const isChecked = e.target.elements.agree.checked;

        let formData={
            qty:qtyVal,
            price:priceVal,
            companyName:companyInfo.name,
            date:Date.now(),
            isChecked:isChecked,
            userId:username,
            type:"sell",
            product:isChecked ? "MIS" : "CNC",
        }

        // console.log(e.target);

        let response=await axios.post("https://zerodha-stock-platform.onrender.com/selling",formData);
        // console.log(response.data);

        addOrders(formData);

        funcSell(companyInfo.id);
    }

    return ( 
            <div className='sellwindow-container'>
                <form onSubmit={handleSubmit}>
                    <div className='upper-div'>
                        <div className='heading-div'>
                        <h1>{companyInfo.name}</h1>
                            <Toggle funcSell={funcSell} funcBuy={funcBuy} initailVal={true} id={companyInfo.id}/>
                        </div>
                        <p className='BSE'><i className="fa-solid fa-circle-dot"></i> &nbsp;BSE Rs.1,632.20</p>
                        <p className='NSE'><i className="fa-solid fa-circle"></i> &nbsp;NSE Rs.1,632.50</p>
                    </div>
        
                    <div className='middle-div'>
                        <div className='options'>
                            <div><a>Quick</a></div>
                            <div style={{border:"none"}}><a style={{color:"#9b9b9b"}}>Regular</a></div>
                            <div style={{border:"none"}}><a style={{color:"#9b9b9b"}}>MTF</a></div>
                        </div>
        
                        <div className='input'>
                            <Input label="Qty" type="number" onChange={handleQtyChange} val={qtyVal} shrink={{ shrink: true }} width={"92%"}/>
                            <Input label="Price" type="number" step="0.01" onChange={handleValChange} val={priceVal} shrink={{ shrink: true }} width={"92%"}/>
        
                            <input type="checkbox" className='checkbox' name="agree" defaultChecked/>
                            <label className='checkbox-label'>Intraday</label>
                        </div>
                    </div>
        
                    <div className='lower-div'>
                        <button className="sell">Sell</button>
                        <button className="cancel" onClick={()=>{
                            return funcSell(companyInfo.id);
                        }}>Cancel</button>
                    </div>
                </form>
            </div>
     );
}

export default SellWindow;