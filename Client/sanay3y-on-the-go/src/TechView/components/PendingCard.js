import React from 'react'
import '../styles/orders.css'

const PendingCard = ({order,filter,ondelete,onAccept}) => {
  return (
    <div className='cardcontainer'>
    <div className={filter=="P"?"pordercard":"hidecard"}>
        <h3>{order.header}</h3>
        <p>{order.order_date}</p>
        <p>{order.description}</p>
        <p>Price: {order.price} <sub>EGP</sub> </p>
        <div >
        <button onClick={() => onAccept(order.order_id)} class=" btn-success  my-4 probutton">Accept</button>
        <button onClick={() => ondelete(order.order_id)} class=" btn-danger  my-4 probutton">Decline</button>
        </div>
    </div>
    </div>
  )
}

export default PendingCard
