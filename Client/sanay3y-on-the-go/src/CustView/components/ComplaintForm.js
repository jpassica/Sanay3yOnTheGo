import React, { useState } from "react";
import axios from "axios";

const ComplaintForm = ({order_id}) => {

  const postComplaint=async ()=>
  {
    try {
      const response = await axios.post("http://localhost:3001/complaint ", {
        content:complaint,
        customer_id:1,
        order_id:order_id
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      console.log("Complaint submitted successfully:", response.data);
      alert("Thank you,complaint successfully submitted")
    } catch (error) {
      // Handle errors
      console.error("Error in submitting complaint:", error);
      alert("oops,your complaint submission has encountered an error,try again")
      // You may want to show an error message to the user
    }
  }
  
  const handleSubmit = async () => {
    if(complaint=="")
    {
      alert("please enter your complaint to submit")
      return
    }
    console.log(complaint)
    if(!isNaN(Number(complaint)))
    {
      alert('your complaint cannot be a number')
      return
    }
    //post complaint here
    await postComplaint()
  };

  const [complaint, setComplaint] = useState("");
  return (
    <div className="item">
      <form className="review-form">
        <h2>Complaints</h2>

        <label>Any complaints?Tell us</label>
        <textarea
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
        />
      </form>
      <button
        onClick={handleSubmit}
        className="button-17"
        style={{ margin: 30, width: 180 }}
      >
        Submit Complaint
      </button>
    </div>
  );
};

export default ComplaintForm;
