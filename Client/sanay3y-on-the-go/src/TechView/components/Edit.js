import React, { useState } from 'react'
import { Link,useMatch,useResolvedPath } from 'react-router-dom'
import '../styles/account.css'
import '../styles/editpage.css';


const Edit = ({tech,edittech}) => {

    let [fname,setfname]=useState("")
    let [number,setnumer]=useState("")
    let [email,setemail]=useState("")
    let [service,setservice]=useState("")
    let [area,setarea]=useState("")



    const onSubmit = (e) => {
        e.preventDefault()
    
        if (fname==""&&email==""&&service==""&&area==""&&number=="") {
          alert('no changes')
          return
        }
        
    
        edittech({ fname, number, email,service,area})
        alert('changes saved')
        setfname('')
        setnumer('')
        setemail('')
        setservice('')
        setarea('')

      }


    

  return (
    <div>

<div className='row justify-content-around mt-5 user-info'>
      <div class="col-12 col-md-3">
      <img src="https://bootdey.com/img/Content/avatar/avatar7.png" class="avatar img-circle img-thumbnail" alt="avatar"/>
          <h6>Upload a different photo...</h6>
          <input type="file" class="form-control"/>
              
                </div>
      
      
      <div class="col-12 col-md-5 details">
        <h3>Personal info</h3>
        
        <form class="form-horizontal" role="form">
          <div class="form-group">
            <label class="col-lg-3 control-label">FULL Name:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" onChange={(e) => setfname(e.target.value)}/>
            </div>
          </div>

          <div class="form-group">
            <label class="col-lg-3 control-label">Phone Number:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" onChange={(e) => setnumer(e.target.value)}/>
            </div>
          </div>

          <div class="form-group">
            <label class="col-lg-3 control-label">Email:</label>
            <div class="col-lg-8">
              <input class="form-control" type="email" onChange={(e) => setemail(e.target.value)}/>
            </div>
          </div>

          <div class="form-group">
            <label class="col-lg-3 control-label">Service:</label>
            <div class="col-lg-8">
              <div class="ui-select">
                <select id="user_time_zone" class="form-control" onChange={(e) => setservice(e.target.value)}>
                  <option value="Plumping">Plumping</option>
                  <option value="AC">AC</option>
                </select>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="col-lg-3 control-label">Area:</label>
            <div class="col-lg-8">
              <div class="ui-select">
                <select id="user_time_zone" class="form-control" onChange={(e) => setarea(e.target.value)}>
                  <option value="Cairo">Cairo</option>
                  <option value="Alexandria">Alexandria</option>
                </select>
              </div>
            </div>
          </div>
          <div className='rowbtn'>

            <div>
          <button onClick={onSubmit} id="edit_profile" class="btn btn-primary  my-4 probutton">Submit Changes</button>
          </div>

          <CustomLink to="/Account">
                    <a href="#" id="edit_profile" class="btn btn-primary  my-4 probutton">
                     Back to your account
                    
                </a>
                </CustomLink>
                </div>
        </form>

      </div>
      </div>
      
    </div>
  )
}

function CustomLink({to,children,...props})
{
    const topath=useResolvedPath(to)
    const isActive = useMatch({path: topath.pathname,end: true})
    return(
        <div className={isActive?"activate":""} >
            <Link to={to} {...props}>
                {children}
            </Link>

        </div>
    )

}

export default Edit
