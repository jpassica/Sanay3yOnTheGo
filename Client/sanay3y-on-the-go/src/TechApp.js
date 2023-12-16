import React, { useState } from 'react'
import {useEffect} from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './TechRoutes/Home'
import Account from './TechRoutes/Account'
import Orders from './TechRoutes/Orders'
// import Profile from './routes/Profile'
import FeaturedWork from './TechRoutes/FeaturedWork'
import Offers from './TechRoutes/Offers'
import Navbar from './TechComponents/Navbar'
import EditProfile from './TechRoutes/EditProfile'



const TechApp = () =>
{
    const[offers,setoffers]=useState([])
    const[prevwork,setprevwork]=useState([])
    const[techs,settechs]=useState([])


    const fetchtechs=async ()=>
    {
      const res=await fetch('http://localhost:5000/techs')
      const data=await res.json()
      console.log(data)
      return data
    }

    useEffect(()=>
      {
        const gettechs=async()=>{
      const techsfromserver=await fetchtechs()
      settechs(techsfromserver)
       }
      gettechs()
        },[])
      console.log(techs)

    const fetchoffers=async ()=>
    {
      const res=await fetch('http://localhost:5000/offers')
      const data=await res.json()
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
      const res=await fetch('http://localhost:5000/prevwork')
      const data=await res.json()
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
        const res = await fetch(`http://localhost:5000/prevwork/${id}`)
        const data = await res.json()
    
        return data
      }

      const deleteOffer = async (id) => {
        const res = await fetch(`http://localhost:5000/offers/${id}`, {
          method: 'DELETE',
        })
        //We should control the response status to decide if we will change the state or not.
        res.status === 200
          ? setoffers(offers.filter((offer) => offer.id !== id))
          : alert('Error Deleting This Task')
      }

       // Add Task
      const addoffer = async (offer) => {
        const res = await fetch('http://localhost:5000/offers', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(offer),
        })
      
        const data = await res.json()
      
        setoffers([...offers, data])
      }


      const togglehighlight = async (id) => {
        const worktotoggle = await fetchwork(id)
        const updwork = { ...worktotoggle, featured: !worktotoggle.featured }
    
        const res = await fetch(`http://localhost:5000/prevwork/${id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(updwork),
        })
    
        const data = await res.json()
    
        setprevwork(
          prevwork.map((item) =>
            item.id === id ? { ...item, featured: data.featured } : item
          )
        )
      }


    return (<div className='App'>
        <Navbar/>
        <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/Account" element={<Account techs={techs} />}/>
        <Route exact path="/Orders" element={<Orders/>}/>
        <Route exact path="/Offers" element={<Offers offersdata={offers} OnDelete={deleteOffer} OnAdd={addoffer}/>}/>
        <Route exact path="/FeaturedWork" element={<FeaturedWork PrevWork={prevwork} onToggle={togglehighlight}/>}/>
        <Route exact path="/EditProfile" element={<EditProfile/>}/>
        </Routes>
    </div>)
}

export default TechApp