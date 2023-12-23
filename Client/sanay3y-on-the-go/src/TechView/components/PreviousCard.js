import React from 'react'
import '../styles/orders.css'


const PreviousCard = ({order,filter}) => {
  return (
        <div className='cardcontainer'>
    <div className={filter=="previous"?"ordercard":"hidecard"}>
      <h3>{order.header}</h3>
      <p>{order.date}</p>
        <p>{order.details}</p>
        <p>Price: {order.price} <sub>EGP</sub> </p>

    </div>    </div>
  )
}

export default PreviousCard
