import React from 'react';
import "./Login.css";
import {useNavigate,useLocation} from "react-router-dom";
import { useState } from "react";

import axios from "axios";
import Input from "./Input.jsx";
import { useEffect } from 'react';
import Alerts from "./Alerts.jsx";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const [msg, setMsg] = useState();
    const [severity,setSeverity]=useState();
    const [type,setType]=useState();

    useEffect(()=>{
        const params = new URLSearchParams(window.location.search);
        const message = params.get("message");
        const severity=params.get("severity");
        const type=params.get("type");

        if(message && severity && type){
            setMsg(()=>{
                return message;
            })

            setSeverity(()=>{
                return severity;
            })

            setType(()=>{
                return type;
            })
        }

        setTimeout(()=>{
            setMsg();
        },3000);
    },[]);

    let [usernameVal, setUsernameVal]=useState("");
    let [passwordVal, setPasswordVal]=useState("");

    function handleUsernameChange(e){
        setUsernameVal(()=>{
            return e.target.value;
        });
    }

    function handlePasswordChange(e){
        setPasswordVal(()=>{
            return e.target.value;
        })
    }

    async function handleForm(e){
        e.preventDefault();

        let formData={
            username:usernameVal,
            password:passwordVal,
        }

        try{
            let response=await axios.post("http://localhost:3000/login",formData,{withCredentials:true});;
            console.log(response.data);

            if(response.data==="login-successfully!"){
                navigate("/dashboard");
            }
        }catch(err){
            console.log(err);
            window.location.href = "/?message=Some Error has been Detected!&severity=error&type=Error";
        }
    }

    return ( 
        <section className='login-section'>
            {msg && severity && type && <Alerts severity={severity} type={type} message={msg} sx={{
                            position: "fixed",
                            top: 0,
                            width: "50%",
                            zIndex: 1000,
                            left:"25%",
                        }}
                    />
            }
            <div className='login-container'>
                <div className='login-upper-box'>
                    <div className='login-box'>
                        <img src="./kite-logo.svg" alt="kite-logo"/>
                        <h1>Login to Kite</h1>
                        <form onSubmit={handleForm}>
                            <Input name="username" label="Phone or User ID" type="text" width={"80%"} onChange={handleUsernameChange} val={usernameVal}/>
                            <Input name="password" label="Password" type="password" width={"80%"} onChange={handlePasswordChange} val={passwordVal}/>
                            <button>Login</button>
                        </form>
                        <br></br>
                        <a href="http://localhost:5173/signup">Don't have an account? Signup now!</a>
                    </div>
                </div>
            </div>
        </section>
     );
}

export default Login;