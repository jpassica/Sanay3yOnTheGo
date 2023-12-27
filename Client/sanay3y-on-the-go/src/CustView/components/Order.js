import React, { useEffect } from 'react'
import { useState } from 'react'
import '../styles/Orders.css'
import ReviewOrder from '../Routes/ReviewOrder'
import { useNavigate } from 'react-router-dom'


const Order = ({order}) => {
    const navigate = useNavigate();

    const showReviewOrCancel=()=>
    {
        if(order.Service_status=="pending"||order.Service_status=="upcoming")
        navigate(`/CancelOrder/${order.order_id}`);
        else 
        navigate(`/ReviewOrder/${order.order_id}`);
   }
   const showDetails=()=>
   {
     
   }
        
   
  return (
    <div className='order-container'>
        <div className='order-card'>
            <h3>{order.date}</h3>
            <h3>{order.header}</h3>
            <h5>{order.price} EGP</h5>
            {order.order_type=='R'&&
            <div>
            <h5>Regular Order</h5>
            <button className='order-details-button' onClick={showReviewOrCancel}>Review/cancel</button>
            <button className='order-details-button' onClick={showDetails}>details</button>
            </div>
            }
            {order.order_type=='B'&&
            <div>
            <h5>Bundle</h5>
            <button className='order-details-button' onClick={showReviewOrCancel}>Review/cancel</button>
            <button className='order-details-button' onClick={showDetails}>details</button>
            </div>
            }
            {order.order_type=='O'&&
            <div>
            <h5>Offer</h5>
            <button className='order-details-button' onClick={showReviewOrCancel}>Review/cancel</button>
            <button className='order-details-button' onClick={showDetails}>details</button>
            </div>
            }
            
           
      
        </div>
      
      
    </div>
  )
}


export default Order
