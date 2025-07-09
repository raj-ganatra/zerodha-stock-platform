import React from 'react';
import { useState } from 'react';
import axios from "axios";
import { NavLink } from 'react-router-dom';

import "./Menu.css";

function Menu({username,email}) {

    let [clas,setClas]=useState(false);
    let [message,setMessage]=useState();

    function handleOnClick(){
        setClas((prev)=>{
            return !prev;
        });
    }

    async function handleLogout(){
        try{
            let response=await axios.get("http://localhost:3000/logout",{withCredentials:true});
            if(response.data==="logout"){
                console.log("logout");
                return window.location.href = "/?message=LoggedOut Successfully!&severity=success&type=Success";
            }
        }catch(err){
            setMessage(()=>{
                return "Some Error Occured!";
            })
        }
    }

    return ( 
        <div className='menu-div'>
            {message &&  <Alerts severity="warning" type="Warning" message="Error Occured, Try Again!" sx={{
                                    position: "fixed",
                                    top: 0,
                                    width: "50%",
                                    zIndex: 1000,
                                    left:"25%",
                                }}
                            />
            }
            <div className='menu-image'>
                <img src="./kite-logo.svg" alt="kite-logo"/>
            </div>
            <div className='menu-links'>

                <NavLink to="/dashboard" className={({isActive})=>{
                    return isActive ? "color" : null;
                }}>Dashboard</NavLink>

                <NavLink to="/orders" className={({isActive})=>{
                    return isActive ? "color" : null;
                }}>Orders</NavLink>

                <NavLink to="/holdings" className={({isActive})=>{
                    return isActive ? "color" : null;
                }}>Holdings</NavLink>

                <NavLink to="/positions" className={({isActive})=>{
                    return isActive ? "color" : null;
                }}>Positions</NavLink>

                <NavLink to="/bids" className={({isActive})=>{
                    return isActive ? "color" : null;
                }}>Bids</NavLink>

                <NavLink to="/funds" className={({isActive})=>{
                    return isActive ? "color" : null;
                }}>Funds</NavLink>

            </div>
            <div className='menu-icons'>
                <a><i className="fa-solid fa-cart-shopping"></i></a>
                <a><i className="fa-solid fa-bell"></i></a>
                <span onClick={handleOnClick}>More</span>
            </div>
            <div className={`logout-div ${clas ? "logout-div-click" : ""}`}>
                <h1>Username: {username}</h1>
                <p>Email: {email}</p>
                <br></br>
                <button onClick={handleLogout}><i className="fa-solid fa-arrow-right-from-bracket"></i> &nbsp;LogOut</button>
            </div>
        </div>
    );
}

export default Menu;