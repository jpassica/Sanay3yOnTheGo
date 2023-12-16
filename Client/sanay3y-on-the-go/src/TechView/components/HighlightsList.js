import React from 'react'
import PrevWorkCard from './PrevWorkCard'

import '../styles/general.css'
import '../styles/highlights.css'
import '../styles/offers.css'



const HighlightsList = ({filter,PrevWork,onToggle}) => {
  return (
    <div className='cards'>
      {PrevWork.filter(work => work.featured==filter).map((work,index)=>(
      <PrevWorkCard key={index} work={work} onToggle={onToggle} />
    ))}  
    </div>
  )
}

export default HighlightsList
