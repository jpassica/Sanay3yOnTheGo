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
  const [OrderPrice, setOrderPrice] = useState();

  const [OfferOrderDate, setOfferOrderDate] = useState(new Date());

  const [technician, setTechnician] = useState();

  const [prevWork, setPreviousWork] = useState([]);
  const [offers, setOffers] = useState([]);
  const [reviews, setReviews] = useState([]);

  //tech id
  const { id } = useParams();
  console.log(id)

  //fetch previous work of a certain tech
  //fetch offers of a certain tech
  //fetch reviews of a certain tech
  //fetch el technician nafso

  const fetchPreviousWork = async () => {
    try{
    const res = await axios.get(`http://localhost:3001/order/tech/${id}`);
    const data = res.data;
    return data;
    }
    catch(e)
    {
      alert("error in fetching tech's orders")
    }
  };

  const fetchOffers = async () => {
    try
    {
    const res = await axios.get(`http://localhost:3001/offer/tech/${id}`);
    return res.data;
    }
    catch(e)
    {
      alert("error in fetching offers")
    }
  };
  const fetchTechnician = async () => {
    try
    {
    const res = await axios.get(`http://localhost:3001/user/${id}`);
    return res.data;
    }
    catch(e)
    {
      alert("error in fetching tech")
    }
  };
  const fetchReviews = async () => {
    try
    {
    const res = await axios.get(
      `http://localhost:3001/order/review/tech/${id}`
    );
   
    return res.data;
    }
    catch(e)
    {
      alert("error in fetchinh tech's review")
    }
  };
  
  useEffect(() => {
    const getPrevWork = async () => {
      const getWorkFromServer = await fetchPreviousWork();
      console.log(getWorkFromServer)
      setPreviousWork(getWorkFromServer);
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
/////booking order
const postOrder = async () => {
  try {
    const response = await axios.post("http://localhost:3001/order", {
      header: OrderTitle,
      description: OrderDetails,
      price: OrderPrice,
      tech_id: id, 
      type:'R',
      customer_id:1,
      order_exec_date:OrderDate
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    // Handle the response as needed
    console.log("Order booked successfully:", response.data);
    // You may want to update the UI or show a success message to the user
  } catch (error) {
    // Handle errors
    console.error("Error booking order:", error);
    // You may want to show an error message to the user
  }
};


    //book offer order
    const postOfferOrder = async (offer_id) => {
      console.log(offer_id)
      try {
        const response = await axios.post(`http://localhost:3001/offer/${offer_id}`, {
          type:'O',
          customer_id:1,
          order_exec_date:OfferOrderDate
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
    
        // Handle the response as needed
        console.log("Offer booked successfully:", response.data);
        // You may want to update the UI or show a success message to the user
      } catch (error) {
        // Handle errors
        console.error("Error booking offer:", error);
        // You may want to show an error message to the user
      }
    };

  const bookOffer = async (offer_id) => {


    // Call the function to make the Axios POST request
    await postOfferOrder(offer_id);
  };


console.log(prevWork)
  const addOrder = async (e) => {

      e.preventDefault(); // Prevent the default form submission
      // Call the function to make the Axios POST request
      await postOrder();
  };

  if (!technician||!offers||!reviews||!prevWork) return <div>loading</div>;


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
                value={OrderDate? OrderDate.toISOString().split("T")[0]: ""} // Convert date to string in 'YYYY-MM-DD' format
                onChange={(e) => setOrderDate(new Date(e.target.value))}
              />
            </div>
            <div className="form-grid-item">
              <label for="Ser-price">order price</label>
              <input
                type="number"
                value={OrderPrice}
                onChange={(e) => setOrderPrice(e.target.value)}
                id="Ser-price"
              />
            </div>
            <input type="submit" className="button-53" value="place order!" />
          </form>
        </div>
      )}

      <PrevWorkCarousel items={prevWork} />

      <div>
        {offers.length != 0 && (
          <h3 className="headingprev">Special Offers</h3>
        )}
        <div className="offer-container1">
          {offers
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
                <div className="form-grid-item">
              <label htmlFor="dateInput">Select a date:</label>
              <input
                type="date"
                id="dateInput"
                value={OfferOrderDate? OfferOrderDate.toISOString().split("T")[0]: ""} // Convert date to string in 'YYYY-MM-DD' format
                onChange={(e) => setOfferOrderDate(new Date(e.target.value))}
              />
            </div>
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
