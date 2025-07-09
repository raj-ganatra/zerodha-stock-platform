import React from 'react';

import Navbar from '../Navbar';
import Hero from './Hero';
import CreateTicket from './CreateTicket';
import Footer from '../Footer';

import axios from "axios";
import { useEffect } from 'react';

function Support() {
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
          <CreateTicket/>
          <Footer/>
        </>
    );
}

export default Support;