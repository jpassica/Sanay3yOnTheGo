import React, { useState } from 'react'
import OrdersList from '../components/OrdersList';


const Orders = ({orders,ondelete,onDone,onAccept,onToggle}) => {
  const [filter,setFilter]=useState('F');
  return (

    <div>
       <div className='highlightsbtns'>
            <div></div>
        <button className={filter=='P'? "probtn probtnclicked" :"probtn"} onClick={()=>setFilter('P')}> Pending </button>
        <button className={filter=='F'? "probtn probtnclicked" :"probtn"} onClick={()=>setFilter('F')}> Previous </button>
        <button className={filter=='U'? "probtn probtnclicked" :"probtn"} onClick={()=>setFilter('U')}> Upcoming </button>

        <div></div>

        </div>

        <OrdersList filter={filter} orders={orders} ondelete={ondelete} onDone={onDone} onAccept={onAccept} onToggle={onToggle}/>
        
    </div>
  )
}

export default Orders
