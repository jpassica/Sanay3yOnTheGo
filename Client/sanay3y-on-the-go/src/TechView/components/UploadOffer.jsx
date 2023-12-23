import React, { useState } from 'react'

import '../styles/general.css'
import '../styles/highlights.css'

import '../styles/offers.css'
import { Link,useMatch,useResolvedPath } from 'react-router-dom'


function UploadOffer({OnAdd}) {

  let [heading,setHeading]=useState("")
  let [content,setContent]=useState("")
  let [preprice,setPrePrice]=useState("")
  let [price,setPrice]=useState("")

  const onSubmit = (e) => {
    // e.preventDefault()

    if (!heading || !content || !preprice || !price) {
      alert('Please add all details')
      return
    }

    OnAdd({ heading, content, preprice,price })
    setHeading('')
    setContent('')
    setPrePrice('')
    setPrice('')
  }

  return (
    <div className='formcontainer'>
    <form className='addofferform' onSubmit={onSubmit}>
    <div className='UpOffercard'>
        <h5><b>Add New Offer</b></h5>
        <input type="text" placeholder='heading'className='uploadfields' onChange={(e) => setHeading(e.target.value)}/>
        <input type="text" placeholder='content'className='uploadfields' onChange={(e) => setContent(e.target.value)}/>
        <input type="text" placeholder='previous price'className='uploadfields' onChange={(e) => setPrePrice(e.target.value)}/>
        <input type="text" placeholder='new price' className='uploadfields' onChange={(e) => setPrice(e.target.value)}/>


    <div className='offerbtncontainer'>
        <input type='submit' value='Add Offer' className='btn btn-primary  my-4 upofferbtn' />
        <CustomLink to="/Offers">
          <input type='button' value='Back to Offers' className='btn btn-primary  my-4 upofferbtn' />
          </CustomLink>
        </div>
    </div>
    </form>
    </div>
  )
}

function CustomLink({to,children,...props})
{
    const topath=useResolvedPath(to)
    const isActive = useMatch({path: topath.pathname,end: true})
    return(
        <div className={isActive?"activate":""}>
            <Link to={to} {...props}>
                {children}
            </Link>

        </div>
    )

}
export default UploadOffer
