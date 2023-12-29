import React from "react";
import "../../TechView/styles/account.css";
import "../../TechView/styles/editpage.css";
import { useState } from "react";
import { useMatch, Link, useResolvedPath } from "react-router-dom";

function EditProfile({ editcust, customer }) {
  let [fname, setfname] = useState("");
  let [number, setnumer] = useState("");
  let [email, setemail] = useState("");
  let [area, setarea] = useState("");

  const onSubmit = (e) => {
    // e.preventDefault();

    if (fname == "" && email == "" && area == "" && number == "") {
      alert("no changes");
      return;
    }

    if(fname=="")
    {
      setfname(customer.fullname);
    }
    if(email=="")
    {
      setemail(customer.email);
    }
    if(area=="")
    {
      setarea(customer.address);
    }
    if(number=="")
    {
      setnumer(customer.phone_number);
    }

    editcust({ fname, number, email, area }); //post request is here
    console.log(fname)
    alert("changes saved");
    setfname("");
    setnumer("");
    setemail("");
    setarea("");
  };

  return (
    <div>
      <div className="row justify-content-around mt-5 user-info">
        <div class="col-12 col-md-3">
          <img
            src="https://bootdey.com/img/Content/avatar/avatar7.png"
            class="avatar img-circle img-thumbnail"
            alt="avatar"
          />
          <h6>Upload a different photo...</h6>
          <input type="file" class="form-control" />
        </div>

        <div class="col-12 col-md-5 details">
          <h3>Personal info</h3>

          <form class="form-horizontal" role="form">
            <div class="form-group">
              <label class="col-lg-3 control-label">FULL Name:</label>
              <div class="col-lg-8">
                <input
                  class="form-control"
                  type="text"
                  onChange={(e) => setfname(e.target.value)}
                />
              </div>
            </div>

            <div class="form-group">
              <label class="col-lg-3 control-label">Phone Number:</label>
              <div class="col-lg-8">
                <input
                  class="form-control"
                  type="text"
                  onChange={(e) => setnumer(e.target.value)}
                />
              </div>
            </div>

            <div class="form-group">
              <label class="col-lg-3 control-label">Email:</label>
              <div class="col-lg-8">
                <input
                  class="form-control"
                  type="email"
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
            </div>

            <div class="form-group">
              <label class="col-lg-3 control-label">Address:</label>
              <div class="col-lg-8">
                <input
                  class="form-control"
                  type="text"
                  onChange={(e) => setarea(e.target.value)}
                />
              </div>
            </div>

          
            <div className="rowbtn">
              <div>
                <button
                  onClick={onSubmit}
                  id="edit_profile"
                  class=" btn-primary  my-4 probutton"
                >
                  Submit Changes
                </button>
              </div>

              <CustomLink to="/Account">
                <button class=" btn-primary  my-4 probutton">
                  Back to Account
                </button>
              </CustomLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

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

export default EditProfile;
