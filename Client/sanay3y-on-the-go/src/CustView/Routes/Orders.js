import React from 'react'
import OrderList from '../components/OrderList'
import { useState } from 'react'

const Orders = ({orders}) => {
    const[filter,setFilter]=useState('P')
    console.log(filter)
  return (
    <div>
       <div className='filter-buttons'>
               
                 <button  onClick={()=>setFilter("F")} className='button-17'>finished</button>
                 <button onClick={()=>setFilter("U")} className='button-17'>upcoming</button>
                 <button onClick={()=>setFilter("P")} className='button-17'>pending</button>
                   
                   </div>
                   <OrderList orders={orders} filter={filter} />
    </div>
  )
}

export default Orders
