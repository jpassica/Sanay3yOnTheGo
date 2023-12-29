import React, { useState } from 'react'
import fix from "../img/img1.png";
import axios from "axios";

const Feedback = () => {
    const [feedback, setFeedback] = useState("");
  const postFeedback=async()=>
  {
    try {
      const response = await axios.post("http://localhost:3001/feedback", {
       content:feedback,
       customer_id:1
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      // Handle the response as needed
      console.log("Order booked successfully:", response.data);
      // You may want to update the UI or show a success message to the user
    } catch (error) {
      // Handle errors
      console.error("Error booking order:", error);
      // You may want to show an error message to the user
    }
  }
  const sendFeedback = async () => {
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
}

export default Feedback
