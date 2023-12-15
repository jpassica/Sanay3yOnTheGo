import logo from './logo.svg';
import './App.css';

import './components/TechList.css'
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBarCust from './components/NavBarCust';
import Home from './components/Home';

function App() {

  const[technicians,setTechnicians]=useState([])
  const fetchTechnicians=async ()=>
  {
    const res=await fetch('http://localhost:5000/technicians')
    const data=await res.json()
    console.log(data)
    return data
  }
  useEffect(()=>
    {
      const getTechs=async()=>{
    const getTechFromServer=await fetchTechnicians()
    setTechnicians(getTechFromServer)
     }
    getTechs()
      },[])
      console.log(technicians)
  return (
    <>

    
      <BrowserRouter>
      <NavBarCust />
      <Routes>
        <Route path="/" element={<Home techData={technicians} />} />
      </Routes>
    </BrowserRouter>
      </>

  );
}

export default App;
