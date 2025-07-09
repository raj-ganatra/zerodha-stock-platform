import React, { useEffect } from 'react';

import { useState } from 'react';
import { useRef } from 'react';

import { v4 as uuidv4 } from 'uuid';

import "./WatchList.css";
import TopBar from "./TopBar.jsx";
import NewStock from './NewStock.jsx';

import BuyWindow from './BuyWindow.jsx';
import SellWindow from './SellWindow.jsx';

function WatchList({deletePositions, deleteHoldings, addOrders, trigger, info, resetTrigger,username}) {

    let [initialBuy,setInitialBuy]=useState(false);

    let [initialSell,setInitialSell]=useState(false);

    let [companyInfo, setCompanyInfo]=useState({});

    const prevBuyIdRef = useRef(null);
    const prevSellIdRef=useRef(null);

    // console.log(`watchlist ${username}`);
    // console.log(addOrders);

    function updateInitialBuy(id){
      // console.log("Current ID:", id);
      // console.log("Previous ID:", prevBuyIdRef.current);

      if(prevBuyIdRef.current===null){
        setInitialBuy(!initialBuy);
        prevBuyIdRef.current = id;
      }else if (prevBuyIdRef.current === id) {
        setInitialBuy(!initialBuy);
        prevBuyIdRef.current = null;
      }else{
        if(initialBuy){
          setInitialBuy(()=>{
            return !initialBuy;
          });
          setTimeout(()=>{
            setInitialBuy(()=>{
              return initialBuy;
            });
          },1);
        }else{
          setInitialBuy(!initialBuy);
        }
        prevBuyIdRef.current = id;
      }

      if(initialSell){
        setInitialSell(!initialSell);
      }
      // console.log("updated");

    }

    function updateInitialSell(id){
      // console.log("Current ID:", id);
      // console.log("Previous ID:", prevSellIdRef.current);

      if(prevSellIdRef.current===null){
        setInitialSell(!initialSell);
        prevSellIdRef.current = id;
      }else if (prevSellIdRef.current === id) {
        setInitialSell(!initialSell);
        prevSellIdRef.current = null;
      }else{
        if(initialSell){
          setInitialSell(()=>{
            return !initialSell;
          });
          setTimeout(()=>{
            setInitialSell(()=>{
              return initialSell;
            });
          },1);
        }else{
          setInitialSell(!initialSell);
        }
        prevSellIdRef.current = id;
      }

      if(initialBuy){
        setInitialBuy(!initialBuy);
      }
    }

    function updateCompanyInfo(infoObj){
      // console.log(infoObj.name+" "+infoObj.price+" "+infoObj.qty);
      setCompanyInfo(
        {
          name:infoObj.name,
          price:infoObj.price,
          qty:infoObj.qty,
          id:infoObj.id,
        }
      )
    }

    useEffect(()=>{
      if(trigger){
        updateCompanyInfo({
          name:info.companyName,
          price:info.LTP,
          qty:info.qty,
          id:"1",
        });

        setTimeout(()=>{
          return updateInitialSell("1");
        },1);

        resetTrigger();
      }
    },[trigger]);

    return ( 
        <div className='watchlist-container'>
            <TopBar/>
            <div className='watchlist-info'>
                <div className='search-bar'>
                    <div className='search'><i className="fa-solid fa-magnifying-glass"></i></div>
                    <input placeholder="Search eg: infy bse, nifty fut, index fund, etc"/>
                    <p>Ctrl+K</p>
                    <div className='sliders'><a><i className="fa-solid fa-sliders"></i></a></div>
                </div>

                <div className='watchlist'>
                    <p>Watchlist 1 (6/250)</p>
                    <div><a>+ New group</a></div>
                </div>

                <div className='display-stocks'>
                    <div className='tools'>
                        <p className='text'>Default (6)</p>
                        <p className='arrow-up'><i className="fa-solid fa-angle-up"></i></p>
                        <p className='edit'><i className="fa-solid fa-pen"></i></p>
                        <p className='dot'><i className="fa-solid fa-ellipsis-vertical"></i></p>
                    </div>

                    <NewStock
                      name="INFY" 
                      upDown="-3.60"
                      upDownPer="-0.22"
                      price="1605.55"                      
                      funcBuy={updateInitialBuy}
                      funcSell={updateInitialSell}
                      funcCompany={updateCompanyInfo}
                      id={uuidv4()}
                    />

                    <NewStock
                      name="TCS" 
                      upDown="13.15"
                      upDownPer="0.38"
                      price="3447.10"
                      funcBuy={updateInitialBuy}
                      funcSell={updateInitialSell}
                      funcCompany={updateCompanyInfo}
                      id={uuidv4()}
                    />

                    <NewStock
                      name="ONGC" 
                      upDown="3.17"
                      upDownPer="1.28"
                      price="251.05"
                      funcBuy={updateInitialBuy}
                      funcSell={updateInitialSell}
                      funcCompany={updateCompanyInfo}
                      id={uuidv4()}
                    />

                    <NewStock
                      name="HINDUNILVR" 
                      upDown="-15.25"
                      upDownPer="-0.65"
                      price="2319.10"
                      funcBuy={updateInitialBuy}
                      funcSell={updateInitialSell}
                      funcCompany={updateCompanyInfo}
                      id={uuidv4()}
                    />

                    <NewStock
                      name="GOLDBEES" 
                      upDown="1.81"
                      upDownPer="2.22"
                      price="83.20"
                      funcBuy={updateInitialBuy}
                      funcSell={updateInitialSell}
                      funcCompany={updateCompanyInfo}
                      id={uuidv4()}
                    />

                    <NewStock
                      name="RELIANCE" 
                      upDown="-14.10"
                      upDownPer="-0.98"
                      price="1427.50"
                      funcBuy={updateInitialBuy}
                      funcSell={updateInitialSell}
                      funcCompany={updateCompanyInfo}
                      id={uuidv4()}
                    />
                </div>
            </div>

            {
              initialSell
              ?
              <SellWindow funcSell={updateInitialSell} funcBuy={updateInitialBuy} companyInfo={companyInfo} addOrders={addOrders} deletePositions={deletePositions} deleteHoldings={deleteHoldings} username={username}/>
              :
              null
            }
            

            {
              initialBuy
              ?
              <BuyWindow funcBuy={updateInitialBuy} funcSell={updateInitialSell} companyInfo={companyInfo} addOrders={addOrders} username={username}/>
              :
              null
            }
        </div>
    );
}

export default WatchList;