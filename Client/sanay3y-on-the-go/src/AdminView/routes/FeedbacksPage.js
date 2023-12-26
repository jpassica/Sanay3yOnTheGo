import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FeedbacksPage = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const Navigate = useNavigate();

    useEffect(() => {
        // Fetch feedbacks from the database
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/feedbacks');
                const data = await response.json();
                setFeedbacks(data);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
        };

        fetchFeedbacks();
    }, []);

    const handleCardClick = (feedbackId) => {
        // Navigate to review feedback page
        Navigate(`/review-feedback/${feedbackId}`); // Replace with your review feedback page route
    };

    return (
        <div>
            {feedbacks.map((feedback) => (
                <div key={feedback.id} onClick={() => handleCardClick(feedback.id)}>
                    <h3>Feedback ID: {feedback.id}</h3>
                    <p>Content: {feedback.content}</p>
                    <p>Timestamp: {feedback.timestamp}</p>
                </div>
            ))}
        </div>
    );
};

export default FeedbacksPage;
