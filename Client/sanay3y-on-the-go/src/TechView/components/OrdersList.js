import React, { useState } from 'react'
import ReactSimplyCarousel from 'react-simply-carousel';

const OrdersList = ({orders,filter}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <div>
      <ReactSimplyCarousel className="review-container"
            activeSlideIndex={activeSlideIndex}
            onRequestChange={setActiveSlideIndex}
            itemsToShow={3}
            itemsToScroll={3}
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
                margin: 30 ,
                
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
                margin: 30 ,
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
            
            {orders.filter(order=>order.status==filter).map((order,index)=>(
      <div key={index} className='review-card'>
        <h4>{order.details}</h4> 
         <h4>{order.price}</h4>
      </div >
    ))}  
            
          </ReactSimplyCarousel>
    </div>
  )
}

export default OrdersList
