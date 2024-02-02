
import React, { useState } from 'react';
import axios from 'axios';
import techimg from '../../TechView/img/tech.png';
import '../../UserView/styles/signUp.css';
const AddAdmin = () => {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [address, setAddress] = useState('');
const [password, setPassword] = useState('');
    const handleAddAdmin = async () => {
        if (!name || !email || !phone || !address || !password) { 
            alert('All fields are required');
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
    const response = await axios.post('http://localhost:3001/user/admin',{
    email: email,
    password: password,
    fullname: name,
    phone_number: phone,
    address: address,
    }, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});
    console.log(response.data);
    alert('Admin added successfully');
    window.location.reload();
} catch (error) {
    
    console.error('SignUp error:', error.response ? error.response.data : error.message);
}
};
    return (
    <>
<div className="container-sign-up"  style={{height:"675px"}}>
<div className="first-container-sign-up" style={{height:"675px"}}>
    <p className="welcome-sign-up">Let's add</p>
    <img
                src={techimg}
                className="tech-img-sign-up"
    alt="img1"
    />
    <p className="sanay3y-sign-up">admins</p>
</div>
<form className="second-container-sign-up "style={{height:"675px"}}>
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
    <button type="button" onClick={handleAddAdmin} className="btn-sign-up">
    AddAdmin
    </button>
</form>
    </div>
     </>
);
};

export default AddAdmin;