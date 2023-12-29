import React, { useState } from "react";
import "../styles/Bundles.css";
import axios from "axios";

const Bundles = ({ bundles }) => {
  const [BundleDate, setBundleDate] = useState(new Date());
  const postBundleOrder= async({bundle_id})=>
  {
    try {
      const response = await axios.post(`http://localhost:3001/bundle/${bundle_id}`, {

        customer_id:1,
        order_exec_date:BundleDate,
        type:"B"
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      // Handle the response as needed
      console.log("bundle booked successfully:", response.data);
      // You may want to update the UI or show a success message to the user
    } catch (error) {
      // Handle errors
      console.error("bundle booking order:", error);
      // You may want to show an error message to the user
    }
  }
  const handleBookBundle =async (bundleID) => {
    console.log(bundleID)
    await postBundleOrder(bundleID)
    // Add your booking logic here, e.g., navigate to a booking page, make an API request, etc.

    alert("bundle booked successfully");
  };


  return (
    <div className="bundle-page">
      <h1>Available Bundles</h1>
      <div className="bundle-grid">
        {bundles.map((bundle, index) => (
          <div key={index} className="bundle-card">
            <div className="bundle-header">
              <h2 className="bundle-name">{bundle.header}</h2>
            </div>
            <div className="bundle-details">
              <p>
                Price:{" "}
                <span className="bundle-price">{bundle.total_price} EGP</span>
              </p>
              <p>{bundle.description}</p>
            </div>
            <div
              className="form-grid-item"
              style={{ width: 300, marginLeft: 30 }}
            >
              <label htmlFor="dateInput">Select a date:</label>
              <input
                type="date"
                id="dateInput"
                value={BundleDate? BundleDate.toISOString().split("T")[0]: ""} // Convert date to string in 'YYYY-MM-DD' format
                onChange={(e) => setBundleDate(new Date(e.target.value))}
              />
            </div>
            <button className="book-button" onClick={()=>handleBookBundle(bundle.bundle_id)}>
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bundles;
