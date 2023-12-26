import React, { useState } from 'react';
import techimg from './TechView/img/tech.png';
import axios from 'axios';
import './styles/login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');    
    const handleLogin = async () => {
      try {
        const response = await axios.post('http://localhost:3001/SignIn', {
          email: email,
          password: password,
        }, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    
        console.log(response.data);
      } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
      }
      if (!email.includes('@')) {
        alert('Please enter a valid email');
        return;
    }
    if (password.length < 8) {
        alert('Password must be at least 8 characters');
        return;
    }

      try {
        const response = await axios.post('http://localhost:5000/Login', {
            email: email,
            password: password,
            }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log(response.data);
        } catch (error) {
          console.error('SignUp error:', error.response ? error.response.data : error.message);
        }
        };
    return (
    
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
    );
}

export default Login;
