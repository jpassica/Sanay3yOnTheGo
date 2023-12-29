import React, { useState,useEffect } from "react";
import "../styles/notification.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Notifications = () => {
  const[notifications,setNotifications]=useState([])
  const{id}=useParams()
    //fetching customer's notification
    const fetchNotifications = async () => {
      const res = await axios.get(`http://localhost:3001/notification/${id}`);
      return res.data;
    };
      //fetching data on loading the page
  useEffect(() => {
    const getNotifications = async () => {
      const getNotificationsFromServer = await fetchNotifications();
      setNotifications(getNotificationsFromServer);
    };
    getNotifications();
  }, []);
  return (
    <div className="notification-container">
      {notifications.map((notification, index) => (
        <div key={index} className="notification">
          <div className="order-header">Order #{notification.order_id}</div>
          <div className="content">{notification.content}</div>
          <div className="timestamp">{notification.notification_date}</div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
