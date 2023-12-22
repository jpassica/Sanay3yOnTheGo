import React from 'react'
import "../styles/wallet.css"
import fix from "../images/fix.png"
const Feedback = () => {
    const sendFeedback=()=>
    {
        alert("your feedback is sent!")
    }
  return (
    <div className='feedback-page'>
        <form className='review-form' width="700px !important">
            <h3>Share your feedback with us!</h3>
            <label>write your feedback here</label>
            <textarea />
            <button  className='button-17' onClick={sendFeedback} style={{margin:30,width:200}}>Send Feedback</button>
        </form>
        <img src={fix} style={{opacity:"50%"}}/>
      
    </div>
  )
}

export default Feedback
