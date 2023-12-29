import React, { useEffect, useState } from "react";

import TechList from "../components/TechList";
import "../styles/TechList.css";
import toolimg from "../../TechView/img/img1.png";
import techimg from "../../TechView/img/tech.png";
import eclipse from "../../TechView/img/Ellipse.png";
import axios from "axios";
import { Await, useParams } from "react-router-dom";

const Home = () => {
  const [technicians, setTechnicians] = useState([]);
  const [services, setServices] = useState([]);
  const[reward,setReward]=useState()

  const{id}=useParams()
  console.log("home",id)


  const fetchTechnicians = async () => {
    const res = await axios.get(
      "http://localhost:3001/user//All/Techs")
    const data = res.data;

    return data;
  };
    //fetch customer details of customer_id
    const fetchCustomer = async () => {
      const res = await axios.get(`http://localhost:3001/user/${id}`);
      return res.data;
    };
  
    //fetching data on loading the page
    useEffect(() => {
      const getTechs = async () => {
        const getTechFromServer = await fetchTechnicians();
        setTechnicians(getTechFromServer);
      };
      const getServices = async () => {
        const getServicesFromServer = await fetchServices();
        setServices(getServicesFromServer);
      };
      const getReward=async()=>
      {
        const getReward=await fetchCustomer()
        setReward(getReward.percentage?getReward.percentage:0)
      }

      getTechs();
      getServices();
      getReward();
    }, []);

  //fetching service categories
  const fetchServices = async () => {
    const res = await axios.get("http://localhost:3001/service");
    const data = res.data;

    return data;
  };



  const [filter, setFilter] = useState(services[0]); //initial filter


  console.log(filter);
  console.log(services);

  return (
    <div className="home-container">
      <div className="home">
        <div className="Welcome">
          <h2>Welcome to</h2>
          <h1>Sany3y On The Go!</h1>
          <img
            src={toolimg}
            alt="img1"
            height="400px"
            width="100%"
            style={{
              opacity: "0.3",
              position: "absolute",
              top: "-200px",
              left: "270px",
              background: "transparent",
            }}
          />
          <img
            src={techimg}
            alt="img1"
            height={280}
            width={300}
            style={{
              opacity: "0.9",
              position: "absolute",
              top: "-5px",
              left: "-430px",
              background: "transparent",
            }}
          />
        </div>
      </div>
      <div className="reward-section">
        You are eligible for {reward} % discount
      </div>

      <div className="filter-buttons">
        {services.map((service, index) => (
          <button
            key={index}
            onClick={() => setFilter(service.name)}
            className="button-17"
          >
            {service.name}
          </button>
        ))}
      </div>
      <TechList TechData={technicians} filter={filter} customer_id={id} />
    </div>
  );
};

export default Home;
