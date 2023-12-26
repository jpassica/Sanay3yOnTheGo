import React from 'react'
import '../styles/orders.css'

const UpcomingCard = ({order,filter,ondelete,onDone}) => {
  return (
    <div className='cardcontainer'>
    <div className={filter=="upcoming"?"pordercard":"hidecard"}>
        <h3>{order.header}</h3>
        <p>{order.date}</p>
        <p>{order.details}</p>
        <p>Price: {order.price} <sub>EGP</sub> </p>
        <div >
        <button onClick={() => onDone(order.id)} class=" btn-success  my-4 probutton">Done</button>
        <button onClick={() => ondelete(order.id)} class=" btn-danger  my-4 probutton">Cancel</button>
        </div>
    </div>
    </div>
  )
}

export default UpcomingCard
