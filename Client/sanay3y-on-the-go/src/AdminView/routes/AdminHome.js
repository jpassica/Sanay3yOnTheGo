import React, { useEffect, useState } from 'react'
import '../styles/Home.css'
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';

import toolimg from '../../TechView/img/img1.png'
import techimg from '../../TechView/img/tech.png'
const AdminHome = () => {
  const { id } = useParams();
  const [feedbackCounter, setFeedbackCounter] = useState([]);    
  const [complaintCounter, setComplaintCounter] = useState();
  const navigate = useNavigate();  
const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/feedback');
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error('Error fetching feedbacks:', error.message);
      throw error;
    }
  };
  const fetchComplaints = async () => {
    try {
      const response = await axios.get('http://localhost:3001/complaint');
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error('Error fetching complaints:', error.message);
      throw error;
    }
  };
  useEffect(() => {
    let isMounted = true;

    const getFeedbacks = async () => {
      try {
        
        const getFeedbacksCount = await fetchFeedbacks();
    if (isMounted) {
      setFeedbackCounter(getFeedbacksCount.count);
    }
    } catch (error) {
        console.log(error);
    }
    };
    const getComplaints = async () => {
      try {
        const getComplaintsCount = await fetchComplaints();
    if (isMounted) {
      setComplaintCounter(getComplaintsCount.count);
    }
    } catch (error) {
        console.log(error);
    }
    };
    getFeedbacks();
    getComplaints();

    return () => {
    isMounted = false;
    };
}, []);
const checkFeedback = async () => {
  navigate(`/Feedbacks/${id}`);
  };

  const checkComplaint = async () => {
    navigate(`/Complaints/${id}`);
    };
  
  return (
    <div className='home-container'>
      <div className='home'>
        <div className='Welcome'>
            <h2>Welcome to</h2>
            <h1>Sany3y On The Go!</h1>
            <img src={toolimg} alt="img1" height="400px" width="100%" style={{opacity:"0.3", position:"absolute", top:"-200px",left:"270px",background:'transparent'}}/>
            <img src={techimg} alt="img1" height={280} width={300} style={{opacity:"0.9", position:"absolute", top:"-5px",left:"-430px",background:'transparent'}}/>
        </div>
        
      </div>
      <div>
      
        <div style={{ width: "1200px", height: "50px", margin:"30px 0px 20px 320px", display:"flex", flexDirection:"row" }}>
          <h2 ><span 
          style={{
              color: "#DB0606", textDecoration: "underline",
              fontSize: "48px", fontWeight: "bolder"
          }}
          >{feedbackCounter}</span>
            {" "} feedbacks need to be reviewed! </h2>
          <button  onClick={() => checkFeedback()} style={{margin:"10px 0px 0px 10px",width:"180px", height:"40px", background:"#DB0606", color:"white", fontSize: "16px", fontWeight: "bolder"}}>Review Now</button>
        </div>


      <div style={{ width: "1200px", height: "50px", margin:"30px 0px 20px 320px", display:"flex", flexDirection:"row" }}>
          <h2 ><span 
          style={{
              color: "#DB0606", textDecoration: "underline",
              fontSize: "48px", fontWeight: "bolder"
          }}
          >{complaintCounter}</span>
            {" "} complaints need to be reviewed! </h2>
          <button  onClick={() => checkComplaint()} style={{margin:"10px 0px 0px 10px",width:"180px", height:"40px", background:"#DB0606", color:"white", fontSize: "16px", fontWeight: "bolder"}}>Review Now</button>
        </div>

      </div>
    </div>
  )
}

export default AdminHome
