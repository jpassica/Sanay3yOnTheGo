import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/feedbacks.css';
import { useParams } from 'react-router-dom';
const FeedbacksPage = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const { id } = useParams();    
const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/feedback/free');
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
const considerFeedback = async (feedback_id) => {
    try {
      const response = await axios.patch(
        'http://localhost:3001/feedback',
        {
          feedbackId: feedback_id,
          adminId: id,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      console.log(response.data);

      // If you want to update the UI after considering the feedback, you can fetch updated feedbacks
      const updatedFeedbacks = await fetchFeedbacks();
      setFeedbacks(updatedFeedbacks);
    } catch (error) {
      console.error('Error considering feedback:', error.message);
    }
  };

  return (
    <div className='feedback-container'>
      {feedbacks.map((feedback) => (
        <div className='feedback-data' key={feedback.id}>
              <h5 align="center">
              <b>
              feedback number :
              </b>
            {feedback.feedback_id}</h5>
              <h6 align="center">
            <b>
              feedback date 
              </b>
              <br/>    {
                new Date(feedback.feedback_timestamp).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
              }</h6>
          <textarea readOnly value={feedback.content}></textarea>
          <button
            className='consider-btn'
            onClick={() => considerFeedback(feedback.feedback_id)} // Pass a function reference
          >
            Consider
          </button>
        </div>
      ))}
    </div>
  );
};

export default FeedbacksPage;