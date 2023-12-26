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
        <button type="button" className={order.featured==true? "removebtn" :"addbtn"} style={{position:"relative",
      left:"320px"}}><span className={order.featured==true? "bi bi-trash" :"bi bi-cloud-plus-fill"}></span></button>
    </div> 
    
       </div>
  )
}

export default PreviousCard
