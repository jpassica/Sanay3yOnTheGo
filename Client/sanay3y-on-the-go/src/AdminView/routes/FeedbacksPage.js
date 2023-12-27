import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/feedbacks.css';
const FeedbacksPage = ({adminID}) => {
    const [feedbacks, setFeedbacks] = useState([]);
    
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

  useEffect(() => {
    let isMounted = true;

    const getFeedbacks = async () => {
    try {
        const getFeedbacksFromServer = await fetchFeedbacks();
    if (isMounted) {
        setFeedbacks(getFeedbacksFromServer);
    }
    } catch (error) {
        console.log(error);
    }
    };
    getFeedbacks();
    return () => {
    isMounted = false;
    };
}, []);

    const considerFeedback = (feedback_id) => {
        // try {
        //     const response = axios.post('http://localhost:3001/considerFeedback', {
        //         feedbackId: feedback_id,
        //         adminId: adminID
        //     }, {
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded'
        //         }
        //     });
        //     console.log(response.data);
        // } catch (error) {
        //     console.error('Error fetching feedbacks:', error.message);
        //     throw error;
        // }
    };

    return (<div className='feedback-container'>
                      {feedbacks.map((feedback) => (
                          <div className='feedback-data' key={feedback.id}>
                              <h5>{feedback.feedback_id}</h5>
                              <textarea  readOnly value={feedback.content}>
                              </textarea>
                              <button className='consider-btn' onClick={considerFeedback(feedback.feedback_id)}>Consider</button>
                          </div>
                      ))}
    </div>
    );
};

export default FeedbacksPage;
