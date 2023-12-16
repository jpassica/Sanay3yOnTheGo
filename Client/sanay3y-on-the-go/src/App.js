import logo from './logo.svg';
import './App.css';


import { BrowserRouter , Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBarCust from './CustView/components/NavBarCust';
import Home from './CustView/Routes/Home';

function App() {

  const[technicians,setTechnicians]=useState([])
  const[services,setServices]=useState([])
  const fetchTechnicians=async ()=>
  {
    const res=await fetch('http://localhost:5000/technicians')
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
    getTechs()
      },[])
      console.log(technicians)


      const fetchServices=async ()=>
      {
        const res=await fetch('http://localhost:5000/services')
        const data=await res.json()
        console.log(data)
        return data
      }
      useEffect(()=>
        {
          const getServices=async()=>{
        const getServicesFromServer=await fetchServices()
        setServices(getServicesFromServer)
         }
        getServices()
          },[])
          console.log(services)
  return (
    <>
      <BrowserRouter>
      <NavBarCust />
      <Routes>
        <Route path="/" element={<Home techData={technicians} services={services} />} />
      </Routes>
    </BrowserRouter>
      </>

  );
}

export default App;
