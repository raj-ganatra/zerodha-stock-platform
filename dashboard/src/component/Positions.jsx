import React, { useEffect, useState } from 'react';

import "./Positions.css";
import axios from "axios";

import Menu from "./Menu.jsx";
import WatchList from './WatchList';
import Alerts from "./Alerts.jsx";

import  { positionsArr }  from "../data/data.js";
//http://localhost:5175/
//https://zerodha-stock-platform.onrender.com/

function Positions() {
    let [existPosition,setExistPosition]=useState(false);
    
    let[positionArr,setPositionArr]=useState([]);

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
            let response = await axios.get("http://localhost:3000/check-auth",{withCredentials:true});
    
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
    
    async function addPositions(position){

        let postResponse=await axios.post("http://localhost:3000/positions",position,{withCredentials:true});
        // console.log(postResponse.data);
        // setPositionArr(positionArr);
        
    }
    
    async function getArr(userId){
        if(userId){
            let getResponse=await axios.get(`http://localhost:3000/positions/${userId}`,{withCredentials:true});

        setExistPosition(getResponse.data.length>0);

        setTimeout(()=>{
            return setPositionArr(getResponse.data);
        });
        }
    }

    // console.log(positionArr);

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

    // console.log(trigger);

    async function deletePositions(data){
        let deleteResponse=await axios.put("http://localhost:3000/positions",data,{withCredentials:true});
        console.log(deleteResponse.data);
    }

    async function deleteHoldings(data){
        let deleteResponse=axios.put("http://localhost:3000/holdings",data,{withCredentials:true});
        console.log(deleteResponse.data);
    }

    async function addOrders(data){
        try{
            let placedOrder=await axios.post("http://localhost:3000/orders/place",data,{withCredentials:true});
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
        <section className='positions-section'>
            {success &&  <Alerts severity={severity} type={type} message={msg} sx={{
                                    position: "fixed",
                                    top: 0,
                                    width: "50%",
                                    zIndex: 1000,
                                    left:"25%",
                                }}
                            />
            }
            <div className='container'>
                <WatchList deletePositions={deletePositions} deleteHoldings={deleteHoldings} addOrders={addOrders} trigger={trigger} info={info} resetTrigger={resetTrigger} username={username}/>
                <div className='positions-container'>
                    <Menu username={username} email={email}/>
                    <div className='positions-info'>
                        {
                            existPosition ? null
                            : 
                            <>
                              <img src="./positions.svg" alt="position-image" className='positions-image'/>

                              <p className='positions-paragraph'>You don't have any positions yet</p>

                              <button className='positions-button'>Get Started</button>
                            </>
                        }
                        
                        {
                            existPosition ? (
                            <>
                                <h1>Positions ({positionArr.length})</h1>

                                <table>
                                    <thead>
                                        <tr>
                                            <th className='company-name' style={{width:"10%"}}>Product</th>
                                            <th className='company-name'>Instrument</th>
                                            <th className='stock-info'>Qty.</th>
                                            <th className='stock-info'>Avg. cost</th>
                                            <th className='stock-info'>LTP</th>
                                            <th className='stock-info'>P&L</th>
                                            <th className='stock-info'>Chg.</th>
                                        </tr>
                                    </thead>
                                                    
                                    <tbody>
                                        {
                                            positionArr.map((stock,index)=>{
                                                let currVal=stock.qty*stock.LTP;
                                                let profitOrLoss=currVal-(stock.qty*stock.avg);
                        
                                                let isProfit=profitOrLoss>=0.00;
                        
                                                let profitClass= isProfit ? "profit" : "loss";
                                        
                                                const dayClass = stock.change<0 ? "loss" : "profit";

                                                console.log(stock.avg);

                                                return (
                                                    <tr key={index}>
                                                        <td className='company-data' style={{width:"10%"}}>{stock.product}</td>
                                                        <td className='company-data'>{stock.companyName} &nbsp;({stock.type.toUpperCase()}) &nbsp;&nbsp;<span onClick={()=>{
                                                            return handleOnClick(stock,index);
                                                        }}><a>S</a></span></td>
                                                        <td className='data-info'>{stock.qty}</td>
                                                        <td className='data-info'>&#8377; {stock.avg.toFixed(2)}</td>
                                                        <td className='data-info'>&#8377; {stock.LTP.toFixed(2)}</td>
                                                        <td className={`data-info ${profitClass}`}>&#8377; {profitOrLoss.toFixed(2)}</td>
                                                        <td className={`data-info ${dayClass}`}>{stock.change.toFixed(2)}%</td>
                                                    </tr>
                                                );
                                            })
                                        }
                                        {/* <tr>
                                            <td className='company-data'>BHARTIARTL</td>
                                            <td className='data-info'>2</td>
                                            <td className='data-info'>538.05</td>
                                            <td className='data-info'>541.15</td>
                                            <td className='data-info'>6.20</td>
                                        </tr> */}
                                    </tbody>
                                </table>
                            </>
                            )
                             : null
                        }
                    </div>
                </div>
            </div>
        </section>
     );
}

export default Positions;