import React, { useState,useEffect } from 'react';
import techimg from './TechView/img/tech.png';
import custimg from './img/customerIconSignUp.png';
import  toolimg from './img/technicianIconSignUp.png';
import axios from 'axios';



const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [address, setAddress] = useState('');    
    const [password, setPassword] = useState('');    
    const handleSignUp = async () => {
        console.log(1);
      try {
        const response = await axios.post('http://localhost:3001/SignUp', {
          email,
            password,
            name,
            phone,
            type,
            address,
        });
        console.log(response.data);
      } catch (error) {
        console.error('SignUp error:', error.response ? error.response.data : error.message);
      }
    };
    const handleCategory = async () => {
        try {
          const response = await axios.post('http://localhost:3001/SignUp', {
            name,
              phone,
              email,
              password,
                type,
          });
      
          console.log(response.data);
        } catch (error) {
          console.error('SignUp error:', error.response ? error.response.data : error.message);
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
    const SignUpBtnStyle = {
        background: "#FFDD61",
        width: "200px",
        height: "60px",
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
    const SignUpTextBoxStyle = {
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
    };

    const typeContaionerStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "200px",
        marginBottom: "30px",
        background: "#FBF7E5",
        border: "none",
        borderRadius: "10px",
        height: "50px",
        cursor: "pointer",
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
                Sign UP to Your Account
                </h1>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={SignUpTextBoxStyle} placeholder='Full Name' />
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} style={SignUpTextBoxStyle} placeholder='Email ' />
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} style={SignUpTextBoxStyle} placeholder=' Address' />
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} style={SignUpTextBoxStyle} placeholder='Phone Number' />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={SignUpTextBoxStyle} placeholder='Password' />
                <>
                <h2>
                    Are you?
                </h2>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center",width:"600px", marginBottom:"30px" }}>
                        <div style={typeContaionerStyle} onClick={()=>setType("c")}>
                            Customer
                        <img src={custimg} alt="img1" height={31} width={31} style={{opacity:"0.9", position:"absolute", top:"495px",left:"770px",background:'transparent'}}/>

                        </div>
                        
                        <div style={typeContaionerStyle} onClick={ ()=> setType("t")}>
                        Technician
                        <img src={toolimg} alt="img1" height={35} width={50} style={{opacity:"0.9", position:"absolute",  top:"495px",left:"1050px",background:'transparent'}}/>
                        </div>
                </div>
                </>
                <button type="button" onClick={handleSignUp} style={SignUpBtnStyle}>
                Sign Up
                </button>
              </form>
        </div>
    );
}

export default SignUp;
