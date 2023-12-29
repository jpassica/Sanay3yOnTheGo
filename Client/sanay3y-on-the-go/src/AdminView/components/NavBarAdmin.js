    import React from 'react'
    import { NavLink } from "react-router-dom";
    import '../styles/navAdmin.css'
import { useParams } from 'react-router-dom';
const NavBarAdmin = () => {
    const { id } = useParams();
    const adminId = id;
    return (
        
        <nav className="navbar">
        
            <div className="container">
        <div className='nav-list'>
            <ul className='navitems'>
            <li>
                <NavLink to={`/AdminHome/${adminId}`}>Home</NavLink>
            </li>
            <li>
                <NavLink to={`/Feedbacks/${adminId}`}>Feedback</NavLink>
            </li>
            <li>
                <NavLink to={`/Complaints/${adminId}`}>Complaints</NavLink>
            </li>       
            <li>
                <NavLink to={`/Technicians/${adminId}`}>Technicians</NavLink>
            </li>
            <li>
                <NavLink to={`/CreateBundle/${adminId}`}>Create Bundles</NavLink>
            </li>
            <li>
                <NavLink to={`/AddAdmin/${adminId}`}>Add Admin</NavLink>
            </li>            
            <li>
                <NavLink to={`/Services/${adminId}`}>Edit Services</NavLink>
            </li>   
            <li>
                <NavLink to={`/Account/${adminId}`}>Account</NavLink>
            </li>                     
            </ul>
        </div>
        </div>
    </nav>
    )
    }

    export default NavBarAdmin
