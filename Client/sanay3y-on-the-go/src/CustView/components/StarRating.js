import React, { useState } from 'react';
import '../styles/Orders.css'

const StarRating = ({ rating: propRating ,setRating}) => {
  const [userRating, setUserRating] = useState(propRating || 0);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starClassName = i <= userRating ? 'filled' : '';
      stars.push(
        <span
          key={i}
          className={`star ${starClassName}`}
          onClick={() => {setUserRating(i); setRating(i)}}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="star-rating">
      {renderStars()}
      <p>Current Rating: {userRating}</p>
    </div>
  );
};

export default StarRating;
