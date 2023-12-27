import React, { useState } from 'react'
import ReactSimplyCarousel from 'react-simply-carousel';
import PendingCard from './PendingCard';
import UpcomingCard from './UpcomingCard';
import PrevWorkCard from './PrevWorkCard';
import PreviousCard from './PreviousCard';
import '../styles/orders.css'

const OrdersList = ({orders,filter,ondelete,onDone,onAccept,onToggle}) => {

  return (
    <div className='orederscontainer'>   

   {orders.filter(order => order.order_status==filter).map((order,index)=>(
      <PendingCard key={index} order={order} filter={filter} ondelete={ondelete} onAccept={onAccept}/>
    ))} 

   {orders.filter(order => order.order_status==filter).map((order,index)=>(
         <UpcomingCard key={index} order={order} filter={filter} ondelete={ondelete} onDone={onDone}/>
       ))} 
   
   {orders.filter(order => order.order_status==filter).map((order,index)=>(
      <PreviousCard key={index} order={order} filter={filter} onToggle={onToggle}/>
    ))} 
            
    </div>
  )
}

export default OrdersList
