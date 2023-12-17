import React from 'react'
import ReactSimplyCarousel from 'react-simply-carousel';
import { useState } from 'react';
import '../styles/TechDetails.css'

const ReviewCarousel = ({reviews}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  return (
        <div  className="carousel-container" >
          <h3>Reviews</h3>
          <ReactSimplyCarousel className="carousel-container"
            activeSlideIndex={activeSlideIndex}
            onRequestChange={setActiveSlideIndex}
            itemsToShow={1}
            itemsToScroll={1}
            forwardBtnProps={{
              //here you can also pass className, or any other button element attributes
              style: {
                alignSelf: 'center',
                background: 'black',
                border: 'none',
                borderRadius: '50%',
                color: 'white',
                cursor: 'pointer',
                fontSize: '20px',
                height: 30,
                lineHeight: 1,
                textAlign: 'center',
                width: 30,
                
              },
              children: <span>{`>`}</span>,
            }}
            backwardBtnProps={{
              //here you can also pass className, or any other button element attributes
              style: {
                alignSelf: 'center',
                background: 'black',
                border: 'none',
                borderRadius: '50%',
                color: 'white',
                cursor: 'pointer',
                fontSize: '20px',
                height: 30,
                lineHeight: 1,
                textAlign: 'center',
                width: 30,
              },
              children: <span>{`<`}</span>,
            }}
            responsiveProps={[
              {
                itemsToShow: 1,
                itemsToScroll: 1,
                minWidth: 768,
              },
            ]}
            speed={300}
            easing="linear"
          >
            {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}
            
            {reviews.map((review,index)=>(
      <div key={index} className='carousel-card'>
         {review.details}
         <br/>
         {review.rating}
      </div >
    ))}  
            
          </ReactSimplyCarousel>
        </div>
     
    
  
  )
}

export default ReviewCarousel
