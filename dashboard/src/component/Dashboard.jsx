import React from 'react';
import WatchList from './WatchList';
import Menu from "./Menu.jsx";

import { useEffect } from 'react';
import axios from "axios";

import "./Dashboard.css";
import { useState } from 'react';
import Alerts from "./Alerts.jsx";

function Dashboard() {
    let [username,setUsername]=useState();
    let [email,setEmail]=useState();

    let [success,setSuccess]=useState(false);
    let [msg,setMsg]=useState();
    let [severity,setSeverity]=useState();
    let [type,setType]=useState();

    useEffect(()=>{
        async function check(){
            let response = await axios.get("https://zerodha-stock-platform.onrender.com/check-auth",{withCredentials:true});
            console.log(response.data);
            if(response.data==="notLoggedIn"){
                window.location.href = "/?message=You are not LoggedIn!&severity=info&type=Info";
                return;
            }

            setUsername(()=>{
                return response.data.info.username;
            });

            setTimeout(()=>{
                setEmail(()=>{
                    return response.data.info.username;
                })
            },1);

            setTimeout(()=>{
                setMsg(()=>{
                    return "Welcome to Zerodha Kite!";
                })
            },1);

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
        <section className='dashboard-section'>
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
            <WatchList username={username} addOrders={addOrders}/>
            <div className='dashboard-container'>
                <Menu username={username} email={email}/>
                <div className='dashboard-info'>
                    <h1 className='upper-h1'>Hi, Raj</h1>
                    <hr></hr>
                    <div className='dashboard-stats'>
                        <div className='dashboard-equity'>
                            <div className='margin-value'>
                                <h2><i className="fa-solid fa-chart-pie"></i> &nbsp;Equity</h2>
                                <h1 className='lower-h1'>0</h1>
                                <p>Margin available</p>
                            </div>

                            <div className='margin-info'>
                                <p>Margin used &nbsp;</p>0
                                <br></br>
                                <p>Opening Balance &nbsp;</p>0
                                <br></br>
                                <a><i className="fa-solid fa-circle-notch"></i> View Statement</a>
                            </div>
                        </div>
                        <div className='dashboard-equity'>
                            <div className='margin-value'>
                                <h2><i className="fa-solid fa-droplet"></i> &nbsp;Commodity</h2>
                                <h1 className='lower-h1'>0</h1>
                                <p>Margin available</p>
                            </div>

                            <div className='margin-info'>
                                <p>Margin used &nbsp;</p>0
                                <br></br>
                                <p>Opening Balance &nbsp;</p>0
                                <br></br>
                                <a><i className="fa-solid fa-circle-notch"></i> View Statement</a>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    {/* <hr></hr> */}
                </div>
            </div>
          </div>
        </section>
    );
}

export default Dashboard;