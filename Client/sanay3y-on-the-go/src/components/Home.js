import React, { useEffect, useState } from 'react'

import TechList from './TechList'
import './TechList.css'

const Home = ({services,techData}) => {

    const[filter,setFilter]=useState('AC')
    console.log(techData)
    const filterItem = (newFilter) => {
        setFilter(newFilter);
      };
     
      console.log(filter)
   

  return (
    <div className='home-container'>
        <div className='filter-buttons'>
         <button onClick={()=>filterItem('AC')} className='button-17'>AC</button>
         <button onClick={()=>filterItem('Cleaning') } className='button-17'>Cleaning</button>
         <button onClick={()=>filterItem('Plumbing')} className='button-17'>Plumbing</button>
        
        </div>
        <TechList TechData={techData} filter={filter}/>
    
       

        
    </div>
   )
}

export default Home
