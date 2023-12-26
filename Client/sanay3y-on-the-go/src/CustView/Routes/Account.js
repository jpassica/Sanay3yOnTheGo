import React, { useState } from 'react'
import {useEffect} from 'react'

import '../../TechView/styles/account.css'
import AccountDetails from '../components/AccountDetails'


const Account = ({customer}) => {

  const[filter,setFilter]=useState(true)

    
  return (
    <div>
       <div class="acccontainer container-fluid">
        <h2 class="mt-5 ml-5" style={{textAlign:'left'}}>My Account</h2>
        <AccountDetails  customer={customer} />
    </div>
    </div>
  )
}



export default Account
