import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from '../../CustView/components/Card';

const TechniciansPage = () => {
    const [technicians, setTechnicians] = useState([]);
    const Navigate = useNavigate();
    const [filteredTechnicians, setFilteredTechnicians] = useState([]);
    const [filterRate, setFilterRate] = useState(2);
  
    
const fetchTechnicians = async () => {
    try {
      const response = await axios.get('http://localhost:5000/techs');
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

    const handleCardClick = (techId) => {
        Navigate(`/ban-tech/${techId}`);
    };

    const handleFilterClick = () => {
        setFilteredTechnicians(technicians.filter(tech => tech.rate < filterRate));
      };
    
    return (
        <div>
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
        {filteredTechnicians.map((tech) => (
          <Card key={tech.id} tech={tech} onClick={() => handleCardClick(tech.id)} />
        ))}
      </div>
    );
};

export default TechniciansPage;
