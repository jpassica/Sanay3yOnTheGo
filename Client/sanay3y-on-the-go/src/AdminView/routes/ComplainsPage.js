import React, { useEffect, useState } from 'react';
import '../styles/complaint.css';
import axios from 'axios';
import  { useParams } from 'react-router-dom';  
const ComplainsPage = () => {
    const {id} = useParams();
    const [Complains, setComplaints] = useState([]);
    
    const fetchComplaints = async () => {
        try {
          const response = await axios.get('http://localhost:3001/complaint/free');
          console.log(response.data);
          return response.data;
        } catch (error) {
          console.error('Error fetching complaints:', error.message);
          throw error;
        }
      };
    
      useEffect(() => {
        let isMounted = true;
    
        const getComplaints = async () => {
        try {
            const getComplaintsFromServer = await fetchComplaints();
        if (isMounted) {
            setComplaints(getComplaintsFromServer);
        }
        } catch (error) {
            console.log(error);
        }
        };
        getComplaints();
        return () => {
        isMounted = false;
        };
    }, []);
    
        const considerComplaint = async (complaint_id) => {
            try {
                const response = axios.patch('http://localhost:3001/complaint', {
                    complaint_id: complaint_id,
                    admin_id: id
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                console.log(response.data);
                const updatedComplaints = await fetchComplaints();
                setComplaints(updatedComplaints);
              } catch (error) {
                console.error('Error considering feedback:', error.message);
              }
          
        };
    
        return (<div className='complaint-container'>
                          {Complains.map((complaint) => (
                              <div className='complaint-data' key={complaint.id}>
                                  <h5><b>complaint id:</b>{complaint.complaint_id} </h5>
                                  <h6><b>customer: </b> {complaint.name} </h6>
                                  <h6><b>order type: </b> {complaint.type} </h6>
                                  <b>timestamp: </b> {
                                      new Date(complaint.complaint_timestamp).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })                                      
                                  }
                                  <textarea  readOnly value={complaint.content}>
                                  </textarea>
                                  <button className='consider-btn'
                                      onClick={() => considerComplaint(complaint.complaint_id)}
                                  >Consider</button>
                              </div>
                          ))}
        </div>
        );
    };
export default ComplainsPage;
