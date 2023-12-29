import React, { useEffect } from 'react'
import { useState } from 'react'
import '../styles/Orders.css'
import ReviewOrder from '../Routes/ReviewOrder'
import { useNavigate } from 'react-router-dom'


const Order = ({order,customer_id}) => {
    const navigate = useNavigate();

    const showReviewOrCancel=()=>
    {
        if(order.order_status=="P"||order.order_status=="U")
        navigate(`/CancelOrder/${customer_id}/${order.order_id}`);
        else 
        navigate(`/ReviewOrder/${customer_id}/${order.order_id}`);
   }

        
   
  return (
    <div className='order-container'>
        <div className='order-card'>
            <h3>{order.order_DATE}</h3>
            <h3>Order #{order.order_id}</h3>
            <h5>{order.price} EGP</h5>
            {order.order_type=='R'&&
            <div>
            <h5>Regular Order</h5>
            <div className='regular-details'> 
            <h4>{order.header}</h4>
            <h4>{order.description}</h4>
            <h4>{order.price}</h4>
            </div>
            <button className='order-details-button' onClick={showReviewOrCancel}>Review/cancel</button>
            </div>
            }
            {order.order_type=='B'&&
            <div>
            <h5>Bundle</h5>
            <div className='bundle-details'> 
            <h4>{order.header}</h4>
            <h4>{order.description}</h4>
            <h4>{order.total_price}</h4>
            </div>
            <button className='order-details-button' onClick={showReviewOrCancel}>Review/cancel</button>
            </div>
            }
            {order.order_type=='O'&&
            <div>
            <h5>Offer</h5>
            <h4>{order.header}</h4>
            <h4>{order.description}</h4>
            <h4>{order.new_price}</h4>
            <div className='offer-details'> 

            </div>
            <button className='order-details-button' onClick={showReviewOrCancel}>Review/cancel</button>
            </div>
            }
            
           
      
        </div>
      
      
    </div>
  )
}


export default Order
