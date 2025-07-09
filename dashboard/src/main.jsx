import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from "./component/Dashboard.jsx";
import Funds from "./component/Funds.jsx";
import App from "./component/Apps.jsx";
import Orders from "./component/Orders.jsx";
import Holdings from "./component/Holdings.jsx";
import Positions from "./component/Positions.jsx";
import Login from "./component/Login.jsx";
import Alert from "./component/Alerts.jsx";
// import Bids from "./component/Bids.jsx";

// import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/alerts" element={<Alert/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/funds" element={<Funds/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/holdings" element={<Holdings/>}/>
        <Route path="/positions" element={<Positions/>}/>
        {/* <Route path="bids" element={<Bids/>}/> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
