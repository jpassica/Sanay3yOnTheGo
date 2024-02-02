import React from "react";
import { NavLink, useParams } from "react-router-dom";
import "../../CustView/styles/navbar.css";

const NavbarTechnician = () => {
  const{id}=useParams()
  console.log("navbar",id)
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo"></div>
        <div className="nav-elements">
          <ul>
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
                        <NavLink to={"/TechFeedback/"+id}>FeedBack</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/TechNotifications/"+id}>Notifications</NavLink>

                    </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarTechnician;


