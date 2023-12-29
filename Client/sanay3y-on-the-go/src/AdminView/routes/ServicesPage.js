import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/feedbacks.css';
const ServicesPage = () => {
    const [services, setServices] = useState([]);
    const [name, setName] = useState('');
    const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:3001/service');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching feedbacks:', error.message);
      throw error;
    }
  };

  useEffect(() => {
    let isMounted = true;

    const getServices = async () => {
    try {
        const getServicesFromServer = await fetchServices();
        if (isMounted) {
            const reversed = getServicesFromServer.reverse();
            setServices(reversed);
            
    }
    } catch (error) {
        console.log(error);
    }
    };
    getServices();
    return () => {
    isMounted = false;
    };
}, []);

    const editService = (service) => {
    try {
        const response = axios.patch('http://localhost:3001/service', {
            serviceName: service.name,
            service_id: service.service_id
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        
        console.log(response.data);
    } catch (error) {
        console.error('Error updating services:', error.message);
        throw error;    }
}
const addService = async () => { 
    try {
        const response = axios.post('http://localhost:3001/service', {
            service_name: name
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log(response.data);
        alert('Service added successfully');
        const updatedServices = await fetchServices();
        const reversed = updatedServices.reverse();
        setServices(reversed);            
        setName('');
        
    } catch (error) {
        console.error('Error adding services:', error.message);
        throw error;
    }
    
};
    
    const deleteService = async (serviceId) => {
  try {
    const response = await axios.delete(`http://localhost:3001/service/${serviceId}`);
    console.log(response.data); // Handle the response as needed
    alert('Service deleted successfully');
  } catch (error) {
    console.error('Error deleting service:', error.message);
    alert(`Error deleting service: ${error.message}`);
    throw error;
  }
};
    return (<div className='feedback-container'>
        
        <div className='feedback-data'>
            <input type='text' placeholder='Service Name' value={name} onChange={(e) => setName(e.target.value)} />
            <button className='consider-btn' onClick={() =>addService()}>Add</button>
        </div>

        {
             
            services.map((service) => (
        <div className='feedback-data' key={service.id}>
            <h5>{service.name}</h5>
            <div style={{display:"flex", flexDirection:"row", gap:"30px"}}>
            <button className='consider-btn' onClick={() =>editService(service.service_id)}>Edit</button>
            <button className='consider-btn' onClick={() =>deleteService(service.service_id)}>Delete</button>
            </div>
        </div>
    ))}
    </div>
    );
};

export default ServicesPage;
