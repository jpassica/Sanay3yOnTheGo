import React,  { useState, useEffect} from 'react'
import prosrc from '../../AdminView/img/profile.png'
import { Link,useMatch,useResolvedPath } from 'react-router-dom'
import '../styles/adminAccount.css'
import axios from 'axios';

const AdminProfile = ({ adminId }) => {
    const [admin, setAdmin] = useState({});
    const fetchAdmin = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/adminData/${adminId}`);
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

    const handleSignOut = () => {
        window.location.href = '/#';
    }
return (
                <div class="accont-container">

        <div class="profile-picture">
        <figure class='avatar avatar-profile'>
                    <img class="rounded-circle img-fluid " src={prosrc} alt='' width={300} />
                </figure>
                <CustomLink to="/EditProfile"><a href="#" id="edit_profile" class='btn btn-primary btn-block mt-3 probutton'>
                    Edit Details
                </a></CustomLink>
              
                </div>
      <div class="containers">
                 <h4>Full Name:</h4>
                 <p>{admin.fullname}</p>
     
                 <h4>Email Address:</h4>
                 <p>{admin.email}</p>

                 <h4>Phone Number:</h4>
                 <p>{admin.phone}</p>


                 <h4>Address:</h4>
                 <p>{admin.address}</p>
                    
                <a class="btn btn-primary btn-block mt-3 probutton" onClick={handleSignOut}>
                    Sign Out
                </a>
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
