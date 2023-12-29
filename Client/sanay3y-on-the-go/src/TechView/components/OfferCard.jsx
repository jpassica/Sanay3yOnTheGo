import React from 'react'
import '../styles/general.css'
import '../styles/offers.css'

function OfferCard({offer,OnDelete,onAdd}) {
  return (
    <>
    <div className='Offercard'>
      <div className='btnpos'>
    <button type="button" className='trashbtn' onClick={() => OnDelete(offer.offer_id)}><span class="bi bi-trash"></span></button>
    </div>
        <h2><b>{offer.header}</b></h2>
        <h4>Price: 
        {offer.new_price} <del>{offer.prev_price}</del></h4>
        <p>{offer.description}</p>
    </div>
    </>
  )
}

export default OfferCard
