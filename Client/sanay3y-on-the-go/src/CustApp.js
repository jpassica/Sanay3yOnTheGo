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
import Account from './CustView/Routes/Account'
import EditProfile from './CustView/Routes/EditProfile';

function CustApp() {

  const[technicians,setTechnicians]=useState([])
  const[services,setServices]=useState([])
  const[service,setService]=useState([])
  const[reviews,setReviews]=useState([])
  const[notifications,setNotifications]=useState([])
  const[bundles,setBundles]=useState([])
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
      const fetchBundles=async ()=>
      {
        const res=await fetch("http://localhost:5000/bundles")
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
             const getBundles=async()=>
             {
              const getBundlesFromServer=await fetchBundles()
              setBundles(getBundlesFromServer)
             }
    getTechs()
    getServices()
    getOrders()
    getReviews()
    getNotifications()
    getBundles()
      },[])
      
const sampleCust={
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '123-456-7890',
  area: 'City Center',
};


const editcust = async(id,newcust) =>{


  const res = await fetch(`http://localhost:5000/techs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    //body: JSON.stringify(updtech),
  })

  const data = await res.json()

 
}

          
      
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
        <Route path="/bundles" element={<Bundles bundles={bundles}/>} />
        <Route path="/feedback" element={<Feedback/>} />
        <Route path="/notifications" element={<Notifications notifications={notifications}/>} />
        <Route path="/account" element={<Account customer={sampleCust}/>} />
        <Route path="/editprofile" element={<EditProfile customer={sampleCust} editcust={editcust} />} />

      </Routes>
    </BrowserRouter>
      </>

  );
}

export default CustApp;
