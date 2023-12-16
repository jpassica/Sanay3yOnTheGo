import React, { useEffect, useState } from 'react'

import TechList from '../components/TechList'
import '../styles/TechList.css'

const Home = ({services,techData}) => {

    const[filter,setFilter]=useState('AC')
    console.log(techData)
     
      console.log(filter)
   console.log(services)

  return (
    <div className='home-container'>
        <div className='filter-buttons'>
               
    {services.map((service,index)=>(
      <button key={index}  onClick={()=>setFilter(service.name)} className='button-17'>{service.name}</button>
    ))}  

        
        </div>
        <TechList TechData={techData} filter={filter}/>
    
       

        
    </div>
   )
}

export default Home
