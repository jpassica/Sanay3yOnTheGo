import React,  { useState, useEffect} from 'react'
import prosrc from '../AdminView/img/profile.png'
import './styles/userProfile.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const userId = id;
    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/user/${userId}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error.message);
            throw error;
        }
    };


    
  useEffect(() => {
    let isMounted = true;

    const getUser = async () => {
    try {
        const getUserFromServer = await fetchUser();
    if (isMounted) {
        setUser(getUserFromServer);
    }
    } catch (error) {
        console.log(error);
    }
    };

    getUser();
    return () => {
      isMounted = false;
    };
  }, []);

    const handleSignOut = () => {
        window.location.href = '/';
    }

    
    const handleHome = () => {
        if(user.type === 'a')
            window.location.href = `/AdminHome/${userId}`;
        else if (user.type === 't')
            window.location.href = `/TechnicianHome/${userId}`;
        else if (user.type === 'c')
            window.location.href = `/CustomerHome/${userId}`;
    }

    const handleEdit = () => {
        navigate(`/EditProfile/${userId}`);
    }
return (

      <div class="containers">
                 <h4><b>Full Name:</b> {user.fullname}<hr/></h4>
                
                 <h4><b>Email Address:</b> {user.email}<hr/></h4>

                 <h4><b>Phone Number:</b> 0{user.phone_number}<hr/></h4>

                 <h4><b>Address:</b> {user.address}<hr/></h4>

            {user.type === 't' &&
                (<>
                    <h4><b>service: </b> {user.name}<hr/></h4>
                    <h4><b>rate: </b> {user.rating}<hr/></h4>
                </>
                )
            }   
            <div className='btn-container'>
                <button class="buttona" style={{color:'white'}} onClick={handleSignOut}>
                    Sign Out
                </button>
                <button class="buttona" style={{color:'white'}} onClick={handleHome}>
                    Home
                </button>
                
                <button onClick={handleEdit} id="edit_profile" class='buttona'>
                    Edit Details
                </button>
            </div>
            </div>

  )
}

export default UserProfile