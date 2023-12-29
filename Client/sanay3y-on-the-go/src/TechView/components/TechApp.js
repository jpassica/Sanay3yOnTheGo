import React, { useState } from "react";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../routes/Home";
import Account from "../routes/Account";
import Orders from "../routes/Orders";
// import Profile from './routes/Profile'
import FeaturedWork from "../routes/FeaturedWork";
import Offers from "../routes/Offers";
import Navbar from "./Navbar";
import EditProfile from "../routes/EditProfile";
import AddOffer from "../routes/AddOffer";
import axios from "axios";
import Notifications from "../routes/Notifications";
import Feedback from "../routes/Feedback";

const TechApp = () => {
  const [offers, setoffers] = useState([]);
  const [orders, setorders] = useState([]);
  const [tech, settech] = useState({});
  const [services, setServices] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const id = 12;
    const res = (await axios.get(`http://localhost:3001/notification/${id}`)).data;
    return res;
  };

  useEffect(() => {
    const getNotifications = async () => {
      const notfromserver = await fetchNotifications();
      setNotifications(notfromserver);
    };
    getNotifications();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:3001/service");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching services:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    let isMounted = true;

    const getServices = async () => {
      try {
        const getServicesFromServer = await fetchServices();
        if (isMounted) {
          setServices(getServicesFromServer);
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

  console.log(services);

  const fetchorders = async () => {
    const id = 12;
    const res = (await axios.get(`http://localhost:3001/order/tech/${id}`))
      .data;
    //const data=  res.data;
    //console.log(data)
    return res;
  };

  useEffect(() => {
    const getorders = async () => {
      const ordersfromserver = await fetchorders();
      setorders(ordersfromserver);
    };
    getorders();
  }, []);

  const fetchtech = async (id) => {
    const res = await axios.get(`http://localhost:3001/user/12`);
    const data = res.data;

    return data;
  };

  useEffect(() => {
    const gettech = async () => {
      const techfromserver = await fetchtech(12);
      console.log(techfromserver);
      settech(techfromserver);
    };
    gettech();
  }, []);

  const edittech = async (newtech) => {
    const res = await axios.patch(
      `http://localhost:3001/user/12`,
      {
        tech_id: 12,
        fullname: newtech.fname,
        email: newtech.email,
        address: newtech.area,
        phone_number: newtech.number,
        name: newtech.service,
      },
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    const data = res.data;
    console.log(data);
    settech(data);
    console.log(tech.name);
  };

  const fetchoffers = async () => {
    const id = 12;
    const res = await axios.get(`http://localhost:3001/offer/tech/${id}`);
    const data = res.data;
    // console.log(data)
    return data;
  };

  useEffect(() => {
    const getoffers = async () => {
      const Offersfromserver = await fetchoffers();
      setoffers(Offersfromserver);
    };
    getoffers();
  }, []);
  // console.log(offers)

  const fetchorder = async (id) => {
    const res = await fetch(`http://localhost:3001/order/${id}`);
    const data = await res.json();

    return data;
  };

  const deleteOffer = async (id) => {
    const res = await axios.delete(`http://localhost:3001/offer/${id}`);
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setoffers(offers.filter((offer) => offer.offer_id !== id))
      : alert("Error Deleting This Offer");
  };

  // Add Offer
  const addoffer = async (offer) => {
    const res = await axios.post(
      "http://localhost:3001/offer",
      {
        tech_id: 12,
        header: offer.heading,
        description: offer.content,
        prev_price: offer.preprice,
        new_price: offer.price,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const data = res.data;

    setoffers([...offers, data]);
  };

  const togglehighlight = async (id) => {
    const worktotoggle = await fetchorder(id);
    const updwork = { ...worktotoggle, highlighted: !worktotoggle.highlighted };

    const res = await axios.patch(
      `http://localhost:3001/order/toggle/${id}`,
      {
        tech_id: 12,
        order_id: updwork.order_id,
        highlighted: updwork.highlighted,
        order_status: updwork.order_status,
      },
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      }
    );

    const data = res.data;
    console.log(data);

    setorders(
      orders.map((item) =>
        item.order_id === id ? { ...item, highlighted: data.highlighted } : item
      )
    );
    window.location.reload();
  };

  const onDone = async (id) => {
    const doneorder = await fetchorder(id);
    const updorder = { ...doneorder, order_status: "F" };

    const res = await axios.patch(
      `http://localhost:3001/order/${id}`,
      {
        tech_id: 12,
        order_id: updorder.order_id,
        highlighted: updorder.highlighted,
        order_status: updorder.order_status,
      },
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      }
    );

    const data = res.data;

    setorders(
      orders.map((item) =>
        item.order_id === id
          ? { ...item, order_status: data.order_status }
          : item
      )
    );
  };

  const onAccept = async (id) => {
    const acceptedorder = await fetchorder(id);
    const updorder2 = { ...acceptedorder, order_status: "U" };
    console.log(updorder2);
    const res = await axios.patch(
      `http://localhost:3001/order/${id}`,
      {
        tech_id: 12,
        order_id: updorder2.order_id,
        highlighted: updorder2.highlighted,
        order_status: updorder2.order_status,
      },
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      }
    );

    const data = res.data;
    console.log(data);

    setorders(
      orders.map((item) =>
        item.order_id === id
          ? { ...item, order_status: data.order_status }
          : item
      )
    );
  };

  const deleteorder = async (id) => {
    const res = await axios.delete(`http://localhost:3001/order/${id}`);
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setorders(orders.filter((order) => order.order_id !== id))
      : alert("Error Deleting This order");
  };

  const onCancel = async (id) => {
    const doneorder = await fetchorder(id);
    const updorder = { ...doneorder, order_status: "C" };

    const res = await axios.patch(
      `http://localhost:3001/order/${id}`,
      {
        tech_id: 12,
        order_id: updorder.order_id,
        highlighted: updorder.highlighted,
        order_status: updorder.order_status,
      },
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      }
    );

    const data = res.data;

    setorders(
      orders.map((item) =>
        item.order_id === id
          ? { ...item, order_status: data.order_status }
          : item
      )
    );
  };

  const OnDeleteAccount = async (id) =>
  {
    const res = await axios.delete(`http://localhost:3001/user/${id}`);
    
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/Account" element={<Account tech={tech} />} />
          <Route
            exact
            path="/Orders"
            element={
              <Orders
                orders={orders}
                ondelete={onCancel}
                onDone={onDone}
                onAccept={onAccept}
                onToggle={togglehighlight}
              />
            }
          />
          <Route
            exact
            path="/Offers"
            element={
              <Offers
                offersdata={offers}
                OnDelete={deleteOffer}
                OnAdd={addoffer}
              />
            }
          />
          <Route
            exact
            path="/FeaturedWork"
            element={
              <FeaturedWork PrevWork={orders} onToggle={togglehighlight} />
            }
          />

          <Route
            exact
            path="/EditProfile"
            element={
              <EditProfile
                tech={tech}
                edittech={edittech}
                services={services}
              />
            }
          />

          <Route
            exact
            path="/AddOffer"
            element={<AddOffer OnAdd={addoffer} />}
          />
          <Route exact path="/TechNotifications" element={<Notifications notifications={notifications} />} />
          <Route exact path="/Feedback" element={<Feedback/>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default TechApp;
