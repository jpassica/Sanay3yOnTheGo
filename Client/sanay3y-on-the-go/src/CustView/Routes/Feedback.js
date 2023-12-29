import React, { useState } from "react";
import "../styles/wallet.css";
import fix from "../images/fix.png";
import axios from "axios";
import { useParams } from "react-router-dom";
const Feedback = () => {

  const [feedback, setFeedback] = useState("");
  const{id}=useParams()
  const postFeedback=async()=>
  {
    try {
      const response = await axios.post("http://localhost:3001/feedback", {
       content:feedback,
       customer_id:id
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      // Handle the response as needed
      console.log("Order booked successfully:", response.data);
      alert("thank you for your feedback!")

    } catch (error) {
      // Handle errors
      console.error("Error booking order:", error);
      alert("feedback submission encountered an error,try again")
    }
  }
  const sendFeedback = async () => {
    console.log("send ")
    if(feedback=="")
    {
      alert("please enter your feedback to submit")
      return
    }
    if(!isNaN(Number(feedback)))
    {
      alert("your feedback cannot be a number")
      return
    }
    //post feedback here
    await postFeedback()

    alert("Thank you,your feedback has been recorded!");
  };
 
  return (
    <div className="feedback-page">
      <form className="review-form" width="700px !important">
        <h3>Share your feedback with us!</h3>
        <label>write your feedback here</label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button
          className="button-17"
          onClick={sendFeedback}
          style={{ margin: 30, width: 200 }}
        >
          Send Feedback
        </button>
      </form>
      <img src={fix} style={{ opacity: "50%" }} />
    </div>
  );
};

export default Feedback;
