import React from 'react'

const ComplaintForm = () => {
    const handleSubmit=()=>
    {
        alert("complaint sent successfully!")
    }
  return (
    <div className='item'>
        <form className='review-form'>
            <h2>Complaints</h2>
            
            <label>Any complaints?Tell us</label>
            <textarea />
        </form>
        <button onClick={handleSubmit} className='button-17' style={{margin:30,width:180}}>Submit Complaint</button>
      
    </div>

  )
}

export default ComplaintForm
