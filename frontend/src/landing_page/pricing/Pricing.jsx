import React from 'react';

import Navbar from '../Navbar';
import Hero from './Hero';
import ExplainedCharges from './ExplainedCharges.jsx';
import Footer from '../Footer';

import axios from "axios";
import { useEffect } from 'react';

function Pricing() {
    // useEffect(()=>{
    //     async function check(){
    //         let response = await axios.get("http://localhost:3000/check-auth",{withCredentials:true});
        
    //         if(response.data==="notLoggedIn"){
    //             window.location.href = "/";
    //         }
    //     }
    //     check();
    // },[]);
    return ( 
        <>
          <Navbar/>
          <Hero/>
          <ExplainedCharges/>
          <Footer/>
        </>
    );
}

export default Pricing;