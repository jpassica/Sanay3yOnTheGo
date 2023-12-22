import React from 'react'
import OrderList from '../components/OrderList'
import { useState } from 'react'

const Orders = ({orders}) => {
    const[filter,setFilter]=useState('pending')
    console.log(filter)
  return (
    <div>
       <div className='filter-buttons'>
               
                 <button  onClick={()=>setFilter("finished")} className='button-17'>finished</button>
                 <button onClick={()=>setFilter("upcoming")} className='button-17'>upcoming</button>
                 <button onClick={()=>setFilter("pending")} className='button-17'>pending</button>
                   
                   </div>
                   <OrderList orders={orders} filter={filter} />
    </div>
  )
}

export default Orders
