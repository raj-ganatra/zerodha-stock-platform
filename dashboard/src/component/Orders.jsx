import React from 'react';
import axios from "axios";
import { useState , useEffect, useRef} from 'react';

import "./Orders.css";

import Menu from "./Menu.jsx";
import WatchList from './WatchList';
import Alerts from "./Alerts.jsx";

function Orders() {

    let [existOrder,setExistOrder]=useState(false);
            
    let[orderArr,setOrderArr]=useState([]);

    let [username,setUsername]=useState();
    let [email,setEmail]=useState();

    let [success,setSuccess]=useState(false);
    let [msg,setMsg]=useState();
    let [severity,setSeverity]=useState();
    let [type,setType]=useState();

    //http://localhost:5175/
    //https://zerodha-stock-platform.onrender.com/
    useEffect(()=>{
        async function check(){
            let response = await axios.get("http://localhost:3000/check-auth",{withCredentials:true});
            // console.log(response.data);
            if(response.data==="notLoggedIn"){
                window.location.href = "/";
            }

            // console.log(response.data.info.username);

            setUsername(()=>{
                return response.data.info.username;
            });

            setTimeout(()=>{
                setEmail(()=>{
                    return response.data.info.username;
                })
            },1);

            getOrders(response.data.info.username);
        }
        check();
    },[]);

    async function addPositions(position){
        try{
            let updatedPosition={
                ...position,
                avg:Number(position.avg),
            }
            let postResponse=await axios.post("http://localhost:3000/positions",updatedPosition,{withCredentials:true});
            setMsg(()=>{
                return "Added to Positions SuccessFully!";
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
                return "Some Error Occured while placing to Positions!";
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

    async function addHoldings(holding){
        try{
            let postResponse=await axios.post("http://localhost:3000/holdings",holding,{withCredentials:true});
            console.log(postResponse.data);

            setMsg(()=>{
                return "Added to Holdings SuccessFully!";
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
                return "Some Error Occured while placing to Holdings!";
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

    async function addOrders(data){
        try{
            let placedOrder=await axios.post("http://localhost:3000/orders/place",data,{withCredentials:true});
            console.log(placedOrder.data);
            console.log("order recived!");

            setTimeout(()=>{
                return getOrders(data.userId);
            },1000);

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

    async function getOrders(userId){
        let orders=await axios.get(`http://localhost:3000/orders/${userId}`,{withCredentials:true});
        

        setExistOrder(orders.data.length>0);

        setTimeout(()=>{
            return setOrderArr(orders.data);
        },1);

        for(let order of orders.data){
            console.log(order.isProcessed);
            console.log(order.userId);
            if(order.isProcessed==false){
                console.log("bye");
                if(order.status==="filled" && order.isChecked===true){
                    console.log("Hello");
                    await axios.put(`http://localhost:3000/orders/${order.userId}`,{companyName:order.companyName},{withCredentials:true});
                    console.log("hi");
                    addPositions({
                        ...order,
                        avg:order.price/order.qty,
                        isProcessed:true,
                    });
                }else if(order.status==="filled" && order.isChecked===false){
                    await axios.put(`http://localhost:3000/orders/${order.userId}`,{companyName:order.companyName},{withCredentials:true});
                    addHoldings({
                        ...order,
                        avg:order.price/order.qty,
                        isProcessed:true,
                    });
                }
            }
        }
    }

    return ( 
        <section className='orders-section'>
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
                <div className="orders-container">
                    <Menu username={username} email={email}/>
                    <div className={`orders-info ${existOrder ? null :"orders-info-none"}`}>
                    {/* <div className="orders-info"> */}
                        {
                            existOrder
                            ? null
                            : 
                            <>
                              <img src="./orderbook.svg" alt="order-image" className='orders-image'/>

                              <p className='orders-paragraph'>You haven't placed any orders today</p>

                              <button className='orders-button'>Get Started</button>
                            </>
                        }

                        {
                            existOrder
                            ?
                            <>
                                <h1>Orders ({orderArr.length})</h1>

                                <table>
                                    <thead>
                                        <tr>
                                            <th className='stock-info' style={{textAlign: "start", paddingLeft:"10px"}}>Time</th>
                                            <th className='stock-info' style={{textAlign: "start", paddingLeft:"10px"}}>Type</th>
                                            <th className='stock-info' style={{textAlign: "start", paddingLeft:"10px"}}>Instrument</th>
                                            <th className='stock-info' style={{textAlign: "start", paddingLeft:"10px"}}>Product</th>
                                            <th className='stock-info'>Qty.</th>
                                            <th className='stock-info'>LTP</th>
                                            <th className='stock-info'>Price</th>
                                            <th className='status-info'>Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            orderArr.map((stock,index)=>{
                                                return (
                                                    <tr key={index}>
                                                        <td className='time-info'>{stock.date.slice(11,19)}</td>
                                                        <td className='data-info' style={{textAlign:"start", paddingLeft:"10px"}}>{stock.type==="buy" ? <span className="type-span-buy">{stock.type.toUpperCase()}</span> : <span className="type-span-sell">{stock.type.toUpperCase()}</span>}</td>
                                                        <td className='data-info' style={{textAlign:"start", paddingLeft:"10px"}}>{stock.companyName}</td>
                                                        <td className='data-info' style={{textAlign:"start", paddingLeft:"10px"}}>{stock.product}</td>
                                                        <td className='data-info'>{stock.newQty}/{stock.qty}</td>
                                                        <td className='data-info'>&#8377; 3447.7</td>
                                                        <td className='data-info'>&#8377; {stock.price.toFixed(2)}</td>
                                                        <td className='data-info' style={{width:"16%"}}>
                                                            {stock.status==="unfilled"
                                                               ? <span className='status-span-unfilled'>{stock.status.toUpperCase()}</span>
                                                               : stock.status==="partial"
                                                                 ? <span className='status-span-partial'>{stock.status.toUpperCase()}</span>
                                                                 : <span className='status-span-filled'>{stock.status.toUpperCase()}</span>
                                                            }</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </>
                            : null
                        }

                    </div>
                </div>
            </div>
        </section>
     );
}

export default Orders;