import React from 'react'
import ReactSimplyCarousel from 'react-simply-carousel';
import { useState } from 'react';
import '../styles/TechDetails.css'
import sample from '../images/test.png'

const PrevWorkCarousel = ({items}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0); 
  return (
        <div  className="carousel-container" >
          { items.length!=0&&
          <h3 className='headingprev'>previous work</h3>
        }
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
                margin: 10 ,
                
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
                margin: 10 ,
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
            
            {items.filter(item=> item.featured==1).map((item,index)=>(
      <div key={index} className='carousel-card-prev'>
        <img src={sample} width="40%" height="90%" className='tech-img' />
        
        {item.order_type=="R"&&
        <div className='prev-data'>
        <h3> {item.header}</h3>
        <h4>{item.price} EGP</h4>
        <h4>{item.description}</h4> 
        <h2>{item.order_date}</h2>
        </div>
      }
      {
        item.order_type=="O"&&
        <div className='prev-data'>
        <h3> {item.header}</h3>
        <h4>{item.new_price} EGP</h4>
        <h4>{item.description}</h4> 
        <h2>{item.order_date}</h2>
        </div>
      }
        {
        item.order_type=="B"&&
        <div className='prev-data'>
        <h3> {item.header}</h3>
        <h4>{item.total_price} EGP</h4>
        <h4>{item.description}</h4> 
        <h2>{item.order_date}</h2>
        </div>
      }
      </div >
    ))}  
            
          </ReactSimplyCarousel>
        </div>
     
    
  
  )

}

export default PrevWorkCarousel
