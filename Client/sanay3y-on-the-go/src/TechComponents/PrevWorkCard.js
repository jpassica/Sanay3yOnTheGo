import React from 'react'
import image1 from '../TechRoutes/img/profile.png'

const PrevWorkCard = ({work,onToggle}) => {
  return (
    <div className='workcard'>
    <div>
    <button type="button" onClick={() => onToggle(work.id)} className={work.featured==true? "removebtn" :"addbtn"}><span className={work.featured==true? "bi bi-trash" :"bi bi-cloud-plus-fill"}></span></button>
        <h5><b>{work.header}</b></h5>
        <h4>Price: 
        {work.price}</h4>
        <p>{work.content}</p>
    </div>
        <div>
        <img className='workimg' src={image1} alt='' />
    </div>
    </div>
  )
}

export default PrevWorkCard
