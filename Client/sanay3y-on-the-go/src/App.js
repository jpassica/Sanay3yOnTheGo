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
      



  

          
      
  return (
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

  );
}

export default App;
