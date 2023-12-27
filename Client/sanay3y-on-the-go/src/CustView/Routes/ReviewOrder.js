import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import StarRating from '../components/StarRating'
import { useNavigate } from 'react-router-dom'
import ComplaintForm from '../components/ComplaintForm'

const ReviewOrder = ({orders,reviews}) => {

  const {id}=useParams()
  console.log(id)
  const order=orders.filter(o=>o.order_id==id)

  //fetching review by order_id
  const sampleReview={
    rating:3,
    details:"good job"
  }

  const initialRating=sampleReview.rating
  const initialDetails=sampleReview.details

  const [Rating,setRating]=useState(initialRating)
  const [Rev,setRev]=useState(initialDetails)


  const navigate = useNavigate();
    const handleSubmit = () => {
      // Logic for handling the form submission
      //decide update or insert based on initial rating and initial review
  
      // After successful submission, navigate back to the previous page
    };

  return (
    
    <div className='review-page'>
      <div className='item'>
      {<form className='review-form'>
        <h2>Review your order</h2>
      <label >Review your order</label>
    <textarea value={Rev} onChange={(e) => setRev(e.target.value)} />
        </form>}
        <StarRating initialRating={Rating} setRating={setRating} />
        <button onClick={handleSubmit} className='button-17' style={{margin:30}}>Submit Review</button>
        <button onClick={()=>navigate(-1)} className='button-17'>Back to orders</button>
        </div>
       <ComplaintForm />
    </div>
   
  )
}

export default ReviewOrder
