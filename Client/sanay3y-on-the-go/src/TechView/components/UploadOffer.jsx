import React, { useState } from 'react'

import '../styles/general.css'
import '../styles/highlights.css'

import '../styles/offers.css'
import { Link,useMatch,useResolvedPath } from 'react-router-dom'


function UploadOffer({OnAdd,tech_id}) {

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

     let intpre = parseFloat(preprice,10)
    if(isNaN(intpre))
    {
      alert('Previous Price must be number')
      return
    }
     intpre = parseFloat(price,10)
    if(isNaN(intpre))
    {
      alert('New Price must be number')
      return
    }

    if(Number(preprice)<Number(price))
    {
      alert('New price must be less')
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
        <input type="text" placeholder='Heading'className='uploadfields' onChange={(e) => setHeading(e.target.value)}/>
        <input type="text" placeholder='Description'className='uploadfields' onChange={(e) => setContent(e.target.value)}/>
        <input type="text" placeholder='Previous Price'className='uploadfields' onChange={(e) => setPrePrice(e.target.value)}/>
        <input type="text" placeholder='New Price' className='uploadfields' onChange={(e) => setPrice(e.target.value)}/>


    <div className='offerbtncontainer'>
        <input type='submit' value='Add Offer' className=' btn-primary  my-4 upofferbtn' />
        <CustomLink to={"/Offers/"+tech_id}>
          <input type='button' value='Back to Offers' className=' btn-primary  my-4 upofferbtn' />
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
