import React from "react";
import { useNavigate } from "react-router-dom";
import ComplaintForm from "../components/ComplaintForm";
import { useParams } from "react-router-dom";
import axios from "axios";
const CancelOrder = () => {
  const navigate = useNavigate();
  const {id,OrderId}=useParams()
  
  console.log(id) 
  const fetchOrder = async () => 
  {
    try
    {
    const res = await axios.get(`http://localhost:3001/order/${OrderId}`)
    const data=res.data
        console.log(data)
        return data
    }
    catch(error)
    {
    console.log("error in fetching order",error)
    }
  }

  const onCancel = async (doneorder) => 
  {
    const updorder = { ...doneorder, order_status: "C" }
    try
    {

    const res = await axios.patch(`http://localhost:3001/order/${doneorder.order_id}`, 
    {
      order_status: updorder.order_status
    },
    {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })

    const data =  res.data

   
    alert("your order was cancelled successfully")
    }
    catch(error)
    {
      alert("oops!your order cancellation has encountred an error")
    }
  }

  const handleSubmit =async () => {
    const doneorder=await fetchOrder()
    // Logic for handling order cancellation
    await onCancel(doneorder);
    navigate(-1)

    //window.location.reload();
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
        <ComplaintForm order_id={OrderId} customer_id={id}/>
      </div>
    </div>
  );
};

export default CancelOrder;
