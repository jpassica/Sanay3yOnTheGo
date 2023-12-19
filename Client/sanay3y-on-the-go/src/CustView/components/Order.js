import React, { useEffect } from 'react'
import { useState } from 'react'
import '../styles/Orders.css'

const Order = ({order}) => {
    const[show,setShow]=useState(0)
    const showDetails=()=>
    {
        if(order.Service_status=="pending")
        setShow(1) //for pending
        else if (order.Service_status=="upcoming")
        setShow(2) //for upcoming
        else
        setShow(3) //for finished
    console.log(show)
    }
    useEffect(()=>
    {
        setShow(0)
    }
        ,[order]
    )
  return (
    <div className='order-container'>
        <div className='order-card'>
            <h3>{order.date}</h3>
            <h3>{order.header}</h3>
            <button className='order-details-button' onClick={showDetails}>details</button>
            {
            show==1&&
            <div className='pending-details'>
                pending
                </div>
        }
        {
            show==2&&
            <div className='upcoming-details'>
                upcoming
                </div>
        }
        {
            show==3&&
            <div className='finished-details'>
                finished

                </div>
        }
        </div>
      
      
    </div>
  )
}

export default Order
