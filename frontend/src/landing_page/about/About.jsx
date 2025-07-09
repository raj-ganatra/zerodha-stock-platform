import React from 'react';

import Navbar from '../Navbar.jsx';
import Hero from './Hero';
import Team from './Team';
import Footer from '../Footer.jsx';

import axios from "axios";
import { useEffect } from 'react';

function About() {
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
          <Team/>
          <Footer/>
        </>
    );
}

export default About;