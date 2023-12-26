import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ComplaintReview = ({adminId}) => {
    const [Complains, setComplaints] = useState([]);
    const Navigate = useNavigate();

    useEffect(() => {
        // Fetch feedbacks from the database
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('http://localhost:3001/complaints');
                //const data = await response.json();
                const data = response.data;
                setComplaints(data);
            } catch (error) {
                console.error('Error fetching complaints:', error);
            }
        };

        fetchFeedbacks();
    }, []);

    const handleCardClick = (complaint_id) => {
        // Navigate to review feedback page
        Navigate(`/review-complaint/${complaint_id}`); // Replace with your review feedback page route
    };

    return (
        <div>
            {Complains.map((Complain) => (
                <div key={Complain.complaint_id} onClick={() => handleCardClick(Complain.complaint_id)}>
                    <h3>Complain ID: {Complain.complaint_id}</h3>
                    <p>Content: {Complain.content}</p>
                    <p>Timestamp: {Complain.complaint_timestamp}</p>
                </div>
            ))}
        </div>
    );
};

export default ComplaintReview;
