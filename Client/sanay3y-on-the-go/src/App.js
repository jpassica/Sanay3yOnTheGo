<<<<<<< Updated upstream
import logo from './logo.svg';
import './App.css';


import { BrowserRouter , Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBarCust from './CustView/components/NavBarCust';
import Home from './CustView/Routes/Home';
import TechDetails from './CustView/components/TechDetails';
import Orders from './CustView/Routes/Orders';

function App() {

  const[technicians,setTechnicians]=useState([])
  const[services,setServices]=useState([])
  const[service,setService]=useState([])
 
  const fetchTechnicians=async ()=>
  {
    const res=await fetch('http://localhost:5000/techs')
    const data=await res.json()
    console.log(data)
    return data
  }
  const fetchServices=async ()=>
  {
    const res=await fetch('http://localhost:5000/service_categories')
    const data=await res.json()
    console.log(data)
    return data
  }
  const fetchOrders=async ()=>
  {
    const res=await fetch('http://localhost:5000/services')
    const data=await res.json()
    console.log(data)
    return data
  }
  useEffect(()=>
    {
      const getTechs=async()=>{
    const getTechFromServer=await fetchTechnicians()
    setTechnicians(getTechFromServer)
     }
     const getServices=async()=>{
      const getServicesFromServer=await fetchServices()
      setServices(getServicesFromServer)
       }
       const getOrders=async()=>{
        const getOrdersFromServer=await fetchOrders()
        setService(getOrdersFromServer)
         }
    getTechs()
    getServices()
    getOrders()
      },[])
      
=======
import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';
>>>>>>> Stashed changes

const App = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const navStyle = {
    background: '#FFDD61',
    width: "1535px",
    height: "56px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };
  const switchPageStyle = {
    color: 'black',
    background: '#fff',
    width: "935px",
    height: "56px",
    margin: "0 0 0 600px",
    lineHeight: "56px",
  };
  
  return (
<<<<<<< Updated upstream
    <>
      <BrowserRouter>
      <NavBarCust />
      <Routes>
        <Route path="/" element={<Home techData={technicians} services={services}  />} />
        <Route path="/TechDetails/:id" element={<TechDetails technicians={technicians} />} />
        <Route path="/Orders" element={<Orders orders={service} />} />

      </Routes>
    </BrowserRouter>
      </>

=======
    <div className="App">
      {showLogin ? (
        <>
          <Login />
          <div style={navStyle}>
              <p style={switchPageStyle}>
              Don't have an account?{' '}
        
            <span onClick={toggleForm} style={{cursor: "pointer", textDecoration:'underline', fontWeight:'bold'}}>Switch to Sign Up</span>
              </p>
          </div>
        </>
      ) : (
        <>
          <SignUp />
            <div style={navStyle}>
              <p style={switchPageStyle}>
              Already have an account?{' '}
                <span onClick={toggleForm} style={{cursor: "pointer", textDecoration:'underline', fontWeight:'bold'}}>Switch to Login</span>
              </p>
            
          </div>
        </>
      )}
    </div>
>>>>>>> Stashed changes
  );
};

export default App;
