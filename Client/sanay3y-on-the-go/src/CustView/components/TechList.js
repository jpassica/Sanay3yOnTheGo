import React, { useState } from 'react'
import Card from './Card'
import '../styles/TechList.css'
//assuming people data have a name,
const TechList = ({TechData,filter}) => {
  

  return (
    <div className='list-container'>
      
    {TechData.filter(tech => tech.name==filter).map((tech,index)=>(
      <Card key={index} tech={tech}  />
    ))}  

    </div>
  )
}

export default TechList
