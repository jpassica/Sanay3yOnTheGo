    import React from 'react'
    import { NavLink } from "react-router-dom";
    import '../styles/navbar.css'

    const NavBarAdmin = () => {
    return (
        <nav className="navbar">
        <div className="container">
        <div className="logo">
        </div>
        <div className="nav-list">
            <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/Feedback">Feedback</NavLink>
            </li>
            <li>
                <NavLink to="/Customers">Customers</NavLink>
            </li>
            <li>
                <NavLink to="/Complaints">Complaints</NavLink>
            </li>
            <li>
                <NavLink to="/Technicians">Technicians</NavLink>
            </li>
            <li>
                <NavLink to="/Account">Account</NavLink>
            </li>
            </ul>
        </div>
        </div>
    </nav>
    )
    }

    export default NavBarAdmin
