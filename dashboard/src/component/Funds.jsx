import React from 'react';

import "./Funds.css";
import WatchList from './WatchList';
import Menu from "./Menu.jsx";

import axios from "axios";
import { useEffect } from 'react';
import Alerts from "./Alerts.jsx";

import { useState } from 'react';

function Funds() {
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
        }
        check();
    },[]);

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
        <section className='funds-section'>
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
                <WatchList addOrders={addOrders} username={username}/>
                <div className='funds-container'>
                    <Menu username={username} email={email}/>
                    <div className='funds-info'>
                        <div className='upper-info'>
                            <p>Instant, zero-cost fund transfers with <img src="./UPI.svg" alt="upi-image"/></p>
                            <button className='button-first'>Add Funds</button>
                            <button className='button-last'>Withdraw</button>
                        </div>
                        <div className='lower-info'>
                            <div className='equity'>
                                <div className='equity-link'>
                                    <h2 style={{marginRight:"100px"}}><i className="fa-solid fa-chart-pie"></i> &nbsp;Equity</h2>
                                    <a className='link-1'><i className="fa-solid fa-circle-notch"></i> &nbsp;View Statement</a>
                                    <a className='link-2'><i className="fa-solid fa-circle-info"></i> &nbsp;Help</a>
                                </div>
                                <div className='equity-info'>
                                    <div className='equity-info-upper'>
                                        <div>
                                            <p>Available Margin</p><span>0.00</span>
                                        </div>
                                        
                                        <div>
                                            <p>Used Margin</p><span>0.00</span>
                                        </div>
                                        
                                        <div style={{borderBottom:"2px solid #eee"}}>
                                            <p>Available Cash</p><span>0.00</span>
                                        </div>
                                    </div>

                                    {/* <hr></hr> */}

                                    <div className='equity-info-lower'>
                                        <div>
                                            <p>Opening balance</p><span>0.00</span>
                                        </div>

                                        <div>
                                            <p>Payin</p><span>0.00</span>
                                        </div>

                                        <div>
                                            <p>Payout</p><span>0.00</span>
                                        </div>

                                        <div>
                                            <p>SPAN</p><span>0.00</span>
                                        </div>

                                        <div>
                                            <p>Delivery margin</p><span>0.00</span>
                                        </div>

                                        <div>
                                            <p>Exposure</p><span>0.00</span>
                                        </div>

                                        <div>
                                            <p>Options premium</p><span>0.00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='equity'>
                                <div className='equity-link'>
                                    <h2><i className="fa-solid fa-droplet"></i> &nbsp;Commodity</h2>
                                    <a className='link-1'><i className="fa-solid fa-circle-notch"></i> &nbsp;View Statement</a>
                                    <a className='link-2'><i className="fa-solid fa-circle-info"></i> &nbsp;Help</a>
                                </div>
                                <div className='equity-info'>
                                    <div className='equity-info-upper'>
                                        <div>
                                            <p>Available Margin</p><span>0.00</span>
                                        </div>
                                        
                                        <div>
                                            <p>Used Margin</p><span>0.00</span>
                                        </div>
                                        
                                        <div style={{borderBottom:"2px solid #eee"}}>
                                            <p>Available Cash</p><span>0.00</span>
                                        </div>
                                    </div>

                                    {/* <hr></hr> */}

                                    <div className='equity-info-lower'>
                                        <div>
                                            <p>Opening balance</p><span>0.00</span>
                                        </div>

                                        <div>
                                            <p>Payin</p><span>0.00</span>
                                        </div>

                                        <div>
                                            <p>Payout</p><span>0.00</span>
                                        </div>

                                        <div>
                                            <p>SPAN</p><span>0.00</span>
                                        </div>

                                        <div>
                                            <p>Delivery margin</p><span>0.00</span>
                                        </div>

                                        <div>
                                            <p>Exposure</p><span>0.00</span>
                                        </div>

                                        <div>
                                            <p>Options premium</p><span>0.00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Funds;