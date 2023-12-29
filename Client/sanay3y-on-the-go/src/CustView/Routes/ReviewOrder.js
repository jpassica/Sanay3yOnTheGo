import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import StarRating from '../components/StarRating'
import { useNavigate } from 'react-router-dom'
import ComplaintForm from '../components/ComplaintForm'
import axios from 'axios'

const ReviewOrder = () => {

  const {id,OrderId}=useParams()

 

  const[initialReview,setInitialReview]=useState()

  const [Rating,setRating]=useState(0)
  const [Rev,setRev]=useState("")


  const navigate = useNavigate();

  //fetching review by order_id
  const fetchReview = async (id) => 
  {
    console.log("order id",OrderId)
    const res = await axios.get(`http://localhost:3001/order/review/${OrderId}`)
    const data=res.data
        console.log("data",!data)
        return data
  }

  useEffect(()=>
      {const getReview=async()=>{
      const reviewfromserver=await fetchReview(id)
      setInitialReview(reviewfromserver)
      }
      getReview()
      },[])


   const addReview=async ()=>
   {
    try
    {
    const res=await axios.post('http://localhost:3001/order/review',
    {
      order_id:OrderId,
      customer_id:id,
      rating:Rating,
      content:Rev
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    );
    console.log("successful review")
    alert("Thank you!your review has been recorded")
  }
  catch (error) {
    // Handle errors
    console.error("Error adding review:", error);
    alert("failed to record your review")

   }
  }
    const handleSubmit =async() => {
      if(Rev=="")
      {
        alert('please enter review to help the technician improve')
        return
      }
      if(!isNaN(Number(Rev)))
      {
        alert('review cannot be a number')
        return
      }

      addReview()
      navigate(-1)

    };

  return (
    
    <div className='review-page'>
      <div className='item'>
        {!initialReview&&
          <>
      <form className='review-form'>
        <h2>Review your order</h2>
      <label >Review your order</label>
    <textarea value={Rev} onChange={(e) => setRev(e.target.value)} />
        </form>
        <StarRating initialRating={initialReview!=null?initialReview.rating:0} setRating={setRating} />
        <button onClick={handleSubmit} className='button-17' style={{margin:30}}>Submit Review</button>
        <button onClick={()=>navigate(-1)} className='button-17'>Back to orders</button>
  
        </>
       }
       {
        initialReview&&<h2>you have already submitted review</h2>
       }
        </div>
       <ComplaintForm order_id={OrderId} customer_id={id} />
    </div>
   
  )
}

export default ReviewOrder
