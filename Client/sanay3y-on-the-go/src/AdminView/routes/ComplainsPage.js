import React, { useEffect, useState } from 'react';
import '../styles/feedbacks.css';
import axios from 'axios';

const ComplainsPage = ({adminId}) => {
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
    
        const considerComplaint = (complaint_id) => {
            // try {
            //     const response = axios.post('http://localhost:3001/considerComplaint', {
            //         ComplainId: complaint_id,
            //         adminId: adminId
            //     }, {
            //         headers: {
            //             'Content-Type': 'application/x-www-form-urlencoded'
            //         }
            //     });
            //     console.log(response.data);
            // } catch (error) {
            //     console.error('Error fetching complaints:', error.message);
            //     throw error;
            // }
        };
    
        return (<div className='feedback-container'>
                          {Complains.map((complaint) => (
                              <div className='feedback-data' key={complaint.id}>
                                  <textarea  readOnly value={complaint.content}>
                                  </textarea>
                                  <button className='consider-btn' onClick={considerComplaint(complaint.complaint_id)}>Consider</button>
                              </div>
                          ))}
        </div>
        );
    };
export default ComplainsPage;
