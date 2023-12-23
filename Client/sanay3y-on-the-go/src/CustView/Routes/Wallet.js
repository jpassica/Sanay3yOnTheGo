import React from 'react'
import '../styles/wallet.css'
import lock from '../images/padlock.png'

const Wallet = () => {
  return (
    <div className='wallet-container'>
        <div className='points-container'>
            <div>
              <h3>  your current points</h3>
            <div className='points'>
                10,000
            </div>
            </div>
        </div>
        <div className='all-rewards'>
            <div className='reward-container'>
            <div className='reward-item'>
                   <h5> 40,000</h5>
                    <svg xmlns="http://www.w3.org/2000/svg" width="59" height="54" viewBox="0 0 59 54" fill="none">
                    <ellipse cx="29.5" cy="27" rx="29.5" ry="27" fill="#F4C002"/>
                    <text x="4" y="30" fill="white">20%off</text>
                    </svg>
                </div>
                <div className='reward-item'>
                   <h5> 20,000</h5>
                    <svg xmlns="http://www.w3.org/2000/svg" width="59" height="54" viewBox="0 0 59 54" fill="none">
                    <ellipse cx="29.5" cy="27" rx="29.5" ry="27" fill="#F4C002"/>
                    <text x="4" y="30" fill="white">10%off</text>
                    </svg>
                </div>
                
                <div className='reward-item'>
                   <h5> 20,000</h5>
                   <div className='locked'>
                    <img src={lock} width="30px" />
                   </div>


                </div>
    
            </div>
        </div>
      
    </div>
  )
}

export default Wallet
