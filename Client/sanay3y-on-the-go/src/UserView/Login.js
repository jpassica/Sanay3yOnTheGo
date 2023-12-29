import React, { useState } from 'react';
import axios from 'axios';
import './styles/login.css';
import techimg from '../TechView/img/tech.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  
  const handleLogin = async () => {
    // Input validation
    if (!email.includes('@')) {
      alert('Please enter a valid email');
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }

    try {
      // Make the login API call
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
    <>
        <div className='ContainerStyle'>
            
            <div className="FirstContainerStyle">
    <p className="welcomeStyle">Welcome to</p>
    <img
                src={techimg}
                className="techimg"
    alt="img1"
    />
    <p className="sanay3yStyle">Sanay3y On The Go!</p>
</div>
            <form className='SecondContainerStyle'>
                <h1>
                Log In to Your Account
                </h1>
          <input type="text" required  value={email} onChange={(e) => setEmail(e.target.value)} className='loginTextBoxStyle' placeholder='Email' />
          <input type="password" required  value={password} onChange={(e) => setPassword(e.target.value)} className='loginTextBoxStyle' placeholder='Password' />
        <button type="button" onClick={handleLogin} className='loginBtnStyle'>
          Log In
                </button>
      </form>
      </div>
       <div className='navStyle'>
       <p className='switchPageStyle'>
        Don’t have an account yet?  {' '}
         <span onClick={toggleForm} style={{ cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }}>
         Sign Up
         </span>
       </p>
        </div>
        </>
    );
}

export default Login;
