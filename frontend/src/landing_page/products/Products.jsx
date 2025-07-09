import React from 'react';

import Navbar from '../Navbar.jsx';
import Hero from './Hero.jsx';
import LeftSection from './LeftSection.jsx'
import RightSection from './RightSection';
import Universe from './Universe';
import Footer from '../Footer.jsx';

import axios from "axios";
import { useEffect } from 'react';

function Product() {
    // useEffect(()=>{
    //     async function check(){
    //         let response = await axios.get("http://localhost:3000/check-auth",{withCredentials:true});
        
    //         if(response.data==="notLoggedIn"){
    //             window.location.href = "/";
    //         }
    //     }
    //     check();
    // },[]);

    let leftSectionObj1={
      image:"media/images/kite.png",
      title:"Kite",
      paragraph:"Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices.",
      firstLink:"Try Demo",
      secondLink:"Learn more",
      alt:"kite-image",
    }

    let leftSectionObj2={
      image:"media/images/coin.png",
      title:"Coin",
      paragraph:"Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices.",
      firstLink:"Coin",
      alt:"coin-image",
    }

    let leftSectionObj3={
      image:"media/images/varsity.png",
      title:"Varsity mobile",
      paragraph:"An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go.",
      alt:"varsity-image",
    }

    let rightSectionObj1={
      image:"media/images/console.png",
      title:"Console",
      paragraph:"The central dashboard for your Zerodha account.Gain insights into your trades and investments with in-depth reports and visualisations.",
      firstLink:"Learn more",
      alt:"console-image",
    }

    let rightSectionObj2={
      image:"media/images/kiteapi.svg",
      title:"Kite Connect API",
      paragraph:"Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase.",
      firstLink:"Kite Connect",
      alt:"kite-connect-api-image",
    }

    return ( 
        <>
          <Navbar/>
          <Hero/>

          <LeftSection 
            image={leftSectionObj1.image}
            title={leftSectionObj1.title}
            paragraph={leftSectionObj1.paragraph}
            firstLink={leftSectionObj1.firstLink}
            secondLink={leftSectionObj1.secondLink}
            alt={leftSectionObj1.alt}
          />
          <RightSection
            image={rightSectionObj1.image}
            title={rightSectionObj1.title}
            paragraph={rightSectionObj1.paragraph}
            firstLink={rightSectionObj1.firstLink}
            alt={rightSectionObj1.alt}
          />


          <LeftSection
            image={leftSectionObj2.image}
            title={leftSectionObj2.title}
            paragraph={leftSectionObj2.paragraph}
            firstLink={leftSectionObj2.firstLink}
            secondLink={leftSectionObj2.secondLink}
            alt={leftSectionObj2.alt} 
          />
          <RightSection
            image={rightSectionObj2.image}
            title={rightSectionObj2.title}
            paragraph={rightSectionObj2.paragraph}
            firstLink={rightSectionObj2.firstLink}
            alt={rightSectionObj2.alt}
          />


          <LeftSection
            image={leftSectionObj3.image}
            title={leftSectionObj3.title}
            paragraph={leftSectionObj3.paragraph}
            alt={leftSectionObj3.alt}
          />
          
          <Universe/>
          <Footer/>
        </>
    );
}

export default Product;