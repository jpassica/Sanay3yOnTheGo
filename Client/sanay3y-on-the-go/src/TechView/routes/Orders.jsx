import React, { useEffect, useState } from 'react'
import OrdersList from '../components/OrdersList';
import axios from 'axios';

const Orders = () => {
  const [orders, setorders] = useState([])
 const  id=2
  

  const fetchorders=async ()=>
    {
      const res= (await axios.get(`http://localhost:3001/order/tech/${id}`)).data;
      return res
    }

    useEffect(()=>
      {
        const getorders=async()=>{
      const ordersfromserver=await fetchorders()
      setorders(ordersfromserver)
       }
      getorders()
        },[])
      console.log(orders)

  const fetchorder = async (orderId) => {
    const res = await fetch(`http://localhost:3001/order/${orderId}`)
    const data = await res.json()

    return data
  }


  const onAccept = async (id) => {
    const acceptedorder = await fetchorder(id)
    const updorder2 = { ...acceptedorder, order_status: "U" }

    const res = await axios.patch(`http://localhost:3001/order/${id}`,
      {
        order_status : updorder2.order_status
      },
      {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        }
      })

    const data = res.data

    setorders(
      orders.map((item) =>
        item.order_id === id ? { ...item, order_status: data.order_status } : item
      )
    )
  }
  const onDone = async (id) => {
    const doneorder = await fetchorder(id)
    const updorder = { ...doneorder, order_status: "F" }

    const res = await axios.patch(`http://localhost:3001/order/${id}`,
      {
        order_status : updorder.order_status

      },
      {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })

    const data = res.data

    setorders(
      orders.map((item) =>
        item.order_id === id ? { ...item, order_status: data.order_status } : item
      )
    )
  }


  const deleteorder = async (id) => {
    const res = await axios.delete(`http://localhost:3001/order/${id}`)
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setorders(orders.filter((order) => order.order_id !== id))
      : alert('Error Deleting This order')
  }

 
  const togglehighlight = async (id) => {
    const worktotoggle = await fetchorder(id)
    const updwork = { ...worktotoggle, highlighted: !worktotoggle.highlighted }

    const res = await axios.patch(`http://localhost:3001/order/${id}`,
      {
        order_status : updwork.order_status
      }, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })

    const data = res.data

    setorders(
      orders.map((item) =>
        item.order_id === id ? { ...item, highlighted: data.highlighted } : item
      )
    )


    
  }


    const [filter, setFilter] = useState('F');

  return (
        //orders,ondelete,onDone,onAccept,onToggle}
        <div>
          <div className='highlightsbtns'>
            <div></div>
            <button className={filter == 'P' ? "probtn probtnclicked" : "probtn"} onClick={() => setFilter('P')}> Pending </button>
            <button className={filter == 'F' ? "probtn probtnclicked" : "probtn"} onClick={() => setFilter('F')}> Previous </button>
            <button className={filter == 'U' ? "probtn probtnclicked" : "probtn"} onClick={() => setFilter('U')}> Upcoming </button>
  
            <div></div>
  
          </div>
  
          <OrdersList filter={filter} orders={orders} ondelete={deleteorder} onDone={onDone} onAccept={onAccept} onToggle={togglehighlight} />
          
        </div>
      )
}
  export default Orders;
