import React from 'react'
import '../styles/orders.css'

const UpcomingCard = ({order,filter,onCancel,onDone}) => {
  return (
    <div className='cardcontainer'>
    <div className={filter=="U"?"pordercard":"hidecard"}>
        <h3>{order.header}</h3>
        <p>{order.order_date}</p>
        <p>{order.dexcription}</p>
        <p>Price: {order.price} <sub>EGP</sub> </p>
        <div >
        <button onClick={() => onDone(order.order_id)} class=" btn-success  my-4 probutton">Done</button>
        <button onClick={() => onCancel(order.order_id)} class=" btn-danger  my-4 probutton">Cancel</button>
        </div>
    </div>
    </div>
  )
}

export default UpcomingCard
