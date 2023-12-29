import React from 'react'
import OfferCard from '../components/OfferCard'
import UploadOffer from '../components/UploadOffer'
import '../styles/offers.css'
import { Link,useMatch,useResolvedPath } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
//{offersdata,OnDelete,OnAdd}

  // Add Offer


const Offers = () => {
const {id}=useParams()
  const[offers,setoffers]=useState([])

  const fetchoffers=async ()=>
  {
    const res = await axios.get(`http://localhost:3001/offer/tech/${id}`);
    const data= res.data;
    console.log(data)
    return data
  }

  useEffect(()=>
    {
      const getoffers=async()=>{
    const Offersfromserver=await fetchoffers()
    setoffers(Offersfromserver)
     }
    getoffers()
      },[])

const addoffer = async (offer) => {
    const res = await axios.post('http://localhost:3001/offer', 
    { tech_id: id, 
      header: offer.heading,
      description: offer.content,
      prev_price: offer.preprice,
      new_price: offer.price
    }, 
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    // {
    //   method: 'POST',
    //   headers: {
    //     'Content-type': 'application/json',
    //   },
    //   body: JSON.stringify(offer),
    // })
  
    const data = res.data;
  
    setoffers([...offers, data])
  }
  const deleteOffer = async (offerId) => {
    const res = await axios.delete(`http://localhost:3001/offer/${offerId}`);
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setoffers(offers.filter((offer) => offer.id !== id))
      : alert('Error Deleting This Offer')
  }



  return (
    <>
    <CustomLink to="/AddOffer"><button className='offerbtn'>Add New Offer</button></CustomLink>
    
    <div className='cards'>
      {offers.map((item,index)=>
      (<OfferCard key={index} offer={item} OnDelete={deleteOffer}/>)
      )}</div>
    </>
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

export default Offers