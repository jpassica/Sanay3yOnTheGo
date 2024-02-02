import React, { useState } from 'react';
import axios from 'axios';
import './styles/signUp.css';
import techimg from '../TechView/img/tech.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  
  const handleLogin = async () => {
    if (!email.includes('@')) {
      alert('Please enter a valid email');
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/user/SignIn', {
        email: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      const userData = response.data;
      if(!userData[0])
      {
        alert("enter valid email and password")
        return
      }
      console.log("login ta2reban")
      if(userData[0].type === 'a')
        navigate(`/AdminHome/${userData[0].client_id}`);
      
        else if(userData[0].type === 'c')
        {
        console.log(userData)
        navigate(`/CustomerHome/${userData[0].client_id}`);
        }
      
       else if(userData[0].type === 't')
        navigate(`/TechnicianHome/${userData[0].client_id}`);

    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      alert('Login failed. Please check email and password and try again.');
    }
  };
  
  const toggleForm = () => {
    navigate('/SignUp');
  }
    return (
        <div className='container-sign-up'>
            
            <div className="first-container-sign-up">
    <p className="welcome-sign-up">Welcome to</p>
    <img
                src={techimg}
                className="tech-img-sign-up"
    alt="img1"
    />
    <p className="sanay3y-sign-up">Sanay3y On The Go!</p>
</div>
            <form className='second-container-sign-up'>
                <h1>
                Log In to Your Account
                </h1>
          <input type="text" required  value={email} onChange={(e) => setEmail(e.target.value)} className='text-box-sign-up' placeholder='Email' />
          <input type="password" required  value={password} onChange={(e) => setPassword(e.target.value)} className='text-box-sign-up' placeholder='Password' />
        <button type="button" onClick={handleLogin} className='btn-sign-up'>
          Log In
            </button>
            <p className='switch-page-sign-up'>
        Don’t have an account?  {' '}
         <span onClick={toggleForm} style={{ cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }}>
         Sign Up
         </span>
       </p>

      </form>
      </div>
    );
}

export default Login;
