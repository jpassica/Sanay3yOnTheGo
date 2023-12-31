import React from 'react'
import prosrc from '../img/profile.png'
import Rate from './Rate.js'
import { Link,useMatch,useResolvedPath } from 'react-router-dom'

const AccountDetails = ({tech}) => {
    console.log(tech)
    console.log(tech.name)
    const handleSignOut = () => {
        window.location.href = '/#';
    }
  return (
    <div>
                <div className="row justify-content-around mt-5 user-info">

        <div className="col-12 col-md-3">
        <figure className='avatar avatar-profile'>
                    <img className="rounded-circle img-fluid " src={prosrc} alt='' />
                    <Rate rating={tech.rating}/>
                </figure>
                <CustomLink to="/EditProfile"><a href="#" id="edit_profile" className=" btn-primary btn-block my-5 probutton">
                    Edit Account Details
                </a></CustomLink>
              
                </div>
      <div className="col-12 col-md-5 details">
                 <h4>Full Name</h4>
                 <p>{tech.fullname}</p>
     
                 <h4>Email Address</h4>
                 <p>{tech.email}</p>

                 <h4>Phone Number</h4>
                 <p>{tech.phone_number}</p>

                 <h4>Service</h4>
                 <p>{tech.name}</p>

                 <h4>Area</h4>
                 <p>{tech.address}</p>

                 <a href="#" className=" btn-danger btn-block mt-5 probutton">
                    Delete Account
                </a>

                <a href="#" className=" btn-primary btn-block mt-3 probutton" onClick={handleSignOut}>
                    Sign Out
                </a>
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

export default AccountDetails
