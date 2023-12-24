import React, { useState } from 'react';
import techimg from './TechView/img/tech.png';
import axios from 'axios';



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');    
    const handleLogin = async () => {
      try {
        const response = await axios.post('http://localhost:3001/login', {
          email,
          password,
        });
    
        console.log(response.data);
      } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
      }
    };
    const ContainerStyle = {
        background: "#FFF",
        width: "1535px",
        height: "680px",
        display: "flex",
        flexDirection: "row",
    };
    
    const FirstContainerStyle = {
        background: "#FFDD61",
        width: "600px",
        height: "680px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
    };
    const SecondContainerStyle = {
        background: "#FFF",
        width: "801px",
        height: "680px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "50px",
    };
    const welcomeStyle ={
        color: "#FFF",
        fontFamily: "Inria Serif",
        fontSize: "28px",
        fontStyle: "italic",
        fontWeight: "700",
        lineHeight: "35px",
        letterSpacing: "2.8px"
    }; 
    const sanay3yStyle ={ 
        color: "#FFF",
        fontFamily: "Mrs Sheppards",
        fontSize: "36px",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "35px",
        letterSpacing: "4.16px",
    };
    const loginBtnStyle = {
        background: "#FFDD61",
        width: "200px",
        height: "50px",
        color: "#FFF",
        fontFamily: "Inria Serif",
        fontSize: "24px",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "35px",
        letterSpacing: "2.8px",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
    };

    const loginTextBoxStyle = {
        background: "#FFF",
        width: "500px",
        height: "50px",
        color: "#000",
        fontFamily: "Inria Serif",
        fontSize: "24px",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "35px",
        letterSpacing: "2.8px",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        margin: "10px",
        textAlign: "center",
    };

    return (
    
        <div style={ContainerStyle}>
            
            <div style={FirstContainerStyle}>
                <p style={welcomeStyle}>
                    Welcome to
                </p>
                    <img src={techimg} alt="img1" height={280} width={300} style={{opacity:"0.9", position:"absolute", top:"200px",left:"180px",background:'transparent'}}/>
                <p style={sanay3yStyle}>
                    Sanay3y On The Go!
                </p>
            </div>
            <form style={SecondContainerStyle}>
                <h1>
                Log In to Your Account
                </h1>
          <input type="text" required  value={email} onChange={(e) => setEmail(e.target.value)} style={loginTextBoxStyle} placeholder='Email Address or Phone Number' />
          <input type="password" required  value={password} onChange={(e) => setPassword(e.target.value)} style={loginTextBoxStyle} placeholder='Password' />
        <button type="button" onClick={handleLogin} style={loginBtnStyle}>
          Log In
                </button>
      </form>
        </div>
    );
}

export default Login;
