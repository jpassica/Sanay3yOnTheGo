import React from "react";
import prosrc from "../../TechView/img/profile.png";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "../../TechView/styles/account.css";

const AccountDetails = ({ customer }) => {
  return (
    <div>
      <div class="row justify-content-around mt-5 user-info">
        <div class="col-12 col-md-3">
          <figure class="avatar avatar-profile">
            <img class="rounded-circle img-fluid " src={prosrc} alt="" />
          </figure>
          <CustomLink to="/EditProfile">
            <a
              href="#"
              id="edit_profile"
              class=" btn-primary btn-block my-5 probutton"
            >
              Edit Account Details
            </a>
          </CustomLink>
        </div>
        <div class="col-12 col-md-5 details">
          <h4>Full Name</h4>
          <p>{customer.fullname}</p>

          <h4>Email Address</h4>
          <p>{customer.email}</p>

          <h4>Phone Number</h4>
          <p>{customer.phone_number}</p>

          <h4>Area</h4>
          <p>{customer.address}</p>

          <a href="#" class=" btn-danger btn-block mt-5 probutton">
            Delete Account
          </a>

          <a href="#" class=" btn-primary btn-block mt-3 probutton">
            Sign Out
          </a>
        </div>
      </div>
    </div>
  );
};

function CustomLink({ to, children, ...props }) {
  const topath = useResolvedPath(to);
  const isActive = useMatch({ path: topath.pathname, end: true });
  return (
    <div className={isActive ? "activate" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </div>
  );
}

export default AccountDetails;
