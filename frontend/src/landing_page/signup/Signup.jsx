import React from 'react';
import {useNavigate} from "react-router-dom";
import { useState } from 'react';
import axios from "axios";

import "./Signup.css";

import Navbar from "../Navbar.jsx";
import Footer from "../Footer.jsx";

import Input from "../Input.jsx";
import Alerts from "../Alerts.jsx";

function Signup() {
    const navigate=useNavigate();

    let [emailVal,setEmailVal]=useState("");
    let [usernameVal, setUsernameVal]=useState("");
    let [passwordVal, setPasswordVal]=useState("");

    let [success,setSuccess]=useState(false);
    let [msg,setMsg]=useState();
    let [severity,setSeverity]=useState();
    let [type,setType]=useState();

    function handleEmailChange(e){
        setEmailVal(()=>{
            return e.target.value;
        })
        // console.log(emailVal);
    }

    function handleUsernameChange(e){
        setUsernameVal(()=>{
            return e.target.value;
        })
    }

    function handlePasswordChange(e){
        setPasswordVal(()=>{
            return e.target.value;
        })
    }

    async function handleSignupForm(e){
        try{
            e.preventDefault();

            let formData={
                username:usernameVal,
                email:emailVal,
                password:passwordVal,
            }

            let response=await axios.post("http://localhost:3000/signup",formData,{ withCredentials: true });
            console.log(response.data);

            window.location.href = "/?message=You have been signuped Successfully!&severity=success&type=Success";
        }catch(err){
            setMsg(()=>{
                return "Some Error Occured Please try again!";
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
        <>
          <Navbar/>
          <section className='signup-section'>
            {success &&  <Alerts severity={severity} type={type} message={msg} sx={{
                                    position: "fixed",
                                    top: 0,
                                    width: "50%",
                                    zIndex: 1000,
                                    left:"25%",
                                }}
                            />
            }
            <div className='signup-container'>
                <h1>Open a free demat and trading account online</h1>
                <h3>Start investing brokerage free and join a community of 1.6+ crore investors and traders</h3>
                <div className='signup-upper-div'>
                    <div className='image-div'>
                        <img src="media/images/account_open.svg" alt="signup-img"/>
                    </div>
                    <div className='signup-div'>
                        <h1 style={{marginLeft:"-110px"}}>Signup now</h1>
                        <form onSubmit={handleSignupForm}>
                            <Input label="Email" width="85%" type="text" onChange={handleEmailChange} val={emailVal}/>
                            <Input label="Username" width="85%" type="text" onChange={handleUsernameChange} val={usernameVal}/>
                            <Input label="Password" width="85%" type="password" onChange={handlePasswordChange} val={passwordVal}/>

                            <button style={{marginLeft:"-30px"}}>Signup</button>
                        </form>
                    </div>
                </div>
            </div>
          </section>
          <Footer/>
        </>
     );
}

export default Signup;