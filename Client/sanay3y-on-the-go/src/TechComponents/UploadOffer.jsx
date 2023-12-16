import React, { useState } from 'react'
import './styles/general.css'
import './styles/offers.css'

function UploadOffer({OnAdd}) {

  let [heading,setHeading]=useState("")
  let [content,setContent]=useState("")
  let [preprice,setPrePrice]=useState("")
  let [price,setPrice]=useState("")

  const onSubmit = (e) => {
    e.preventDefault()

    if (!heading) {
      alert('Please add a task')
      return
    }

    OnAdd({ heading, content, preprice,price })
    setHeading('')
    setContent('')
    setPrePrice('')
    setPrice('')
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
    <div className='UpOffercard'>
        <h5><b>Add New Offer</b></h5>
        <input type="text" placeholder='heading'className='uploadfields' onChange={(e) => setHeading(e.target.value)}/>
        <input type="text" placeholder='content'className='uploadfields' onChange={(e) => setContent(e.target.value)}/>
        <input type="text" placeholder='previous price'className='uploadfields' onChange={(e) => setPrePrice(e.target.value)}/>
        <input type="text" placeholder='new price' className='uploadfields' onChange={(e) => setPrice(e.target.value)}/>

        <input type='submit' value='Add Offer' className='btn btn-block' />
    </div>
    </form>
  )
}

export default UploadOffer
