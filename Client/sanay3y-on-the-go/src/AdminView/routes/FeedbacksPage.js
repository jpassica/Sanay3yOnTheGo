import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FeedbacksPage = ({adminId}) => {
    const [feedbacks, setFeedbacks] = useState([]);
    const Navigate = useNavigate();

    const fetchFeedbacks = async () => {
        try {
            alert(feedbacks);
            alert("feedbacks");
     
            const response = await axios.get('http://localhost:3001/feedbacks');
            return response.data;

        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    useEffect(() => {
        let isMounted = true;
    
        const getFeedbacks = async () => {
        try {
            const getServicesFromServer = await fetchFeedbacks();
        if (isMounted) {
            
        alert(feedbacks);
        alert("feedbacks");
            setFeedbacks(getServicesFromServer);
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

    const handleCardClick = (feedback) => {
        // Navigate to review feedback page
        Navigate(`/review-feedback/${feedback}`); // Replace with your review feedback page route
    };

    return (
        <>
        <h1>
            hi
        </h1>
        <div>
            {
            feedbacks.map((feedback) => (
                <div key={feedback.id} onClick={() => handleCardClick(feedback.feedback_id)}>
                    <h3>Feedback ID: {feedback.feedback_id}</h3>
                    <p>Content: {feedback.content}</p>
                    <p>Timestamp: {feedback.feedback_timestamp}</p>
                </div>
            ))}
        </div>
        </>
    );
};

export default FeedbacksPage;
