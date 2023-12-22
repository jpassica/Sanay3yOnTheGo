import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import sample from '../images/test.png'
import '../styles/TechDetails.css'
import PrevWorkCarousel from '../components/PrevWorkCarousel';
import ReviewCarousel from '../components/ReviewCarousel';


const TechDetails = ({techID,technicians,reviews}) => {


        console.log(technicians)
      const[show,setShow]=useState()
      //booking 
      const[serviceTitle,setServiceTitle]=useState('')
      const[serviceDetails,setServicedetails]=useState('')


      const[prevWork,setPreviousWork]=useState([])
      const[offers,setOffers]=useState([])
     

      //tech id
      const {id}=useParams()

      //fetch previous work of a certain tech
      //fetch offers of a certain tech
      //fetch reviews of a certain tech
      const fetchPreviousWork=async ()=>
      {
        const res=await fetch("http://localhost:5000/prevwork")
        const data=await res.json()
        console.log(data)
        return data
      }
      
      const fetchOffers=async ()=>
      {
        const res=await fetch("http://localhost:5000/offers")
        const data=await res.json()
        console.log(data)
        return data
      }
      useEffect(()=>
        {
          const getPrevWork=async()=>{
        const getWorkFromServer=await fetchPreviousWork()
        setPreviousWork(getWorkFromServer)
         }
         const getOffers=async()=>{
          const getOffersFromServer=await fetchOffers()
          setOffers(getOffersFromServer)
           }
          
        getOffers()
        getPrevWork()

          },[])

      const getTechbyID = () => {
        return technicians.find(t=>t.id==id)
      };

    const toggleShow=()=>{setShow(!show)}
     


      const technician=getTechbyID(techID)
      console.log(technician)

      const addOrder=()=>{ //post or add a technician

      }
      
  if(!technician)
  return(<div>loading</div>)
  return (
    
    <div className='techDetails-container'>
        <div className='tech-card'>
            <img src={sample} width="230px" className='tech-img' />
            <div className='tech-info'>
         <h1> {technician.name}</h1>
          <h4>{technician.service}</h4>
          <h4>{technician.email}</h4>
          <h4>{technician.area}</h4>
          <h4>{technician.phone}</h4>
          </div>
        </div>
        <button className=' button-52' onClick={toggleShow}>
            Book a service NOW!
        </button>
        <div />
        {show && <div className='book-form-container'>
            <form className='book-form' onSubmit={addOrder}>
              <div className='form-grid-item'>
               <label for="Ser-title">service title</label>
                <input type='text' value={serviceTitle} onChange={(e) => setServiceTitle(e.target.value)} id="Ser-title"/>
                </div>
                <div className='form-grid-item'>
                  <label for="ser-details">service details</label>
                <textarea id="ser-details" value={serviceDetails} onChange={(e) => setServicedetails(e.target.value)}>
                type here..
                </textarea>
                </div>
                <input type='submit' className='button-53' value='place order!' />
                
                
            </form>
         </div>}
        <PrevWorkCarousel items={prevWork.filter(w=>w.id==id)}/>
        <div>
        <h3 className='headingprev'>Special Offers</h3>
        <div className='offer-container1'>
        {offers.filter(offer => offer.id==id).map((offer)=>(
        
        <div className='offer-card1'>
        <h2><b>{offer.heading}</b></h2>
        <h4>Price: 
        {offer.price} <del>{offer.preprice}</del></h4>
        <p>{offer.content}</p>


      </div>
    ))}  
    </div>
    </div>
        <ReviewCarousel reviews={reviews.filter(r=>r.tech_id==id)} />
        
       
      
    </div>
    
  )
}

export default TechDetails
