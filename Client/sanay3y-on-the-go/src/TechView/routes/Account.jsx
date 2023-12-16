import React, { useState } from 'react'
import {useEffect} from 'react'
import prosrc from './img/profile.png'

import '../TechComponents/styles/home.css'
import '../TechComponents/styles/account.css'
import AccountDetails from '../TechComponents/AccountDetails'


const Account = ({techs}) => {

  const[filter,setFilter]=useState(true)
    
  return (
    <div>
       <div class="acccontainer container-fluid">
        <h2 class="mt-5 ml-5">My Account</h2>
            {techs.filter(tech => tech.logged==filter).map((tech,index)=>(
            <AccountDetails key={index} tech={tech} />
            ))} 
    </div>
    </div>
  )
}



export default Account
