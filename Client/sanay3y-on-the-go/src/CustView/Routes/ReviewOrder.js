import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import StarRating from '../components/StarRating'
import { useNavigate } from 'react-router-dom'
import ComplaintForm from '../components/ComplaintForm'
import axios from 'axios'

const ReviewOrder = ({orders,customer_id}) => {

  const {id}=useParams()
  console.log(id)
  const order=orders.filter(o=>o.order_id==id)

  const[initialReview,setInitialReview]=useState()

  const [Rating,setRating]=useState(0)
  const [Rev,setRev]=useState("")


  const navigate = useNavigate();

  //fetching review by order_id
  const fetchReview = async ({order_id}) => 
  {
    const res = await axios.get(`http://localhost:3001/review/${order_id}`)
    const data=res.data
        console.log(data)
        return data
  }

  useEffect(()=>
      {const getReview=async()=>{
      const reviewfromserver=await fetchReview(order.order_id)
      setInitialReview(reviewfromserver)
      }
      getReview()
      },[])

  //const sampleReview={
    //Rating:3,
    //Content:"good job"
  //}

  //  const addReview=async ()=>
  //  {
  //   const res=await axios.post('http://localhost:3001/order/review',
  //   {
  //     order_id:order.order_id,
  //     customer_id:customer_id,
  //     rating:Rating,
  //     content:Rev
  //   },
  //   {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //   }
  //   );

  //  }

    const handleSubmit =async() => {

      //addReview()
     
      // Logic for handling the form submission
      //decide update or insert based on initial rating and initial review
      

  
      // After successful submission, navigate back to the previous page
      alert('review was successfully recorded')
    };

  return (
    
    <div className='review-page'>
      <div className='item'>
      {<form className='review-form'>
        <h2>Review your order</h2>
      <label >Review your order</label>
    <textarea value={Rev} onChange={(e) => setRev(e.target.value)} />
        </form>}
        <StarRating initialRating={initialReview.rating} setRating={setRating} />
        <button onClick={handleSubmit} className='button-17' style={{margin:30}}>Submit Review</button>
        <button onClick={()=>navigate(-1)} className='button-17'>Back to orders</button>
        </div>
       <ComplaintForm />
    </div>
   
  )
}

export default ReviewOrder
