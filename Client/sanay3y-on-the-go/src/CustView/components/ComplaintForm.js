import React, { useState } from "react";

const ComplaintForm = () => {
  
  const handleSubmit = () => {
    //post complaint here
    alert("complaint sent successfully!");
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
