<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import techimg from './TechView/img/tech.png';
import custimg from './img/customerIconSignUp.png';
import toolimg from './img/technicianIconSignUp.png';
<<<<<<< Updated upstream

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [isTech, setisTech] = useState(false);
  const [services, setServices] = useState([]);
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:3001/services');
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
        // Handle the error
      }
    };

    getServices();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleTech = () => {
    setType('t');
    setisTech(!isTech);
  };

  const handleServiceChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:3001/SignUp',{
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
                        
                        <div style={typeContaionerStyle} onClick={ handleTech}>
                        Technician
                        <img src={toolimg} alt="img1" height={35} width={50} style={{opacity:"0.9", position:"absolute",  top:"495px",left:"1050px",background:'transparent'}}/>
                        </div>
                    </div>
                    
              </>
              {isTech && (
        <div>
          <label htmlFor="service">Service:</label>
          <select id="service" value={category} onChange={handleServiceChange}>
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
              )}
                <button type="button" onClick={handleSignUp} style={SignUpBtnStyle}>
                Sign Up
                </button>
      
              </form>
    </div>
  );
=======
import './styles/signUp.css';

const SignUp = ({ onSignUpSuccess }) => {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [type, setType] = useState('');
const [category, setCategory] = useState('');
const [isTech, setisTech] = useState(false);
const [services, setServices] = useState([]);
const [address, setAddress] = useState('');
const [password, setPassword] = useState('');
const [divTechColor, setTechDivColor] = useState('#FBF7E5'); 
const [divCustColor, setCustDivColor] = useState('#FBF7E5'); 


const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/services');
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

const handleTech = () => {
    if (!isTech) {
    
        setTechDivColor('#FFDD61');
    }
    else {
        setTechDivColor('#FBF7E5');
    }
setCustDivColor('#FBF7E5');
setType('t');
setisTech(!isTech);
};

const handleCust = () => {
    setCustDivColor('#FFDD61');
    setisTech(false);
    const newColor = divCustColor === '#FFDD61' ? '#FBF7E5' : '#FFDD61';
    setCustDivColor(newColor);
    setTechDivColor('#FBF7E5');
    setType('c');
};



const handleServiceChange = (event) => {
setCategory(event.target.value);
};

    const handleSignUp = async () => {
        if (!name || !email || !phone || !address || !password) { 
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
    const response = await axios.post('http://localhost:5000/SignUp',{
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
    onSignUpSuccess();
} catch (error) {
    
    console.error('SignUp error:', error.response ? error.response.data : error.message);
}
};



return (
<div className="ContainerStyle">
<div className="FirstContainerStyle">
    <p className="welcomeStyle">Welcome to</p>
    <img
                src={techimg}
                className="techimg"
    alt="img1"
    />
    <p className="sanay3yStyle">Sanay3y On The Go!</p>
</div>
<form className="SecondContainerStyle">
    <h1>Sign UP to Your Account</h1>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                className="SignUpTextBoxStyle" placeholder="Full Name" />
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                className="SignUpTextBoxStyle" placeholder="Email " />
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                className="SignUpTextBoxStyle" placeholder="Address" />
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}
                className="SignUpTextBoxStyle" placeholder="Phone Number" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="SignUpTextBoxStyle" placeholder="Password" />
    <h5 align={'center'}>Are you?</h5>
    <div className="typedivsContainer" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '600px', marginBottom: '0px' }}>
        <div className="typeContaionerStyle" style={{background:divCustColor}} onClick={handleCust}>
        <img src={custimg} alt="img1" className='typecustimg'/>
        Customer
    </div>
        <div className="typeContaionerStyle"  style={{background:divTechColor}} onClick={handleTech}>
        <img src={toolimg} alt="img1" className='typetechimg'/>
        Technician
        </div>
    </div>
    {isTech && (
    <div className='serviceDiv'>
        <select id="service" value={category} onChange={handleServiceChange}>
        <option value="">Select a service</option>
        {services.map((service) => (
            <option key={service.id} value={service.name}>
            {service.name}
            </option>
        ))}
        </select>
    </div>
    )}
    <button type="button" onClick={handleSignUp} className="SignUpBtnStyle">
    Sign Up
    </button>
</form>
</div>
);
>>>>>>> Stashed changes
};

export default SignUp;