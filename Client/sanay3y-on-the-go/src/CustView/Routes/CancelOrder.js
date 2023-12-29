import React from "react";
import { useNavigate } from "react-router-dom";
import ComplaintForm from "../components/ComplaintForm";
import { useParams } from "react-router-dom";
const CancelOrder = ({onCancel}) => {
  const navigate = useNavigate();
  const {id}=useParams()
  console.log(id) //order id
  const handleSubmit = () => {
    // Logic for handling order cancellation
    onCancel(id);
    alert("Order was cancelled successfully");
    window.location.reload();
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
        <ComplaintForm order_id={id}/>
      </div>
    </div>
  );
};

export default CancelOrder;
