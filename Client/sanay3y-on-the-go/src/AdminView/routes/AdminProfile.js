import React,  { useState, useEffect} from 'react'
import prosrc from '../../TechView/img/tech.png'
import { Link,useMatch,useResolvedPath } from 'react-router-dom'
import axios from 'axios';

const AdminProfile = ({ adminId }) => {
    const [admin, setAdmin] = useState({});
    const fetchAdmin = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/client/${adminId}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching admin:', error.message);
            throw error;
        }
    };


    
  useEffect(() => {
    let isMounted = true;

    const getAdmin = async () => {
    try {
        const getAdminFromServer = await fetchAdmin();
    if (isMounted) {
        setAdmin(getAdminFromServer);
    }
    } catch (error) {
        console.log(error);
    }
    };

    getAdmin();
    return () => {
      isMounted = false;
    };
  }, []);

return (
    <div>
                <div class="row justify-content-around mt-5 user-info">

        <div class="col-12 col-md-3">
        <figure class='avatar avatar-profile'>
                    <img class="rounded-circle img-fluid " src={prosrc} alt='' />
                </figure>
                <CustomLink to="/EditProfile"><a href="#" id="edit_profile" class="btn btn-primary btn-block my-5 probutton">
                    Edit Account Details
                </a></CustomLink>
              
                </div>
      <div class="col-12 col-md-5 details">
                 <h4>Full Name</h4>
                 <p>{admin.fullName}</p>
     
                 <h4>Email Address</h4>
                 <p>{admin.email}</p>

                 <h4>Phone Number</h4>
                 <p>{admin.phone}</p>


                 <h4>Address</h4>
                 <p>{admin.address}</p>
                    
                 <h4>Gender</h4>
                 <p>{admin.gender}</p>

                <a href="#" class="btn btn-primary btn-block mt-3 probutton">
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

export default AdminProfile
