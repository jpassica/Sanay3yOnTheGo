import React from 'react'
import { useState } from 'react'
import HighlightsList from '../components/HighlightsList.js'
// import HighlightsList from 'Client\sanay3y-on-the-go\src\TechComponents\HighlightsList.js'

const FeaturedWork = ({PrevWork,onToggle}) => {

  const[filter,setFilter]=useState(true)

  return (
    <div className='highlightpage'>
        {/* <div className='highlightsbtns'>
            <div></div>
        <button className={filter==false? "probtn probtnclicked" :"probtn"} onClick={()=>setFilter(false)}> Add more </button>
        <button className={filter==true? "probtn probtnclicked" :"probtn"} onClick={()=>setFilter(true)}> Highlights </button>
        <div></div>

        </div> */}
        <h1>Highlights</h1>
        <HighlightsList filter={filter} PrevWork={PrevWork} onToggle={onToggle}/>
    </div>
  )
}

export default FeaturedWork
