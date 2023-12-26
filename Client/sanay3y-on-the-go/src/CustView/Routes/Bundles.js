import React from 'react'
import '../styles/Bundles.css'

const Bundles = ({bundles}) => {
  const handleBookBundle = (bundleName) => {
    // Add your booking logic here, e.g., navigate to a booking page, make an API request, etc.
    console.log(`Booking ${bundleName}`);
  };
  return (
    <div className="bundle-page">
    <h1>Available Bundles</h1>
    <div className='bundle-grid'>
    {bundles.map((bundle) => (
      <div key={bundle.bundle_name} className="bundle-card">
        <div className="bundle-header">
          <h2 className="bundle-name">{bundle.bundle_name}</h2>
        </div>
        <div className="bundle-details">
          <p>Price: <span className="bundle-price">{bundle.price} EGP</span></p>
          <p>{bundle.bundle_details}</p>
          </div>
          <button className="book-button" onClick={() => handleBookBundle(bundle.bundle_name)}>
            Book Now
          </button>
        
      </div>
    ))}
    </div>
  </div>
  );
}

export default Bundles
