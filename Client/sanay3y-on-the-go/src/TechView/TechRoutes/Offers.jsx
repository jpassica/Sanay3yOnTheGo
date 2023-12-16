import React from 'react'
import OfferCard from '../TechComponents/OfferCard'
import UploadOffer from '../TechComponents/UploadOffer'

const Offers = ({offersdata,OnDelete,OnAdd}) => {
  return (
    <>
    <div className='cards'>
      <UploadOffer OnAdd={OnAdd}/>
      {offersdata.map((item,index)=>
      (<OfferCard key={index} offer={item} OnDelete={OnDelete}/>)
      )}</div>
    </>
  )
}

export default Offers