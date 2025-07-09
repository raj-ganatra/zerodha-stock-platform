import React from 'react';
import "./NewStock.css";

import BuyWindow from './BuyWindow.jsx';
import SellWindow from './SellWindow.jsx';

function NewStock({name, upDown, upDownPer, price, funcBuy, funcSell, funcCompany, id}) {
    return (
        <div className='newstock-container'>
            {upDown<0 
                ? <p className='company-name-down'>{name}</p>
                : <p className='company-name-up'>{name}</p>
            }

            <a className='buy link' onClick={()=>{
                // console.log(id);
                funcBuy(id);
                funcCompany(
                    {
                        name:name,
                        price:price,
                        qty:"1",
                        id:id,
                    }
                )
            }}>B</a>
            <a className='sell link' onClick={()=>{
                funcSell(id);
                funcCompany(
                    {
                        name:name,
                        price:price,
                        qty:"1",
                        id:id,
                    }
                );
            }}>S</a>
            <a className='dept link'><i className="fa-solid fa-bars"></i></a>
            <a className='up-trend link'><i className="fa-solid fa-arrow-trend-up"></i></a>
            <a className='delete link'><i className="fa-solid fa-trash-can"></i></a>
            <a className='dot link'><i className="fa-solid fa-ellipsis"></i></a>

            <p className='up-down hover'>{upDown}</p>

            <p className='up-down-percentage hover'>{upDownPer}%</p>

            {upDown<0 
                ? <p className='up-down-arrow-down hover'><i className="fa-solid fa-chevron-down"></i></p> 
                : <p className='up-down-arrow-up hover'><i className="fa-solid fa-chevron-up up"></i></p>
            }

            {upDown<0
                ? <p className='price-down hover'>{price}</p>
                : <p className='price-up hover'>{price}</p>
            }
        </div>
     );
}

export default NewStock;