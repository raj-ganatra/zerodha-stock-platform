import React from 'react';

import Navbar from '../Navbar.jsx';
import Hero from './Hero.jsx'
import Stats from './Stats';
import Pricing from './Pricing';
import Education from './Education';
import OpenAccount from '../OpenAccount.jsx';
import Footer from '../Footer.jsx';

import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';
import Alerts from "../Alerts.jsx";

function HomePage() {
    const [success,setSuccess]=useState(false);
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

            setSuccess(()=>{
              return true;
            });

            setTimeout(()=>{
                setSuccess(()=>{
                  return false;
                })
            },3000);
        }
    },[]);

    return ( 
        <>
          {success && severity && type && <Alerts severity={severity} type={type} message={msg} sx={{
                          position: "fixed",
                          top: 0,
                          width: "50%",
                          zIndex: 1000,
                          left:"25%",
                      }}
                  />
          }
          <Navbar/>
          <Hero/>
          <Stats/>
          <Pricing/>
          <Education/>
          <OpenAccount/>
          <Footer/>
        </>
    );
}

export default HomePage;