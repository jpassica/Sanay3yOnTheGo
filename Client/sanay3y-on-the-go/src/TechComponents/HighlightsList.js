import React from 'react'
import PrevWorkCard from './PrevWorkCard'

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
