import React from 'react'
import Order from './Order'
const OrderList = ({orders,filter,customer_id}) => {
    console.log(filter)
    console.log(orders)
    
  return (
    
    <div className='order-list-container'>
         {orders.filter(order => order.order_status==filter).map((order,index)=>(
      <Order key={index} order={order} customer_id={customer_id} />
      
    ))}  
      
    </div>
  )
}

export default OrderList
