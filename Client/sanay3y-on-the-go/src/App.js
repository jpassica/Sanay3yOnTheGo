import logo from './logo.svg';
import './App.css';


import { BrowserRouter , Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBarCust from './CustView/components/NavBarCust';
import Home from './CustView/Routes/Home';
import TechDetails from './CustView/Routes/TechDetails';
import Orders from './CustView/Routes/Orders';
import ReviewOrder from './CustView/Routes/ReviewOrder';
import CancelOrder from './CustView/Routes/CancelOrder';
import Wallet from './CustView/Routes/Wallet';
import Bundles from './CustView/Routes/Bundles';
import Feedback from './CustView/Routes/Feedback';
import Notifications from './CustView/Routes/Notifications';
function App() {

  const[technicians,setTechnicians]=useState([])
  const[services,setServices]=useState([])
  const[service,setService]=useState([])
  const[reviews,setReviews]=useState([])
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
  const fetchReviews=async ()=>
      {
        const res=await fetch("http://localhost:5000/reviews")
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
         const getReviews=async()=>{
          const getReviewsFromServer=await fetchReviews()
          setReviews(getReviewsFromServer)
          
         
           }
    getTechs()
    getServices()
    getOrders()
    getReviews()
      },[])
      



  

          
      
  return (
    <>
      <BrowserRouter>
      <NavBarCust />
      <Routes>
        <Route path="/" element={<Home techData={technicians} services={services} reviews={reviews} />} />
        <Route path="/TechDetails/:id" element={<TechDetails technicians={technicians} reviews={reviews} />} />
        <Route path="/Orders" element={<Orders orders={service} />} />
        <Route path="/ReviewOrder/:id" element={<ReviewOrder orders={service} reviews={reviews} />} />
        <Route path="/CancelOrder/:id" element={<CancelOrder />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/bundles" element={<Bundles/>} />
        <Route path="/feedback" element={<Feedback/>} />
        <Route path="/notifications" element={<Notifications/>} />

      </Routes>
    </BrowserRouter>
      </>

  );
}

export default App;
