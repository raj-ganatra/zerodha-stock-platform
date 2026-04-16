import React, { useEffect } from 'react';
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';

import "./BuyWindow.css";
import Input from "./Input.jsx";
import Toggle from './Toggle.jsx';

function BuyWindow({funcBuy, funcSell, companyInfo, addOrders,username}) {
    // console.log(addHoldings+" "+addPositions);
    // console.log(companyInfo.price);
    let [priceVal,setPriceVal]=useState(Number(companyInfo.price).toFixed(2));

    let [qtyVal,setQtyVal]=useState(companyInfo.qty);

    // console.log(addOrders);
    
    // console.log(priceVal+" "+companyInfo.price);

    const navigate=useNavigate();

    function handleValChange(e){
        // console.log(Number(e.target.value).toFixed(2));
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
            type:"buy",
            product:isChecked ? "MIS" : "CNC",
        }
        // console.log(formData.product);

        //https://zerodha-stock-platform.onrender.com/buying
        let response=await axios.post("http://localhost:3000/buying",formData);
        if(response.data==="not logged in"){
            navigate("/");
        }
        
        addOrders(formData);
        
        funcBuy(companyInfo.id);
    }

    return (
        <div className='buywindow-container'>
            <form onSubmit={handleSubmit}>
                <div className='upper-div'>
                    <div className='heading-div'>
                        <h1>{companyInfo.name}</h1>
                        <Toggle funcSell={funcSell} funcBuy={funcBuy} initailVal={false} id={companyInfo.id}/>
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

                        <input type="checkbox" name="agree" className='checkbox' defaultChecked/>
                        <label className='checkbox-label'>Intraday</label>
                    </div>
                </div>

                <div className='lower-div'>
                    <button className="buy">Buy</button>
                    <button className="cancel" onClick={()=>{
                        return funcBuy(companyInfo.id);
                    }}>Cancel</button>
                </div>
            </form>
        </div>
    );
}
export default BuyWindow;