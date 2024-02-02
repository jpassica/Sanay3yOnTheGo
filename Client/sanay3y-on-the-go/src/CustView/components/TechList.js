import React from 'react'
import Card from './Card'
import '../styles/TechList.css'
const TechList = ({TechData,filter,customer_id}) => {
  console.log("Tech list",customer_id)

  return (
    <div className='list-container'>
      
    {TechData.filter(tech => tech.name==filter).map((tech,index)=>(
      <Card key={index} tech={tech} customer_id={customer_id}  />
    ))}  

    </div>
  )
}

export default TechList
