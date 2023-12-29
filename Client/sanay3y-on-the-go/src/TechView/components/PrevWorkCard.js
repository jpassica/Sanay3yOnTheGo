import React from 'react'
import image1 from '../img/profile.png'

import '../styles/general.css'
import '../styles/highlights.css'
import '../styles/offers.css'



const PrevWorkCard = ({work,onToggle}) => {
  return (
    <div className='workcard'>
    <div>
    <button type="button" onClick={() => onToggle(work.order_id)} className={work.highlighted==true? "removebtn" :"addbtn"} style={{position:"relative", left:"-10px",top:"-10px"}}><span className={work.highlighted==true? "bi bi-trash" :"bi bi-cloud-plus-fill"}></span></button>
        <h5><b>{work.header}</b></h5>
        <h4>Price: 
        {work.Price}</h4>
        <p>{work.Description}</p>
    </div>
        <div>
        <img className='workimg' src={image1} alt='' />
    </div>
    </div>
  )
}

export default PrevWorkCard
