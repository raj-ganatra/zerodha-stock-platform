import React from 'react';
import { useEffect } from 'react';
import axios from "axios";

function App() {
    let URL="http://localhost:3000/";
    // let URL="https://zerodha-stock-platform.onrender.com";

    useEffect(()=>{
        async function connect(){
            let response=await axios.get(URL);

            // console.log(response.data);
        }

        connect();
    },[])
}

export default App;