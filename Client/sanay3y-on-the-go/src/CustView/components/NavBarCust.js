import React from 'react'
import { NavLink } from "react-router-dom";
import '../styles/navbar.css'

const NavBarCust = () => {
  return (
    <nav className="navbar">
    <div className="container">
      <div className="logo">
      </div>
      <div className="nav-elements">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/orders">Orders</NavLink>
          </li>
          <li>
            <NavLink to="/wallet">Wallet</NavLink>
          </li>
          <li>
            <NavLink to="/account">Account</NavLink>
          </li>
          <li>
            <NavLink to="/bundles">Bundles</NavLink>
          </li>
          <li>
            <NavLink to="/feedback">Feedback</NavLink>
          </li>
          <li>
            <NavLink to="/notification">Notifications</NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default NavBarCust
