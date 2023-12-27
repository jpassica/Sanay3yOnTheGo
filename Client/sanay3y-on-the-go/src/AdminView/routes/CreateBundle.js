import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CreateBundle.css';
const CreateBundle = ({ adminId }) => {
    const [services, setServices] = useState([]);
    const [techs, setTechs] = useState([]);
    const [bundleName, setBundleName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [description, setDescription] = useState('');
    const [firstSelectedTech, setFirstSelectedTech] = useState('');
    const [secondSelectedTech, setSecondSelectedTech] = useState('');
    const [thirdSelectedTech, setThirdSelectedTech] = useState('');
    const [firstSelectedService, setFirstSelectedService] = useState({});
    const [secondSelectedService, setSecondSelectedService] = useState({});
    const [thirdSelectedService, setThirdSelectedService] = useState({});
    
const fetchTechnicians = async () => {
    try {
      const response = await axios.get('http://localhost:3001/techs');
        console.log(response.data);
        alert(adminId);

      return response.data;
    } catch (error) {
      console.error('Error fetching services:', error.message);
      throw error;
    }
  };

  useEffect(() => {
    let isMounted = true;

    const getTechs = async () => {
      try {
        const getTechFromServer = await fetchTechnicians();
        if (isMounted) {
            setTechs(getTechFromServer);
        }
      } catch (error) {
          console.log(error);
        // Handle the error
      }
    };

    getTechs();

    return () => {
      isMounted = false;
    };
  }, []);

    useEffect(() => {
        // Fetch services
    
        // Fetch Techs
        axios.get('http://localhost:3001/techs')
            .then(response => {
                setTechs(response.data);
            })
            .catch(error => {
                console.error('Error fetching techs:', error);
            });

        axios.get('http://localhost:3001/services')
            .then(response => {
                setServices(response.data);
            })
            .catch(error => {
                console.error('Error fetching services:', error);
            });
        }, []);


    const handleFirstServiceChange = (e) => {
        if (e.target.value === secondSelectedService || e.target.value === thirdSelectedService) {
            alert('Service already selected');
        }
        else
            setFirstSelectedService(e.target.value);
    }
    const handleSecondServiceChange = (e) => {
        if (e.target.value === firstSelectedService || e.target.value === thirdSelectedService) {
            alert('Service already selected');
        }
        else    
            setSecondSelectedService(e.target.value);
    };
    const handleThirdServiceChange = (e) => { 
        if (e.target.value === secondSelectedService || e.target.value === firstSelectedService) {
            alert('Service already selected');
        }
        else    
            setThirdSelectedService(e.target.value);
    };
    
    const handleFirstTechChange = (e) => { 
        setFirstSelectedTech(e.target.value);
    };
    const handleSecondTechChange = (e) => { 
        setSecondSelectedTech(e.target.value);
    };
    const handleThirdTechChange = (e) => { 
        setThirdSelectedTech(e.target.value);
    };
        const handleDescipton = (e) => {
            setDescription(e.target.value);
        }
    const handleCreateBundle = () => {
        if (!expiryDate || !bundleName || !totalPrice) { 
            alert('All fields are required');
            return;
        }

        if (!firstSelectedService || !secondSelectedService || !thirdSelectedService || !firstSelectedTech || !secondSelectedTech || !thirdSelectedTech) { 
            alert('Bundle must contains 3 services with three technicians');
            return;
        }

        let integerValue = parseInt(bundleName, 100);
        if (!isNaN(integerValue)) {
            alert("Bundle name can't be a number");
            return;
        }
        integerValue = parseInt(totalPrice, 10);
        if (isNaN(integerValue)) {
            alert("Total Price can't be a number");
            return;
        }
        try {
          const response=  axios.post('http://localhost:3001/CreateBundle', {
            name: bundleName,
            tech_1: firstSelectedService,
            tech_2: secondSelectedService,
            tech_3: thirdSelectedService,
            description: description,
            totalPrice: totalPrice,
            expiryDate: expiryDate,
            creatorId: adminId
            }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log(response.data);
    } catch (error) {
        
        console.error('Create bundle error:', error.response ? error.response.data : error.message);
    }
    };    


    return (
        <div className='bundlePageContainer'>
            <h1 className='createBundleTitle'>Create Bundle</h1>
                <input className="bundleTextBoxStyle" type="text" value={bundleName} onChange={e => setBundleName(e.target.value)} placeholder='Bundle Name' />
            <h5 style={{ margin: '10px 0px' }}>Services</h5>
                <div className='services'>
                <div className='selectService'>
                <h6>Service 1</h6>
                    
                    <div className='serviceDiv'>
                        <select id="service1" value={firstSelectedService} onChange={handleFirstServiceChange}>
                        <option value="">Select a service</option>
                        {services.map((service) => ( (
                            <option key={service.id} value={service.service_id}>
                            {service.name}
                            </option>
                        )))}
                        </select>
                        </div>
                        <div className='techDiv'>
                        <select id="service" value={firstSelectedTech} onChange={handleFirstTechChange}>
                        <option value="">Select a technician</option>
                            {techs.map((tech) => ((tech.service_id==firstSelectedService)&&(
                            <option key={tech.id} value={tech.tech_id}>
                            {tech.fullname}
                            </option>)
                        ))}
                        </select>
                        </div>
                    </div>

                <div className='selectService'>
                    <h6>Service 2</h6>
                    <div className='serviceDiv'>
                        <select id="service2" value={secondSelectedService} onChange={handleSecondServiceChange}>
                        <option value="">Select a service</option>
                        {services.map((service) => ((
                            <option key={service.id} value={service.service_id}>
                            {service.name}
                            </option>
                        )))}
                        </select>
                        </div>
                        <div className='techDiv'>
                        <select id="service" value={secondSelectedTech} onChange={handleSecondTechChange}>
                            <option value="">Select a technician</option>
                            {techs.map((tech) => ((tech.service_id==secondSelectedService)&&(
                            <option key={tech.id} value={tech.tech_id}>
                            {tech.fullname}
                            </option>)
                        ))}
                        </select>
                        </div>
                    </div>

                <div className='selectService'>
                <h6>Service 3</h6>
                    
                <div className='serviceDiv'>
                    <select id="service3" value={thirdSelectedService} onChange={handleThirdServiceChange}>
                    <option value="">Select a service</option>
                    {services.map((service) => ((
                        <option key={service.id} value={service.service_id}>
                        {service.name}
                        </option>
                    )))}
                    </select>
                    </div>
                    <div className='techDiv'>
                    <select id="service" value={thirdSelectedTech} onChange={handleThirdTechChange}>
                    <option value="">Select a technician</option>
                    {techs.map((tech) => ((tech.service_id==thirdSelectedService)&&(
                            <option key={tech.id} value={tech.tech_id}>
                            {tech.fullname}
                            </option>)
                        ))}
                    </select>
                    </div>
                    </div>
            
                    </div>
            <div />
            <textarea className="bundleTextBoxStyle" type="text" value={description} onChange={handleDescipton} placeholder='Description' />
            <input className="bundleTextBoxStyle" type="date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} placeholder='Expiry Date'/>
                <input className="bundleTextBoxStyle" type="text" value={totalPrice} onChange={e => setTotalPrice(e.target.value)} placeholder='Total Price'/>
            <button className="bundleBtnStyle" onClick={handleCreateBundle}>Create Bundle</button>
        </div>
    );
};

export default CreateBundle;
