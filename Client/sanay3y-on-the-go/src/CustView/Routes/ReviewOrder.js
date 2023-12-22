import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import StarRating from '../components/StarRating'
import { useNavigate } from 'react-router-dom'

const ReviewOrder = ({orders,reviews}) => {
    const {id}=useParams()
    const order=orders.filter(o=>o.order_id==id)
    const review=reviews.filter(r=>r.order_id==id)
    const [Rating,setRating]=useState(review.rating) //initial rating
    const [Rev,setRev]=useState(review.rating)
    const navigate = useNavigate();

    const handleSubmit = () => {
      // Logic for handling the form submission
  
      // After successful submission, navigate back to the previous page
      navigate(-1);
    };
  return (
    <div className='review-page'>
      {review!=null &&<form className='review-form'>
      <label >Review your order</label>
    <textarea value={Rev} onChange={(e) => setRev(e.target.value)} />
        </form>}
        <StarRating rating={Rating} setRating={setRating} />
        <button onClick={handleSubmit} className='button-17' style={{margin:30}}>Submit Review</button>

    </div>
  )
}

export default ReviewOrder
