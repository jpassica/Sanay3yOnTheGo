import React, { useState } from 'react'
import '../styles/Bundles.css'

const Bundles = ({bundles}) => {
  const handleBookBundle = (bundleID) => {
    // Add your booking logic here, e.g., navigate to a booking page, make an API request, etc.

    alert('bundle booked successfully')
  };
  const [BundleDate, setBundleDate] = useState(new Date());

  return (
    <div className="bundle-page">
    <h1>Available Bundles</h1>
    <div className='bundle-grid'>
    {bundles.map((bundle,index) => (
      <div key={index} className="bundle-card">
        <div className="bundle-header">
          <h2 className="bundle-name">{bundle.Header}</h2>
        </div>
        <div className="bundle-details">
          <p>Price: <span className="bundle-price">{bundle.Total_price} EGP</span></p>
          <p>{bundle.Description}</p>
          </div>
          <div className='form-grid-item' style={{width:300,marginLeft:30}}>
          <label htmlFor="dateInput">Select a date:</label>
          <input
          type="date"
           id="dateInput"
           value={BundleDate.toISOString().split('T')[0]} // Convert date to string in 'YYYY-MM-DD' format
            onChange={(e) => setBundleDate(e.target.value)}
          />
         </div>
          <button className="book-button" onClick={handleBookBundle}>
            Book Now
          </button>
          
         

         
        
      </div>
    ))}
    </div>
  </div>
  );
}

export default Bundles
