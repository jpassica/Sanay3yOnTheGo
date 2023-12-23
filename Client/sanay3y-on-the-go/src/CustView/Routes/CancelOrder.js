import React from 'react'
import { useNavigate } from 'react-router-dom';
import ComplaintForm from '../components/ComplaintForm';
const CancelOrder = () => {
    const navigate = useNavigate();

    const handleSubmit = () => {
      // Logic for handling the form submission
  
      // After successful submission, navigate back to the previous page
      navigate(-1);
    };
  return (
    <div className='review-page'>
       <div className='item'>
        <div className='review-form'>
            <h2>Want to Cancel?</h2>
            <label>Tell us why</label>
            <textarea/>
            <button onClick={handleSubmit} className='button-17' style={{margin:30,width:150}}>Cancel order</button>
        </div>
        </div>
        
        <ComplaintForm />
        
    </div>
  )
}

export default CancelOrder
