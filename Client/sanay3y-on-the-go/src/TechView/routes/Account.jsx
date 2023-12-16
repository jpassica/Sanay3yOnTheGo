import React, { useState } from 'react'
import {useEffect} from 'react'
import prosrc from '../img/profile.png'
import Rate from '../components/Rate'
import { Link,useMatch,useResolvedPath } from 'react-router-dom'

const Account = () => {

    
  return (
    <div>
       <div class="container container-fluid">
        <h2 class="mt-5 ml-5">My Account</h2>
        <div class="row justify-content-around mt-5 user-info">
            <div class="col-12 col-md-3">
                <figure class='avatar avatar-profile'>
                    <img class="rounded-circle img-fluid " src={prosrc} alt='' />
                    <Rate rating={3}/>
                </figure>
                
                <CustomLink to="/EditProfile"><a href="#" id="edit_profile" class="btn btn-primary btn-block my-5 probutton">
                    Edit Account Details
                </a></CustomLink>
            </div>
     
            <div class="col-12 col-md-5">
                 <h4>Full Name</h4>
                 <p></p>
     
                 <h4>Email Address</h4>
                 <p></p>

                 <h4>Phone Number</h4>
                 <p></p>

                 <h4>Service</h4>
                 <p></p>

                 <h4>Area</h4>
                 <p></p>

                 <a href="#" class="btn btn-danger btn-block mt-5 probutton">
                    Delete Account
                </a>

                <a href="#" class="btn btn-primary btn-block mt-3 probutton">
                    Sign Out
                </a>
            </div>
        </div>
    </div>
    </div>
  )
}

function CustomLink({to,children,...props})
{
    const topath=useResolvedPath(to)
    const isActive = useMatch({path: topath.pathname,end: true})
    return(
        <div className={isActive?"activate":""}>
            <Link to={to} {...props}>
                {children}
            </Link>

        </div>
    )

}

export default Account
