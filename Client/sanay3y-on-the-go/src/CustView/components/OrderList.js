import React from 'react'
import Order from './Order'
const OrderList = ({orders,filter}) => {
    console.log(filter)
    console.log(orders)
    
  return (
    <div className='order-list-container'>
         {orders.filter(order => order.Service_status==filter).map((order,index)=>(
      <Order key={index} order={order}  />
      
    ))}  
      
    </div>
  )
}

export default OrderList
