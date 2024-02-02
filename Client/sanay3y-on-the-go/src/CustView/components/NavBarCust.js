import React from "react";
import { NavLink, useParams } from "react-router-dom";
import "../styles/navbar.css";

const NavBarCust = () => {
  const{id}=useParams()
  console.log("navbar",id)
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo"></div>
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to={"/CustomerHome/"+id}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/CustomerOrders/"+id}>Orders</NavLink>
            </li>
            <li>
              <NavLink to={"/wallet/"+id}>Wallet</NavLink>
            </li>
            <li>
              <NavLink to={"/account/"+id}>Account</NavLink>
            </li>
            {/* <li>
              <NavLink to={"/bundles/"+id}>Bundles</NavLink>
            </li> */}
            <li>
              <NavLink to={"/feedback/"+id}>Feedback</NavLink>
            </li>
            <li>
              <NavLink to={"/notifications/"+id}>Notifications</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBarCust;
