import React from 'react'
import { Link,useMatch,useResolvedPath } from 'react-router-dom'


function EditProfile({name,onChangeFirstName}) {

    

  return (
    <div>
			<div class="container bootstrap snippets bootdey">
            {/* <h2 class="mt-5 ml-5">Edit Details</h2> */}
      <hr/>
	<div class="row">
      
      <div class="col-md-3">
        <div class="text-center">
          <img src="https://bootdey.com/img/Content/avatar/avatar7.png" class="avatar img-circle img-thumbnail" alt="avatar"/>
          <h6>Upload a different photo...</h6>
          
          <input type="file" class="form-control"/>
        </div>
      </div>
      
      
      <div class="col-md-9 personal-info">
        {/* <div class="alert alert-info alert-dismissable">
          <a class="panel-close close" data-dismiss="alert">×</a> 
          <i class="fa fa-coffee"></i>
          This is an <strong>.alert</strong>. Use this to show important messages to the user.
        </div> */}
        <h3>Edits Details</h3>
        
        <form class="form-horizontal" role="form">
          <div class="form-group">
            <label class="col-lg-3 control-label">Full Name:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text"  placeholder={name}/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Phone Number:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" />
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Email:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" />
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Service:</label>
            <div class="col-lg-8">
              <div class="ui-select">
                <select id="user_time_zone" class="form-control">
                  <option value="Plumping">Plumping</option>
                  <option value="Carpentry">Carpentry</option>
                  <option value="Housekeep">House Keeping</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Area:</label>
            <div class="col-lg-8">
              <div class="ui-select">
                <select id="user_time_zone" class="form-control">
                  <option value="Cairo">Cairo</option>
                  <option value="Alex">Alexandria</option>
                </select>
              </div>
            </div>
          </div>
        </form>
        <CustomLink to="/Account"><input type='submit' value={"Submit Changes"} class="btn btn-warning btn-block my-5 editbtn"/>
                </CustomLink>
      </div>
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

export default EditProfile
