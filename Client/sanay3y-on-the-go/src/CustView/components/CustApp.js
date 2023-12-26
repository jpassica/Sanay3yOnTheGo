

import { BrowserRouter , Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBarCust from './NavBarCust';
import Home from '../Routes/Home';
import TechDetails from '../Routes/TechDetails';
import Orders from '../Routes/Orders';
import ReviewOrder from '../Routes/ReviewOrder';
import CancelOrder from '../Routes/CancelOrder';
import Wallet from '../Routes/Wallet';
import Bundles from '../Routes/Bundles';
import Feedback from '../Routes/Feedback';
import Notifications from '../Routes/Notifications';
function CustApp() {

  const[technicians,setTechnicians]=useState([])
  const[services,setServices]=useState([])
  const[service,setService]=useState([])
  const[reviews,setReviews]=useState([])
  const[notifications,setNotifications]=useState([])
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
      const fetchNotifications=async ()=>
      {
        const res=await fetch("http://localhost:5000/notifications")
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
           const getNotifications=async()=>{
            const getNotificationsFromServer=await fetchNotifications()
            setNotifications(getNotificationsFromServer)
            
           
             }
    getTechs()
    getServices()
    getOrders()
    getReviews()
    getNotifications()
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
        <Route path="/notifications" element={<Notifications notifications={notifications}/>} />

      </Routes>
    </BrowserRouter>
      </>

  );
}

export default CustApp;
