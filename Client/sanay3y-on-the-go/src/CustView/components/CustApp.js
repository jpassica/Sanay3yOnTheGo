import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBarCust from "./NavBarCust";
import Home from "../Routes/Home";
import TechDetails from "../Routes/TechDetails";
import Orders from "../Routes/Orders";
import ReviewOrder from "../Routes/ReviewOrder";
import CancelOrder from "../Routes/CancelOrder";
import Wallet from "../Routes/Wallet";
import Bundles from "../Routes/Bundles";
import Feedback from "../Routes/Feedback";
import Notifications from "../Routes/Notifications";
import Account from "../Routes/Account";
import EditProfile from "../Routes/EditProfile";
import axios from "axios";
function CustApp({ customer_id }) {

  //customer_id is passed as a prop from login page
  const [customer, setCustomer] = useState();

  const [technicians, setTechnicians] = useState([]);
  const [services, setServices] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [Point_System, setPoint_System] = useState([]);

  //fetching techs of same area as customer
  const fetchTechnicians = async () => {
    const res = await axios.post(
      "http://localhost:3001/user/Techs",
      { customer_id: 21 },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const data = res.data;
    console.log(data);
    return data;
  };

  //fetching service categories
  const fetchServices = async () => {
    const res = await axios.get("http://localhost:3001/service");
    const data = res.data;
    console.log(data);
    return data;
  };

  //fetching orders of customer by customer id
  const fetchOrders = async () => {
    const res = await axios.get(`http://localhost:3001/order/${customer_id}`);
    const data = res.data
    return data;
  };

  //fetching all reviews,,malhash ay 30 lazma
  const fetchReviews = async () => {
    const res = await fetch("http://localhost:5000/reviews");
    const data = await res.json();
    console.log(data);
    return data;
  };

  //fetching customer's notification
  const fetchNotifications = async () => {
    const res = await fetch("http://localhost:5000/notifications");
    const data = await res.json();
    console.log(data);
    return data;
  };

  //fetching bundles
  const fetchBundles = async () => {
    const res = await fetch("http://localhost:5000/bundles");
    const data = await res.json();
    console.log(data);
    return data;
  };
  //fetching point system (req points&percentage)
  const fetchPoint_System = async () => {
    const res = await fetch("http://localhost:5000/Point_System");
    const data = await res.json();
    console.log(data);
    return data;
  };

  //fetch customer details of customer_id
  const fetchCustomer = async () => {
    const res = await axios.get(`http://localhost:30001/user/${customer_id}`);
    const data = res.data
    console.log(data);
    return data;
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
    const getOrders = async () => {
      const getOrdersFromServer = await fetchOrders();
      setOrders(getOrdersFromServer);
    };
    const getReviews = async () => {
      const getReviewsFromServer = await fetchReviews();
      setReviews(getReviewsFromServer);
    };
    const getNotifications = async () => {
      const getNotificationsFromServer = await fetchNotifications();
      setNotifications(getNotificationsFromServer);
    };
    const getBundles = async () => {
      const getBundlesFromServer = await fetchBundles();
      setBundles(getBundlesFromServer);
    };
    const getPoint_System = async () => {
      const getPointsFromServer = await fetchPoint_System();
      setPoint_System(getPointsFromServer);
    };
    const getCustomer = async () => {
      const CustomerFromServer = await fetchCustomer();
      setCustomer(CustomerFromServer);
    };
    getTechs();
    getServices();
    getOrders();
    getReviews();
    getNotifications();
    getBundles();
    getPoint_System();
    getCustomer();
  }, []);

  //bgarab beh
  const sampleCust = {
    //should be fetched from db by id
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    area: "City Center",
    reward: 20,
    Points: 200,
  };
   
  //editing customer details
  const editcust = async (id, newcust) => {
    const res = await fetch(`http://localhost:5000/techs/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      //body: JSON.stringify(updtech),
    });

    const data = await res.json();
  };

  return (
    <>
      <BrowserRouter>
        <NavBarCust />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                techData={technicians}
                services={services}
                reward={sampleCust.reward}
              />
            }
          />
          <Route
            path="/TechDetails/:id"
            element={
              <TechDetails  />
            }
          />
          <Route path="/Orders" element={<Orders orders={orders} />} />
          <Route
            path="/ReviewOrder/:id"
            element={<ReviewOrder />}
          />
          <Route path="/CancelOrder/:id" element={<CancelOrder />} />
          <Route
            path="/wallet"
            element={
              <Wallet Points={sampleCust.Points} Point_System={Point_System} />
            }
          />
          <Route path="/bundles" element={<Bundles bundles={bundles} />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route
            path="/notifications"
            element={<Notifications notifications={notifications} />}
          />
          <Route path="/account" element={<Account customer={sampleCust} />} />
          <Route
            path="/editprofile"
            element={<EditProfile customer={sampleCust} editcust={editcust} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default CustApp;
