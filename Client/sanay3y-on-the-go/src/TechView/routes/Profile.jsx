import React from 'react'
// import CardList from '../components/CardList'
import { useState } from 'react'


const Profile = ({offersdata,OnDelete,OnAdd}) => {

  const[filter,setFilter]=useState('offers')

  return (
    <div className='profile'>
      <div className='procontainer'>
        <button className='probtn' onClick={()=>setFilter("featured")}> Featured </button>
        <button className='probtn' onClick={()=>setFilter('offers')}> Offers </button>
      </div>
      <div className='cards'>
        {/* <CardList filter={filter} offersdata={offersdata} OnDelete={OnDelete} OnAdd={OnAdd}/> */}

      </div>
    </div>
  )
}

export default Profile
