import logo from './logo.svg';
import './App.css';


import { BrowserRouter , Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBarCust from './CustView/components/NavBarCust';
import Home from './CustView/Routes/Home';
import TechDetails from './CustView/components/TechDetails';

function App() {

  const[technicians,setTechnicians]=useState([])
  const[services,setServices]=useState([])
 
  const fetchTechnicians=async ()=>
  {
    const res=await fetch('http://localhost:5000/techs')
    const data=await res.json()
    console.log(data)
    return data
  }
  const fetchServices=async ()=>
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
    getTechs()
    getServices()
      },[])
      



  

          
      
  return (
    <>
      <BrowserRouter>
      <NavBarCust />
      <Routes>
        <Route path="/" element={<Home techData={technicians} services={services}  />} />
        <Route path="/TechDetails/:id" element={<TechDetails technicians={technicians} />} />

      </Routes>
    </BrowserRouter>
      </>

  );
}

export default App;
