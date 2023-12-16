import React from 'react'

import '../styles/Card.css'

const Card = ({name,rating,photoURL}) => {
  return (
    <div className='card-tech2'>
        <img src= {photoURL} width={100}/>
        <h3>{name}</h3>
      < div className='stars'>rating</div>

    </div>
  )
}

export default Card
