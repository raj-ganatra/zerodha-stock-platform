import React from 'react';
import { useState,useEffect } from 'react';

import axios from "axios";
import "./Holdings.css";

import Menu from './Menu';
import WatchList from './WatchList';
import Alerts from "./Alerts.jsx";

import  {holdingsArr}  from "../data/data.js";

function Holdings() {
    let [existHolding,setExistHolding]=useState(false);
        
    let[holdingArr,setHoldingArr]=useState([]);

    let [trigger, setTrigger]=useState(false);
    
    let [info,setInfo]=useState({});

    let [username,setUsername]=useState();
    let [email,setEmail]=useState();

    let [success,setSuccess]=useState(false);
    let [msg,setMsg]=useState();
    let [severity,setSeverity]=useState();
    let [type,setType]=useState();

    useEffect(()=>{
        async function check(){
            let response = await axios.get("https://zerodha-stock-platform.onrender.com/check-auth",{withCredentials:true});
    
            if(response.data==="notLoggedIn"){
                window.location.href = "/";
            }

            console.log(response.data.info.username);
            
            setUsername(()=>{
                return response.data.info.username;
            });

            setTimeout(()=>{
                setEmail(()=>{
                    return response.data.info.username;
                })
            },1);

            getArr(response.data.info.username);
        }
        check();
    },[]);

    async function addHoldings(holding){
        let postResponse=await axios.post("https://zerodha-stock-platform.onrender.com/holdings",holding,{withCredentials:true});
        console.log(postResponse.data);
    }

    async function getArr(userId){
        if(userId){
            let getResponse=await axios.get(`https://zerodha-stock-platform.onrender.com/holdings/${userId}`,{withCredentials:true});
        
    
        setExistHolding(getResponse.data.length>0);
    
        setTimeout(()=>{
            return setHoldingArr(getResponse.data);
        },1);
        }
    }

    function handleOnClick(stockInfo , index){
        // console.log(stockInfo);
        // console.log(index);
        
        setInfo(stockInfo);

        setTrigger((prev)=>{
            return !prev;
        })
    }

    function resetTrigger(){
        setTrigger(false);
    }

    async function deletePositions(data){
        let deleteResponse=await axios.put("https://zerodha-stock-platform.onrender.com/positions",data,{withCredentials:true});
        console.log(deleteResponse.data);
    }

    async function deleteHoldings(data){
        let deleteResponse=await axios.put("https://zerodha-stock-platform.onrender.com/holdings",data,{withCredentials:true});
        console.log(deleteResponse.data);
    }

    async function addOrders(data){
        try{
            let placedOrder=await axios.post("https://zerodha-stock-platform.onrender.com/orders/place",data,{withCredentials:true});
            console.log(placedOrder.data);
            setMsg(()=>{
                return "Order Placed SuccessFully!";
            })

            setTimeout(()=>{
                setSeverity(()=>{
                    return "success";
                })
            })

            setTimeout(()=>{
                setType(()=>{
                    return "Success";
                })
            })

            setTimeout(()=>{
                setSuccess(()=>{
                    return true;
                })
            },1);

            setTimeout(()=>{
                setSuccess(()=>{
                    return false;
                })
            },3000);

        }catch(err){
            setMsg(()=>{
                return "Some Error Occured Order not placed!";
            })

            setTimeout(()=>{
                setSeverity(()=>{
                    return "error";
                })
            })

            setTimeout(()=>{
                setType(()=>{
                    return "Error";
                })
            })

            setTimeout(()=>{
                setSuccess(()=>{
                    return true;
                })
            },1);

            setTimeout(()=>{
                setSuccess(()=>{
                    return false;
                })
            },3000);
        }
    }

    return ( 
        <section className="holdings-section">
            {success &&  <Alerts severity={severity} type={type} message={msg} sx={{
                                    position: "fixed",
                                    top: 0,
                                    width: "50%",
                                    zIndex: 1000,
                                    left:"25%",
                                }}
                            />
            }
            <div className="container">
                <WatchList deletePositions={deletePositions} deleteHoldings={deleteHoldings} addOrders={addOrders} trigger={trigger} info={info} resetTrigger={resetTrigger} username={username}/>
                <div className='holdings-container'>
                    <Menu username={username} email={email}/>
                    <div className={`holdings-info ${existHolding ? null :"holdings-info-none"}`}>

                        {
                            existHolding ? null
                            : 
                            <>
                              <img src="./holdings.svg" alt="holding-image" className='holdings-image'/>

                              <p className='holdings-paragraph'>You dont have any stock in your DEMAT yet.Get Started
                                                                <br></br> 
                                                                with absolutely free equity investments. 
                                                                </p>

                              <button className='holdings-button'>Get Started</button>
                            </>
                        }
 

                        {
                            existHolding
                            ?(
                                <>
                                    <h1>Holdings ({holdingArr.length})</h1>

                                    <table>
                                        <thead>
                                            <tr>
                                                <th className='company-name'>Instrument</th>
                                                <th className='stock-info'>Qty.</th>
                                                <th className='stock-info'>Avg. cost</th>
                                                <th className='stock-info'>LTP</th>
                                                <th className='stock-info'>Cur. Val</th>
                                                <th className='stock-info'>P&L</th>
                                                <th className='stock-info'>Net chg.</th>
                                                <th className='stock-info'>Day chg.</th>
                                            </tr>
                                        </thead>
                            
                                        <tbody>
                                            {
                                                holdingArr.map((stock,index)=>{
                                                    let currVal=stock.qty*stock.LTP;
                                                    let profitOrLoss=currVal-(stock.qty*stock.avg);

                                                    let isProfit=profitOrLoss>=0.00;

                                                    let profitClass= isProfit ? "profit" : "loss";
                                                    // console.log(stock.isLoss);
                                                    let dayClass=stock.day<0 ? "loss" : "profit";
                                                    // let netChange=stock.LTP-539.66;
                                                    // let dayChange=(netChange/539.66)*100;

                                                    // console.log(index);
                                                    return (
                                                        <tr key={index}>
                                                            <td className='company-data'>{stock.companyName} &nbsp;({stock.type.toUpperCase()}) &nbsp;&nbsp;<span onClick={()=>{
                                                                return handleOnClick(stock,index);
                                                            }}><a>S</a></span></td>
                                                            <td className='data-info'>{stock.qty}</td>
                                                            <td className='data-info'>&#8377; {stock.avg.toFixed(2)}</td>
                                                            <td className='data-info'>&#8377; {stock.LTP.toFixed(2)}</td>
                                                            <td className='data-info'>&#8377; {currVal.toFixed(2)}</td>
                                                            <td className={`data-info ${profitClass}`}>&#8377; {profitOrLoss.toFixed(2)}</td>
                                                            <td className={`data-info ${profitClass}`}>{stock.net.toFixed(2)}%</td>
                                                            <td className={`data-info ${dayClass}`}>{stock.day.toFixed(2)}%</td>
                                                        </tr>
                                        )            ;
                                                })
                                            }
                                             {/* <tr>
                                                <td className='company-data'>BHARTIARTL</td>
                                                <td className='data-info'>2</td>
                                                <td className='data-info'>538.05</td>
                                                <td className='data-info'>541.15</td>
                                                <td className='data-info'>1082.30</td>
                                                <td className='data-info'>6.20</td>
                                                <td className='data-info' style={{color:"rgba(76, 175, 80, 1)"}}>+0.58%</td>
                                                <td className='data-info' style={{color:"rgba(223, 81, 76, 1)"}}>+2.99%</td>
                                            </tr>  */}
                                        </tbody>
                                    </table>
                                </>
                            )
                            :null
                        }

                    </div>
                </div>
            </div>
        </section>
     );
}

export default Holdings;