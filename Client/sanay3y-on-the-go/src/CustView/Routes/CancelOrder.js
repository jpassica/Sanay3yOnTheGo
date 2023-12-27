import React from "react";
import { useNavigate } from "react-router-dom";
import ComplaintForm from "../components/ComplaintForm";
const CancelOrder = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Logic for handling order cancellation
    alert("Order was cancelled successfully");
  };
  return (
    <div className="review-page">
      <div className="item">
        <div className="review-form">
          <h2>Want to Cancel?</h2>
          <h3>Click here to cancel</h3>
          <button
            onClick={handleSubmit}
            className="button-17"
            style={{ margin: 30, width: 150 }}
          >
            Cancel order
          </button>
          <button
            onClick={() => navigate(-1)}
            className="button-17"
            style={{ margin: 30, width: 150 }}
          >
            Back to orders
          </button>
        </div>
      </div>
      <div>
        <ComplaintForm />
      </div>
    </div>
  );
};

export default CancelOrder;
