import React, { useState } from 'react'
import OrdersList from '../components/OrdersList';


const Orders = ({orders}) => {
  const [filter,setFilter]=useState('pending');
  return (

    <div>
       <div className='highlightsbtns'>
            <div></div>
        <button className={filter=='pending'? "probtn probtnclicked" :"probtn"} onClick={()=>setFilter('pending')}> Pending </button>
        <button className={filter=='previous'? "probtn probtnclicked" :"probtn"} onClick={()=>setFilter('previous')}> Previous </button>
        <button className={filter=='upcoming'? "probtn probtnclicked" :"probtn"} onClick={()=>setFilter('upcoming')}> Upcoming </button>

        <div></div>

        </div>

        <OrdersList filter={filter} orders={orders}/>
        
    </div>
  )
}

export default Orders
