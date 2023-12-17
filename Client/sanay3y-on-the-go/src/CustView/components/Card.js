import React, { useState } from 'react'
import {Link,NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';

import '../styles/Card.css'
import TechDetails from './TechDetails'
 



const Card = ({tech}) => {

 
 
  return (
    <div className='card-tech2'>
        <img src= {tech.photoURL} width={100}/>
        <ul>
        <NavLink to={`/TechDetails/${tech.id}`}  >
        <h3>{tech.name}</h3>
        </NavLink>
        </ul>
      < div className='stars'>{tech.rating}</div>

      

    </div>
  )
}

export default Card
