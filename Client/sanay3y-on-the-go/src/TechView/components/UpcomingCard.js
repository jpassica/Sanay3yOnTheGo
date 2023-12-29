import React, { useEffect, useState } from 'react'
import '../styles/orders.css'
import axios from 'axios';

const UpcomingCard = ({order,filter,onCancel,onDone}) => {
  const [customer,setCustomer]=useState({});

  const fetchCustomer = async () => {
    const res = await axios.get(`http://localhost:3001/user/${order.customer_id}`);
    return res.data;
  };
  useEffect(() => {
    const getCustomer = async () => {
      const CustomerFromServer = await fetchCustomer();
      setCustomer(CustomerFromServer);
    };
    getCustomer();
  }, []);
  return (
    <div className='cardcontainer'>
    <div className={filter=="U"?"pordercard":"hidecard"}>
        <h3>{order.header}</h3>
        <p>{order.order_date}</p>
        <p>{order.dexcription}</p>
        <p>Price: {order.price} <sub>EGP</sub> </p>
        <p>to contact customer: {customer.phone_number}</p>

        <div >
        <button onClick={() => onDone(order.order_id)} class=" btn-success  my-4 probutton">Done</button>
        <button onClick={() => onCancel(order.order_id)} class=" btn-danger  my-4 probutton">Cancel</button>
        </div>
    </div>
    </div>
  )
}

export default UpcomingCard
