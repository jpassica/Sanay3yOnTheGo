import React from 'react'
import '../styles/orders.css'


const PreviousCard = ({order,filter,onToggle}) => {
  return (
        <div className='cardcontainer'>
    <div className={filter=="F"?"ordercard":"hidecard"}>
      <h3>{order.header}</h3>
      <p>{order.order_date}</p>
        <p>{order.description}</p>
        <p>Price: {order.price} <sub>EGP</sub> </p>
        <button type="button" onClick={() => onToggle(order.id)} className={order.featured==true? "removebtn" :"addbtn"} style={{position:"relative",
          left:"320px"}}><span className={order.featured==true? "bi bi-trash" :"bi bi-cloud-plus-fill"}></span></button>
    </div> 
    
       </div>
  )
}

export default PreviousCard
