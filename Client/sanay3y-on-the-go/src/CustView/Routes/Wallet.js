import React from "react";
import "../styles/wallet.css";
import lock from "../images/padlock.png";
import { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const Wallet = () => {
  const [customer, setCustomer] = useState({});
  const [Point_System, setPoint_System] = useState([]);
  const {id}=useParams()

    //fetching point system (req points&percentage)
    const fetchPoint_System = async () => {
      const res = await axios.get("http://localhost:3001/reward/PointSystem");
      console.log(res.data)
      return res.data;
    };
      //fetch customer details of customer_id
  const fetchCustomer = async () => {
    const res = await axios.get(`http://localhost:3001/user/${id}`);
    return res.data;
  };
      //fetching data on loading the page
  useEffect(() => {

    const getPoint_System = async () => {
      const getPointsFromServer = await fetchPoint_System();
      setPoint_System(getPointsFromServer);
    };
    const getCustomer = async () => {
      const CustomerFromServer = await fetchCustomer();
      setCustomer(CustomerFromServer);
    };

    getPoint_System();
    getCustomer();
  }, []);

  //Points refers to customer's current points
  return (
    <div className="wallet-container">
      <div className="points-container">
        <div>
          <h3> your current points</h3>
          <div className="points">{customer.points}</div>
        </div>
      </div>
      <div className="all-rewards">
        <div className="reward-container">
          {/*mapping unlocked discounts*/}
          {Point_System.filter((p) => p.req_points <= customer.points).map((p) => (
            <div className="reward-item">
              <h5> {p.req_points}</h5>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="59"
                height="54"
                viewBox="0 0 59 54"
                fill="none"
              >
                <ellipse cx="29.5" cy="27" rx="29.5" ry="27" fill="#F4C002" />
                <text x="4" y="30" fill="white">
                  {p.percentage}%off
                </text>
              </svg>
            </div>
          ))}
           {/*mapping locked discounts*/}
          {Point_System.filter((p) => p.req_points > customer.points).map((p) => (
            <div className="reward-item">
              <h5> {p.req_points}</h5>
              <div className="locked">
                <img src={lock} width="30px" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
