import React, { useEffect } from 'react'
import { useState } from 'react'
import '../styles/Orders.css'
import ReviewOrder from '../Routes/ReviewOrder'
import { useNavigate } from 'react-router-dom'


const Order = ({order}) => {
    const navigate = useNavigate();

    const showDetails=()=>
    {
        if(order.Service_status=="pending")
        navigate(`/CancelOrder/${order.order_id}`);
        else if (order.Service_status=="upcoming")
        navigate(`/CancelOrder/${order.order_id}`);
        else
        navigate(`/ReviewOrder/${order.order_id}`);
    console.log(order.id)
        
            
          }
  
        
   
  return (
    <div className='order-container'>
        <div className='order-card'>
            <h3>{order.date}</h3>
            <h3>{order.header}</h3>
            <h5>{order.tech_id}</h5>
            <h5>{order.price} EGP</h5>
            <button className='order-details-button' onClick={showDetails}>details</button>
      
        </div>
      
      
    </div>
  )
}


export default Order
