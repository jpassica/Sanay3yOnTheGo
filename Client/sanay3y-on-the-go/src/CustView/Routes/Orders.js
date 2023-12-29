import React from "react";
import OrderList from "../components/OrderList";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CustomerOrders = () => {
  const{id}=useParams()
  const [filter, setFilter] = useState("P");
  const[orders,setOrders]=useState([])

  console.log(filter);

    //fetching orders of customer by customer id
    const fetchOrders = async () => {
      const res = await axios.get(`http://localhost:3001/order/customer/${id}`);
      const data = res.data
      console.log(orders)
      return data;
    };
      //fetching data on loading the page
  useEffect(() => {

    const getOrders = async () => {
      const getOrdersFromServer = await fetchOrders();
      setOrders(getOrdersFromServer)
    };
    getOrders();

  }, []);

  return (
    <div>
      <div className="filter-buttons">
        <button onClick={() => setFilter("F")} className="button-17">
          finished
        </button>
        <button onClick={() => setFilter("U")} className="button-17">
          upcoming
        </button>
        <button onClick={() => setFilter("P")} className="button-17">
          pending
        </button>
      </div>
      <OrderList orders={orders} filter={filter} customer_id={id} />
    </div>
  );
  
};
export default CustomerOrders;

