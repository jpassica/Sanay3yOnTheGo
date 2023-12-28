import React, { useState } from 'react'
import {useEffect} from 'react'
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Home from '../routes/Home'
import Account from '../routes/Account'
import Orders from '../routes/Orders'
// import Profile from './routes/Profile'
import FeaturedWork from '../routes/FeaturedWork'
import Offers from '../routes/Offers'
import Navbar from './Navbar'
import EditProfile from '../routes/EditProfile'
import AddOffer from '../routes/AddOffer'
import axios from "axios";



const TechApp = ({id}) =>
{
    const[offers,setoffers]=useState([])
    const[prevwork,setprevwork]=useState([])
    const[techs,settechs]=useState([])
    const[orders,setorders]=useState([])
    const[tech,settech]=useState();


    const fetchorders=async ()=>
    {
      const id = 23;
      const res= (await axios.get(`http://localhost:3001/order/tech/${id}`)).data;
      //const data=  res.data;
      //console.log(data)
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



    // const fetchtechs=async ()=>
    // {
    //   const res=await axios.get('http://localhost:3001/user/12');
    //   const data= res.data;
    //   console.log(data)
    //   return data
    // }

    // useEffect(()=>
    //   {
    //     const gettechs=async()=>{
    //   const techsfromserver=await fetchtechs()
    //   settechs(techsfromserver)
    //    }
    //   gettechs()
    //     },[])
    //   console.log(techs)

    const fetchtech = async (id) => {
      const res = await axios.get(`http://localhost:3001/user/12`)
      const data = res.data;
  
      return data
    }

    useEffect(()=>
    {const gettech=async()=>{
      const techfromserver=await fetchtech(12)
      settech(techfromserver)
    }
    gettech()
  },[])



      
    const fetchoffers=async ()=>
    {
      const id = 12;
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
      console.log(offers)

      const fetchPrevWork=async ()=>
    {
      const res=await axios.get('http://localhost:3001/order/tech/23');
      const data= res.data;
      console.log(data)
      return data
    }

    useEffect(()=>
      {
        const getprevwork=async()=>{
      const prevworkfromserver=await fetchPrevWork()
      setprevwork(prevworkfromserver)
       }
       getprevwork()
        },[])
      console.log(prevwork)

      const fetchwork = async (id) => {
        const res = await fetch(`http://localhost:3001/prevwork/${id}`)
        const data = await res.json()
    
        return data
      }

      const fetchorder = async (id) => {
        const res = await fetch(`http://localhost:3001/order/${id}`)
        const data = await res.json()
    
        return data
      }



      const deleteOffer = async (id) => {
        const res = await axios.delete(`http://localhost:3001/offer/5`);
        //We should control the response status to decide if we will change the state or not.
        res.status === 200
          ? setoffers(offers.filter((offer) => offer.id !== id))
          : alert('Error Deleting This Offer')
      }

       // Add Offer
      const addoffer = async (offer) => {
        const res = await axios.post('http://localhost:3001/offer', 
        { tech_id: 12, 
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
        // {
        //   method: 'POST',
        //   headers: {
        //     'Content-type': 'application/json',
        //   },
        //   body: JSON.stringify(offer),
        // })
      
        const data = res.data;
      
        setoffers([...offers, data])
      }

      const deleteorder = async (id) => {
        const res = await fetch(`http://localhost:5000/orders/${id}`, {
          method: 'DELETE',
        })
        //We should control the response status to decide if we will change the state or not.
        res.status === 200
          ? setorders(orders.filter((order) => order.id !== id))
          : alert('Error Deleting This order')
      }


      const togglehighlight = async (id) => {
        const worktotoggle = await fetchorder(id)
        const updwork = { ...worktotoggle, featured: !worktotoggle.featured }
    
        const res = await fetch(`http://localhost:5000/orders/${id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(updwork),
        })
    
        const data = await res.json()
    
        setorders(
          orders.map((item) =>
            item.id === id ? { ...item, featured: data.featured } : item
          )
        )
      }

      const onDone = async (id) => {
        const doneorder = await fetchorder(id)
        const updorder = { ...doneorder, status: "previous" }
    
        const res = await fetch(`http://localhost:5000/orders/${id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(updorder),
        })
    
        const data = await res.json()
    
        setorders(
          orders.map((item) =>
            item.id === id ? { ...item, status: data.status } : item
          )
        )
      }

      const onAccept = async (id) => {
        const acceptedorder = await fetchorder(id)
        const updorder2 = { ...acceptedorder, status: "upcoming" }
    
        const res = await fetch(`http://localhost:5000/orders/${id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(updorder2),
        })
    
        const data = await res.json()
    
        setorders(
          orders.map((item) =>
            item.id === id ? { ...item, status: data.status } : item
          )
        )
      }

      const edittech = async(id,newtech) =>{
        const techtoupdate = await fetchtech(id)
        const updtech ={...techtoupdate,...newtech}

        const res = await fetch(`http://localhost:5000/techs/${id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(updtech),
        })
    
        const data = await res.json()

        settechs(
          techs.map((item) =>
            item.id === id ? { ...item, name: data.name } : item
          )
        )
      }

    return (<div className='App'>
        <BrowserRouter>
      <Navbar />
      <Routes>
      <Route exact path="/" element={<Home />}/>
        <Route exact path="/Account" element={<Account tech={tech} />}/>
        <Route exact path="/Orders" element={<Orders orders={orders} ondelete={deleteorder} onDone={onDone} onAccept={onAccept} onToggle={togglehighlight}/>}/>
        <Route exact path="/Offers" element={<Offers offersdata={offers} OnDelete={deleteOffer} OnAdd={addoffer}/>}/>
        <Route exact path="/FeaturedWork" element={<FeaturedWork PrevWork={orders} onToggle={togglehighlight}/>}/>
        
        <Route exact path="/EditProfile" element={<EditProfile tech={tech} edittech={edittech}/>}/>

        <Route exact path="/AddOffer" element={<AddOffer OnAdd={addoffer}/>}/>
      </Routes>
    </BrowserRouter>

    </div>)
}

export default TechApp
