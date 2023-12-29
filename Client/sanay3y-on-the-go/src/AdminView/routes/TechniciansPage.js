import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/techPage.css';
import Rate from '../../TechView/components/Rate';

const TechniciansPage = () => {
    const [technicians, setTechnicians] = useState([]);
    const [filteredTechnicians, setFilteredTechnicians] = useState([]);
    const [filterRate, setFilterRate] = useState(5);
  
    
const fetchTechnicians = async () => {
    try {
      const response = await axios.get('http://localhost:3001/user/all/techs');
      console.log(response.data);
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
            setTechnicians(getTechFromServer);
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

  const banTech = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/user/${id}`);
      console.log(response.data);
      alert('Technician banned successfully');
      const updatedTechs = await fetchTechnicians();
      setTechnicians(updatedTechs);
      handleFilterClick();
    } catch (error) {
      alert('failed banned');

        console.error('Error fetching feedbacks:', error.message);
        throw error;
    }

    };

  const handleFilterClick = () => {
        setFilteredTechnicians(technicians.filter(tech => tech.rating < filterRate));
      };
    
    return (
        <div className='techReviewContainer'>
        <>
        <h1>Technicians to be Banned</h1>
        <div>
          <label>
            Filter by rate less than:
            <input
              type="number"
              value={filterRate}
              onChange={(e) => setFilterRate(Number(e.target.value))}
            />
          </label>
          <button onClick={handleFilterClick}>Filter</button>
        </div>
        </>
        <div className='tech-banned-container'>
        {filteredTechnicians.map((tech) => (
          <div className='tech-data' key={tech.id}>
                              <h4>{tech.fullname}</h4>
                              <h4>{tech.name}</h4>

                              <Rate rating={tech.rating} />
                              <button className='consider-btn' onClick={()=> banTech(tech.client_id)}>ban</button>
                          </div>
        ))}
      </div>
      </div>
    );
};

export default TechniciansPage;
