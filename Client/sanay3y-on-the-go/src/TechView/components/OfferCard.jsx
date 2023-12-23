import React from 'react'
import '../styles/general.css'
import '../styles/offers.css'

function OfferCard({offer,OnDelete}) {
  return (
    <>
    <div className='Offercard'>
      <div className='btnpos'>
    <button type="button" className='trashbtn' onClick={() => OnDelete(offer.id)}><span class="bi bi-trash"></span></button>
    </div>
        <h2><b>{offer.heading}</b></h2>
        <h4>Price: 
        {offer.price} <del>{offer.preprice}</del></h4>
        <p>{offer.content}</p>
    </div>
    </>
  )
}

export default OfferCard
