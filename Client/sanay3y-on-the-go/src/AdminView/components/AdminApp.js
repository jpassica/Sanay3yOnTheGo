import { BrowserRouter , Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBarAdmin from './NavBarAdmin';
import axios from 'axios';
import Home from '../routes/Home';
import FeedbacksPage from '../routes/FeedbacksPage';
import TechniciansPage from '../routes/TechniciansPage';
import CreateBundle from '../routes/CreateBundle';
import AdminProfile from '../routes/AdminProfile'
import EditProfile from '../routes/EditProfile'
import ComplainsPage from '../routes/ComplainsPage'

function AdminApp({id}) {
  const[technicians,setTechnicians]=useState([])
  const[complaints,setComplaints]=useState([])
  const[feedbacks,setFeedbacks]=useState([])
  
  const fetchComplaints = async () => {
    try {
      const response = await axios.get('http://localhost:3001/complaints');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching services:', error.message);
      throw error;
    }
  };
  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/feedbacks');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching feedbacks:', error.message);
      throw error;
    }
  };

  const fetchTechnicians = async () => {
    try {
      const response = await axios.get('http://localhost:3001/techs');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching Technicians:', error.message);
      throw error;
    }
  };

    
  useEffect(()=>
  {
    let isMounted = true;

    const getTechs=async()=>{
    const getTechFromServer=await fetchTechnicians()
    setTechnicians(getTechFromServer)
    }
    const getComplaints=async()=>{
    const getComplaintsFromServer=await fetchComplaints()
    setComplaints(getComplaintsFromServer)
    }
    const getFeedbacks=async()=>{
    const getFeedbacksFromServer=await fetchFeedbacks()
    setFeedbacks(getFeedbacksFromServer)
    }
    getTechs();
    getComplaints();
    getFeedbacks();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <BrowserRouter>
      <NavBarAdmin />
      <Routes>
        <Route exact path="/" element={<Home complaints={complaints} adminId={id} />} />
        <Route exact path="/Account" element={<AdminProfile adminId={id} />}/>
        <Route exact path="/Technicians" element={<TechniciansPage technicians={technicians} adminId={id}/>} />
        <Route exact path="/EditProfile" element={<EditProfile adminId={id} />} />
        <Route exact path="/CreateBundle" element={<CreateBundle adminId={id} />} />
        <Route exact path="/Feedbacks" element={<FeedbacksPage feedbacks={feedbacks} adminId={id}/>} />                  
        <Route exact path="/Complaints" element={<ComplainsPage complaints={complaints} adminId={id}/>} />                  
      </Routes>
    </BrowserRouter>
      </>

  );
}

export default AdminApp;
