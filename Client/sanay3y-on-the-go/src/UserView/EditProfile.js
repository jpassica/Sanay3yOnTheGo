import React,  { useState, useEffect} from 'react'
import prosrc from '../AdminView/img/profile.png'
import './styles/editProfile.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditProfile = () => {

  const { id } = useParams();
  const [user,setUser]=useState('')
  const [name,setName]=useState('')
  const [phone_number,setPhone_number]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [address, setAddress] = useState('')
  const [service, setService] = useState('')
  const [services, setServices] = useState([]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/user/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error.message);
      throw error;
    }
  };

  
const fetchServices = async () => {
  try {
    const response = await axios.get('http://localhost:3001/service');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error.message);
    throw error;
  }
};

useEffect(() => {
  let isMounted = true;

  const getServices = async () => {
  try {
      const getServicesFromServer = await fetchServices();
  if (isMounted) {
      setServices(getServicesFromServer);
  }
  } catch (error) {
      console.log(error);
  }
  };

  getServices();

  return () => {
    isMounted = false;
  };
}, []);

    const handleEdit =async (e)  => {
        e.preventDefault()
    
        if (email&&!email.includes('@')) {
                alert('Please enter a valid email');
                return;
            }
            if (password&&password.length < 8) {
                alert('Password must be at least 8 characters');
                return;
            }
        if (phone_number&&phone_number.length !== 11) {
                alert('Please enter a valid phone number');
                return;
            }
      if (name) {
        let integerValue = parseInt(name, 10);
        if (!isNaN(integerValue)) {
          alert("name can't be a number");
          return;
        }
      }
      if (address) {
        let integerValue = parseInt(address, 10);
        if (!isNaN(integerValue)) {
          alert("address can't be a number");
          return;
        }
      }
      if (phone_number) {
        let integerValue = parseInt(phone_number, 11);
        if (isNaN(integerValue)) {
          alert("phone must be a number");
          return;
        }
      }
      if (email) {
        let integerValue = parseInt(email, 11);
        if (!isNaN(integerValue)) {
          alert("can't must be a number");
          return;
        }
      }
      if (user.type=='t' && !service) {
        alert('Please select a service');
        return;
      }
      try {
        const response = await axios.patch(`http://localhost:3001/user/${id}`,{
    email: email,
    password: password,
    fullname: name,
    phone_number: phone_number,
          address: address,
          service: service
    }, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});
    console.log(response.data);
    alert('Changes saved successfully.')
    setName('')
    setPhone_number('')
    setEmail('')
    setAddress('')
    setPassword('')
        service && setService('')
    window.location.reload();
        
} catch (error) {
    
    console.error('Edit error:', error.response ? error.response.data : error.message);
        }
    }
    

  const handleReturnHome=()=>{
    window.location.href = `/Account/${id}`;
  }

  const handleServiceChange = (e) => {
    setService(e.target.value);
  }

  return (
    <div className='edit-page'>
    <form className="edit-container">
      <div className='edit-labels'>
        <div>
       Name:  {'    '}
        </div>
      <div>
        Email: {'   '}
      </div>
      <div>
        Address: {'  '}
      </div>
      <div>
        Phone: {' '}
      </div>
      <div>
        Password: {' '}
      </div>
      
        {user.type == 't' && (
          <div>
            Service: {' '}
          </div>
        )}
      </div>
      
      <div className='edit-cells'>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                className="text-box-sign-up edit" placeholder={user.fullname} />
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                className="text-box-sign-up edit" placeholder={user.email} />
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                className="text-box-sign-up edit"  />
        <input type="text" value={phone_number} onChange={(e) => setPhone_number(e.target.value)}
          className="text-box-sign-up edit"  />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="text-box-sign-up edit" />
        
{user.type=='t' && (
      <select id="service" value={service} onChange={handleServiceChange}>
        <option value="">Select a service</option>
        {services.map((service) => (
            <option key={service.id} value={service.name}>
            {service.name}
            </option>
        ))}
        </select>
        )}
        

      </div>
      
      </form>
      <div style={{display:"flex", flexDirection:"col", gap:'30px' }}>
      <button type="button" onClick={handleEdit} className="buttona">
    Edit
    </button>
    <button type="button" onClick={handleReturnHome} className="buttona">
    Return
    </button>
      </div>
    
    </div>
      )
}

export default EditProfile
