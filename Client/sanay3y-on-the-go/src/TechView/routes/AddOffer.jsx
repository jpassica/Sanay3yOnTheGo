import React, { useEffect, useState } from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import UploadOffer from '../components/UploadOffer';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AddOffer = () => {

  const {id}=useParams()
  const[offers,setoffers]=useState([])

  const fetchoffers=async ()=>
  {
    const res = await axios.get(`http://localhost:3001/offer/tech/${id}`);
    const data= res.data;
    console.log(data)
    return data
  }

  useEffect(()=>
    {
      const getoffers=async()=>{
    const Offersfromserver=await fetchoffers()
    setoffers(Offersfromserver)
     }
    getoffers()
      },[])

const addoffer = async (offer) => {
    const res = await axios.post('http://localhost:3001/offer', 
    { tech_id: id, 
      header: offer.heading,
      description: offer.content,
      prev_price: offer.preprice,
      new_price: offer.price
    }, 
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  
    const data = res.data;
  
    setoffers([...offers, data])
  }

  return (
    <div>
       <UploadOffer OnAdd={addoffer}/>
    </div>
  )
}

export default AddOffer
