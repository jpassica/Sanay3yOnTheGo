import React, { useState } from 'react'
import Card from './Card'
import '../styles/TechList.css'
//assuming people data have a name,
const TechList = ({TechData,filter}) => {
  

  return (
    <div className='list-container'>
      
    {TechData.filter(tech => tech.service==filter).map((tech,index)=>(
      <Card key={index} name={tech.name} rating={tech.rating}  />
    ))}  

    </div>
  )
}

export default TechList
