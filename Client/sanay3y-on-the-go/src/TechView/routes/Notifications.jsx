import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


const TechNotifications = () => {
  const{id}=useParams()

  const [notifications,setnotification]=useState([]);
  const fetchnot=async ()=>
    {
      const res = await axios.get(`http://localhost:3001/notification/${id}`);
      const data= res.data;
      console.log(data)
      return data
    }

    useEffect(()=>
      {
        const getnot=async()=>{
      const notfromserver=await fetchnot()
      setnotification(notfromserver)
       }
       getnot()
        },[])
      console.log(notifications)
  return (
    <div>
      <div className="notification-container">
      {notifications.map((notification, index) => (
        <div key={index} className="notification">
          <div className="order-header">Order #{notification.order_id}</div>
          <div className="content">{notification.content}</div>
          <div className="timestamp">{notification.notification_date}</div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default TechNotifications
