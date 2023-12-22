import React from 'react';

const YellowStarsRating = ({ rating }) => {
  const maxStars = 5; // Maximum number of stars

  // Round the rating to the nearest half-star
  const roundedRating = Math.round(rating * 2) / 2;

  return (
    <div className="yellow-stars-rating">
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 0.5;
        const filled = roundedRating >= starValue;

        return (
          <span key={index} className={`star ${filled ? 'filled' : 'empty'}`}>
            ★
          </span>
        );
      })}
    </div>
  );
};

export default YellowStarsRating;