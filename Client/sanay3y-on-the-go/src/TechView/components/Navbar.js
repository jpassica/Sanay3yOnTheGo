import React from 'react'
import '../../AdminView/styles/navAdmin.css'
import { NavLink, useNavigate, useParams } from "react-router-dom";
import '../styles/navbar.css'

const Navbar=()=> {
    const{id}=useParams()
    const navigate=useNavigate()
    console.log("navbar",id)
    const techId =id;
    return (

    <nav className="navbartech">
        <div className="logo"></div>
    
        <div >
            <div className='nav-list'>
                <ul className='technavitems'>
                    <li>
                        <NavLink to={'/TechnicianHome/'+id}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/Offers/"+id}>Offers</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/FeaturedWork/"+id}>Highlights</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/Orders/"+id}>Orders</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/Account/"+id}>Account</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/Notification/"+id}>Notification</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/TechFeedback/"+id}>FeedBack</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>   )
}    
export default Navbar



