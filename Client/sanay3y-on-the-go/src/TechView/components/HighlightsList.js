import PrevWorkCard from './PrevWorkCard'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

import '../styles/general.css'
import '../styles/highlights.css'
import '../styles/offers.css'



const HighlightsList = () => {

  const [orders, setorders] = useState([])
  const{id}=useParams()

  

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

  const togglehighlight = async (id) => {
    const worktotoggle = await fetchorder(id)
    const updwork = { ...worktotoggle, highlighted: !worktotoggle.highlighted }

    const res = await axios.patch(`http://localhost:3001/order/${id}`,
    {
      updwork
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
  return (
    <div className='cards'>
      {orders.filter(work => work.highlighted==true).map((work,index)=>(
      <PrevWorkCard key={index} work={work} onToggle={togglehighlight} />
    ))}  
    </div>
  )
}

export default HighlightsList
