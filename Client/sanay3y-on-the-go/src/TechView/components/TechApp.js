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



const TechApp = () =>
{
    const[offers,setoffers]=useState([])
    const[prevwork,setprevwork]=useState([])
    const[techs,settechs]=useState([])
    const[orders,setorders]=useState([])
    const[tech,settech]=useState();
    const [services, setServices] = useState([]);

    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:3001/services');
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching services:', error.message);
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


  const edittech = async(id,newtech) =>{
    const techtoupdate = await fetchtech(id)
    const updtech ={...techtoupdate,...newtech}

    const res = await axios.post(`http://localhost:3001/user/12`, 
    {
      tech_id:12,
    FullName: newtech.fname,
    Email: newtech.email,
    Address: newtech.area,
    Phone_Number: newtech.number,
    name:newtech.service
    },
    {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      }
    })

    const data = res.data;
    settech(data)
  }








      
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
        const updorder = { ...doneorder, status: "F" }
    
        const res = await axios.patch(`http://localhost:3001/order/${id}`, 
        {
          updorder
        },
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
          },
        })
    
        const data =  res.data
    
        setorders(
          orders.map((item) =>
            item.order_id === id ? { ...item, order_status: data.order_status } : item
          )
        )
      }

      const onAccept = async (id) => {
        const acceptedorder = await fetchorder(id)
        const updorder2 = { ...acceptedorder, order_status: "U" }
    
        const res = await axios.patch(`http://localhost:3001/order/${id}`,
        {
          updorder2
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

      const deleteorder = async (id) => {
        const res = await axios.delete(`http://localhost:3001/order/${id}`)
        //We should control the response status to decide if we will change the state or not.
        res.status === 200
          ? setorders(orders.filter((order) => order.order_id !== id))
          : alert('Error Deleting This order')
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
        
        <Route exact path="/EditProfile" element={<EditProfile tech={tech} edittech={edittech} services={services}/>}/>

        <Route exact path="/AddOffer" element={<AddOffer OnAdd={addoffer}/>}/>
      </Routes>
    </BrowserRouter>

    </div>)
}

export default TechApp

