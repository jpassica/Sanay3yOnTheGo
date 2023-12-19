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

      </div>
    </div>
  )
}

export default Profile
