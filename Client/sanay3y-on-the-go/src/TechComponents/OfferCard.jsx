import React from 'react'
import './styles/general.css'
import './styles/offers.css'

function OfferCard({offer,OnDelete}) {
  return (
    <>
    <div className='Offercard'>
        <h2><b>{offer.heading}</b></h2>
        <h4>Price: 
        {offer.price} <del>{offer.preprice}</del></h4>
        <p>{offer.content}</p>
    <button type="button" onClick={() => OnDelete(offer.id)}><span class="bi bi-trash"></span></button>
    </div>
    </>
  )
}

export default OfferCard
