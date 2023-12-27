import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import sample from "../images/test.png";
import "../styles/TechDetails.css";
import PrevWorkCarousel from "../components/PrevWorkCarousel";
import ReviewCarousel from "../components/ReviewCarousel";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TechDetails = () => {

  const navigate = useNavigate();

  const [show, setShow] = useState();

  //booking
  const [OrderTitle, setOrderTitle] = useState("");
  const [OrderDetails, setOrderdetails] = useState("");
  const [OrderDate, setOrderDate] = useState(new Date());

  const [technician, setTechnician] = useState();

  const [prevWork, setPreviousWork] = useState([]);
  const [offers, setOffers] = useState([]);
  const [reviews, setReviews] = useState([]);

  //tech id
  const { id } = useParams();

  //fetch previous work of a certain tech
  //fetch offers of a certain tech
  //fetch reviews of a certain tech
  //fetch el technician nafso

  const fetchPreviousWork = async () => {
    const res = await axios.get(`https://localhost:3001/order/tech/${id}`);
    const data = res.data;
    return data;
  };

  const fetchOffers = async () => {
    const res = await fetch("http://localhost:5000/offers");
    const data = await res.json();
    console.log(data);
    return data;
  };
  const fetchTechnician = async () => {
    const res = await axios.get(`https://localhost:3001/user/${id}`);
    console.log(data);
    return res.data;
  };
  const fetchReviews = async () => {
    const res = await axios.get(
      `https://localhost:3001/order/review/tech/${id}`
    );
   
    return res.data;
  };
  
  useEffect(() => {
    const getPrevWork = async () => {
      const getWorkFromServer = await fetchPreviousWork();
      setPreviousWork(getWorkFromServer.filter((w) => w.order_status == "F"));
    };
    const getOffers = async () => {
      const getOffersFromServer = await fetchOffers();
      setOffers(getOffersFromServer);
    };
    const getReviews = async () => {
      const getReviewsFromServer = await fetchReviews();
      setReviews(getReviewsFromServer);
    };
    const getTechnician = async () => {
      const getTechFromServer = await fetchTechnician();
      setTechnician(getTechFromServer);
    };

    getOffers();
    getPrevWork();
    getReviews();
    getTechnician();
  }, []);

  //const getTechbyID = () => {
  //return technicians.find(t=>t.id==id)
  //};

  const toggleShow = () => {
    setShow(!show);
  };

  const bookOffer = () => {
    //post request
    alert("offer booked successfully");
  };

  // const technician=getTechbyID(techID)
  //console.log(technician)

  const addOrder = () => {

    //post or add a regular order
  };

  if (!technician) return <div>loading</div>;
  return (
    <div className="techDetails-container">

      <div className="tech-card">
        <img src={sample} width="230px" className="tech-img" />
        <div className="tech-info">
          <h1> {technician.fullname}</h1>
          <h4>{technician.name}</h4>
          <h4>{technician.email}</h4>
          <h4>{technician.address}</h4>
          <h4>{technician.phone_number}</h4>
        </div>
      </div>

      <button className=" button-52" onClick={toggleShow}>
        Book a service NOW!
      </button>

      <div />

      {show && (
        <div className="book-form-container">
          <form className="book-form" onSubmit={addOrder}>
            <div className="form-grid-item">
              <label for="Ser-title">order title</label>
              <input
                type="text"
                value={OrderTitle}
                onChange={(e) => setOrderTitle(e.target.value)}
                id="Ser-title"
              />
            </div>
            <div className="form-grid-item">
              <label for="ser-details">order details</label>
              <textarea
                id="ser-details"
                value={OrderDetails}
                onChange={(e) => setOrderdetails(e.target.value)}
              >
                type here..
              </textarea>
            </div>
            <div className="form-grid-item">
              <label htmlFor="dateInput">Select a date:</label>
              <input
                type="date"
                id="dateInput"
                value={OrderDate.toISOString().split("T")[0]} // Convert date to string in 'YYYY-MM-DD' format
                onChange={(e) => setOrderDate(e.target.value)}
              />
            </div>
            <input type="submit" className="button-53" value="place order!" />
          </form>
        </div>
      )}

      <PrevWorkCarousel items={prevWork} />

      <div>
        {offers.filter((offer) => offer.tech_id == id).length != 0 && (
          <h3 className="headingprev">Special Offers</h3>
        )}
        <div className="offer-container1">
          {offers
            .filter((offer) => offer.offer_id == id)
            .map((offer) => (
              <div className="offer-card1">
                <h2>
                  <b>{offer.header}</b>
                </h2>
                <h4>
                  Price:
                  {offer.new_price} <del>{offer.prev_price}</del>
                </h4>
                <p>{offer.content}</p>

                <button
                  className=" button-17"
                  onClick={() => bookOffer(offer.offer_id)}
                >
                  Book NOW!
                </button>
              </div>
            ))}
        </div>
      </div>

      <ReviewCarousel reviews={reviews} />

      <button onClick={() => navigate(-1)} className="button-17">
        Back to Technician list
      </button>
    </div>
  );
};

export default TechDetails;
