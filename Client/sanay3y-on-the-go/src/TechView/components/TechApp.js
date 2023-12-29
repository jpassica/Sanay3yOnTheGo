import React, { useState } from 'react'
import {useEffect} from 'react'
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Account from '../routes/Account'
import Orders from '../routes/Orders'
import FeaturedWork from '../routes/FeaturedWork'
import Offers from '../routes/Offers'
import Navbar from './Navbar'
import EditProfile from '../routes/EditProfile'
import AddOffer from '../routes/AddOffer'
import axios from "axios";
import {useParams} from 'react-router-dom'


const TechApp = () =>
{
  const {id} = useParams();
    const[offers,setoffers]=useState([])
    const[prevwork,setprevwork]=useState([])
    const[techs,settechs]=useState([])
    const[orders,setorders]=useState([])
    const[tech,settech]=useState();
    const [services, setServices] = useState([]);

    

    const fetchservice=async()=>
    {
      const response = await axios.get('http://localhost:3001/service');
      console.log(response.data);
      return response.data;
    }

    useEffect(()=>{
      const getservices=async()=>{
        const serfromserver = await fetchservice()
        setServices(serfromserver)
      }
      getservices()
    },[])



    const fetchorders=async ()=>
    {
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


    const fetchtech = async () => {
      const res = await axios.get(`http://localhost:3001/user/${id}`)
      const data = res.data;
      return data
    }

    useEffect(()=>
    {const gettech=async()=>{
      const techfromserver=await fetchtech()
      settech(techfromserver)
    }
    gettech()
  },[])


      
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
      console.log(offers)


      const fetchorder = async (orderId) => {
        const res = await fetch(`http://localhost:3001/order/${orderId}`)
        const data = await res.json()
    
        return data
      }



      const deleteOffer = async (orderId) => {
        const res = await axios.delete(`http://localhost:3001/offer/${orderId}`);
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

      const onDone = async (id) => {
        const doneorder = await fetchorder(id)
        const updorder = { ...doneorder, order_status: "F" }
    
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
      


      const edittech = async (newtech) => {
        const res = await axios.patch(
          `http://localhost:3001/user/12`,
          {
            tech_id: 12,
            fullname: newtech.fname,
            email: newtech.email,
            address: newtech.area,
            phone_number: newtech.number,
            name: newtech.service,
          },
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded",
            },
          }
        );
        const data = res.data;
        console.log(data);
        settech(data);
        console.log(tech.name);
      };

     


    return (<div className='App'>
        <BrowserRouter>
      <Navbar />
      <Routes>
      {/* <Route exact path="/" element={<Home />}/> */}
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

