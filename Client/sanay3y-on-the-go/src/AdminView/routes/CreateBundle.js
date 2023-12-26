import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CreateBundle.css';
const CreateBundle = ({ adminId }) => {
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [bundleName, setBundleName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [totalPrice, setTotalPrice] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/services')
            .then(response => {
                setServices(response.data);
            })
            .catch(error => {
                console.error('Error fetching services:', error);
            });
    }, []);
    const handleServiceSelect = (service_id) => {
        if (selectedServices.includes(service_id)) {
            setSelectedServices(selectedServices.filter(currentServiceId => currentServiceId !== service_id));
        } else {
            setSelectedServices([...selectedServices, service_id]);
        }
    };

    const handleCreateBundle = () => {
        
        if (!expiryDate || !bundleName || !totalPrice || services.length===0 ) { 
            alert('All fields are required');
            return;
        }

        let integerValue = parseInt(bundleName, 10);
        if (!isNaN(integerValue)) {
            alert("Bundle name can't be a number");
            return;
        }
        integerValue = parseInt(totalPrice, 10);
        if (isNaN(integerValue)) {
            alert("Total Price can't be a number");
            return;
        }
        const bundleData = {
            name: bundleName,
            services: selectedServices,
            total_price: totalPrice,
            servicesCount: selectedServices.length,
            expiryDate: expiryDate,
            creatorId:adminId,
        };
        axios.post('http://localhost:5000/CreateBundle', bundleData)
            .then(response => {
                console.log('Bundle created successfully:', response.data);
                alert('Bundle created successfully');
                window.location.reload();
            })
            .catch(error => {
                console.error('Error creating bundle:', error);
            });
    };


    return (
        <div className='bundlePageContainer'>
            <h1 className='createBundleTitle'>Create Bundle</h1>
                <input className="bundleTextBoxStyle" type="text" value={bundleName} onChange={e => setBundleName(e.target.value)} placeholder='Bundle Name' />
            <ul className='services'>
                {services.map(service => (
                    <li key={service.service_id}>
                            <input
                                className="bundleCheckBox"
                                type="checkbox"
                                checked={selectedServices.includes(service.service_id)}
                                onChange={() => handleServiceSelect(service.service_id)}
                            />
                            {service.name}
                    </li>
                ))}
            </ul>
            <input className="bundleTextBoxStyle" type="date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} placeholder='Expiry Date'/>
                <input className="bundleTextBoxStyle" type="text" value={totalPrice} onChange={e => setTotalPrice(e.target.value)} placeholder='Total Price'/>
            <button className="bundleBtnStyle" onClick={handleCreateBundle}>Create Bundle</button>
        </div>
    );
};

export default CreateBundle;
