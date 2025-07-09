import React from 'react';
import { useEffect } from 'react';
import axios from "axios";

function App() {
    let URL="http://localhost:3000/";

    useEffect(()=>{
        async function connect(){
            let response=await axios.get(URL);

            // console.log(response.data);
        }

        connect();
    },[])
}

export default App;