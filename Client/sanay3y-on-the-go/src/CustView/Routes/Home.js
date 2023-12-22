import React, { useEffect, useState } from 'react'

import TechList from '../components/TechList'
import '../styles/TechList.css'
import toolimg from '../../TechView/img/img1.png'
import techimg from '../../TechView/img/tech.png'
import eclipse from '../../TechView/img/Ellipse.png'

const Home = ({services,techData,reviews}) => {

    const[filter,setFilter]=useState('AC')
    console.log(techData)
     
      console.log(filter)
   console.log(services)

  return (
    <div className='home-container'>
      
      <div className='home'>
        <div className='Welcome'>
        
            <h2>Welcome to</h2>
            <h1>Sany3y On The Go!</h1>
            <img src={toolimg} alt="img1" height="400px" width="100%" style={{opacity:"0.3", position:"absolute", top:"-200px",left:"270px",background:'transparent'}}/>
            <img src={techimg} alt="img1" height={280} width={300} style={{opacity:"0.9", position:"absolute", top:"-5px",left:"-430px",background:'transparent'}}/>
        </div>
    </div>

        <div className='filter-buttons'>
               
    {services.map((service,index)=>(
      <button key={index}  onClick={()=>setFilter(service.name)} className='button-17'>{service.name}</button>
    ))}  

        
        </div>
        <TechList TechData={techData} filter={filter} reviews={reviews} />
    
       

        
    </div>
   )
}

export default Home
