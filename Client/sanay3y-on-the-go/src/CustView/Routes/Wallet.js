import React from 'react'
import '../styles/wallet.css'
import lock from '../images/padlock.png'

const Wallet = ({Points,Point_System}) => {
  return (
    <div className='wallet-container'>
        <div className='points-container'>
            <div>
              <h3>  your current points</h3>
            <div className='points'>
                {Points}
            </div>
            </div>
        </div>
        <div className='all-rewards'>
            <div className='reward-container'>
              {Point_System.filter(p=>p.Req_points<=Points).map(p=>

            <div className='reward-item'>
                   <h5> {p.Req_points}</h5>
                    <svg xmlns="http://www.w3.org/2000/svg" width="59" height="54" viewBox="0 0 59 54" fill="none">
                    <ellipse cx="29.5" cy="27" rx="29.5" ry="27" fill="#F4C002"/>
                    <text x="4" y="30" fill="white">{p.percentage}%off</text>
                    </svg>
                </div>
              )
}
               
{Point_System.filter(p=>p.Req_points>Points).map(p=>
                <div className='reward-item'>
                   <h5> {p.Req_points}</h5>
                   <div className='locked'>
                    <img src={lock} width="30px" />
                   </div>


                </div> 
)}    
            </div>
        </div>
      
    </div>
  )
}

export default Wallet
