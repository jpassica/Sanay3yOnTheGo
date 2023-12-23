import React from 'react'
import profile from '../img/admin.jpg'
import { Link,useMatch,useResolvedPath } from 'react-router-dom'

const adminAccount = ({admin}) => {
return (
<div>
            <div class="row justify-content-around mt-5 user-info">

    <div class="col-12 col-md-3">
    <figure class='avatar avatar-profile'>
                <img class="rounded-circle img-fluid " src={profile} alt='admin photo' />
            </figure>
            <PageLink to="/EditAdminProfile"><a href="#" id="edit_profile" class="btn btn-primary btn-block my-5 probutton">
                Edit Account Details
            </a></PageLink>
        
            </div>
<div class="col-12 col-md-5">
            <h4>Full Name</h4>
            <p>{admin.name}</p>

            <h4>Email Address</h4>
            <p>{admin.email}</p>

            <h4>Phone Number</h4>
            <p>{admin.phone}</p>

            <h4>Area</h4>
                <p>{admin.area}</p>
                
            <a href="#" class="btn btn-primary btn-block mt-3 probutton">
                Sign Out
            </a>
        </div>
    </div>

</div>

)
}

function PageLink({to,pages,...props})
{
const topath=useResolvedPath(to)
const isActive = useMatch({path: topath.pathname,end: true})
return(
    <div className={isActive?"activate":""}>
        <Link to={to} {...props}>
            {pages}
        </Link>

    </div>
)

}

export default adminAccount
