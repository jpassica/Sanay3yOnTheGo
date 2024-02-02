
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import techimg from '../TechView/img/tech.png';
import custimg from './img/customerIconSignUp.png';
import toolimg from './img/technicianIconSignUp.png';
import './styles/signUp.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
const navigate = useNavigate();
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [type, setType] = useState('');
const [category, setCategory] = useState('');
const [Tech, setTech] = useState(false);
const [services, setServices] = useState([]);
const [address, setAddress] = useState('');
const [password, setPassword] = useState('');
const [techClr, setTechClr] = useState('#FBF7E5'); 
const [customerClr, setCustomerClr] = useState('#FBF7E5'); 

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
}, []
);

const isTech = () => {
    if (!Tech) {
    
        setTechClr('#FFDD61');
    }
    else {
        setTechClr('#FBF7E5');
    }
    setCustomerClr('#FBF7E5');
    setType('t');
    setTech(!Tech);
};

const isCustomer = () => {
    const color = customerClr === '#FFDD61' ? '#FBF7E5' : '#FFDD61';
    setCustomerClr(color);
    setTech(false);
    setTechClr('#FBF7E5');
    if (color === '#FFDD61')
            setType('c');
        else
            setType('');
};



const handleServiceChange = (event) => {
    setCategory(event.target.value);
};

const handleSignUp = async () => {
        if (!name || !email || !phone || !address || !password|| !type) { 
            alert('All fields are required');
            return;
        }
        if (type === 't' && !category) {
            alert('Please select a service');
            return;
        }
        if (!email.includes('@')) {
                alert('Please enter a valid email');
                return;
            }
            if (password.length < 8) {
                alert('Password must be at least 8 characters');
                return;
            }
        if (phone.length !== 11) {
                alert('Please enter a valid phone number');
                return;
            }

        let integerValue = parseInt(name, 10);
        if (!isNaN(integerValue)) {
            alert("name can't be a number");
            return;
        }
        integerValue = parseInt(address, 10);
        if (!isNaN(integerValue)) {
            alert("address can't be a number");
            return;
        }
        integerValue = parseInt(phone, 11);
        if (isNaN(integerValue)) {
            alert("phone can't contain letters be a number");
            return;
        }
    try {
        const response = await axios.post('http://localhost:3001/user',{
        email: email,
        password: password,
        fullname: name,
        phone_number: phone,
        type: type,
        address: address,
        service: category
        }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
        console.log(response.data);
        navigate('/');
    } catch (error) {
        
        console.error('SignUp error:', error.response ? error.response.data : error.message);
    }
};

const toggleForm1 = () => {
    navigate('/');
}

return (
    <div className="container-sign-up">
        <div className="first-container-sign-up">
            <p className="welcome-sign-up">Welcome to</p>
            <img
                        src={techimg}
                        className="tech-img-sign-up"
            alt="img1"
            />
            <p className="sanay3y-sign-up">Sanay3y On The Go!</p>
        </div>
        <form className="second-container-sign-up">
            <h1>Sign up to your account</h1>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                        className="text-box-sign-up" placeholder="Full Name" />
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                        className="text-box-sign-up" placeholder="Email " />
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                        className="text-box-sign-up" placeholder="Address" />
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}
                        className="text-box-sign-up" placeholder="Phone Number" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        className="text-box-sign-up" placeholder="Password" />
            <h4 align={'center'}>Are you?</h4>
            <div className="type-div-container-sign-up" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '600px', marginBottom: '0px' }}>
                <div className="type-container-sign-up" style={{background:customerClr}} onClick={isCustomer}>
                <img src={custimg} alt="img1" className='customer-img type-img-sign-up'/>
                Customer
            </div>
                <div className="type-container-sign-up"  style={{background:techClr}} onClick={isTech}>
                <img src={toolimg} alt="img1" className='tech-img type-img-sign-up'/>
                Technician
                </div>
            </div>
            {Tech && (
            <div className='service-div'>
                <select id="service-name" value={category} onChange={handleServiceChange}>
                <option value="">Select a service</option>
                {services.map((service) => (
                    <option key={service.id} value={service.name}>
                    {service.name}
                    </option>
                ))}
                </select>
            </div>
            )}
            <button type="button" onClick={handleSignUp} className="btn-sign-up">
            Sign Up
            </button>
            <p className='switch-page-sign-up'>
            Already have an account?{' '}
            <span onClick={toggleForm1} className="under-lined-word-sign-up">
                Login
            </span>
            </p>

        </form>
    </div>
);
};

export default SignUp;