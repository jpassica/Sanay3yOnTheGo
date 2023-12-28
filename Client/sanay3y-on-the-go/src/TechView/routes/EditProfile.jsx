import React from 'react'
import '../styles/account.css'
import '../styles/editpage.css';
import Edit from '../components/Edit';



function EditProfile({edittech,tech,services}) {
    

  return (
    <div>
			<div class="acccontainer container-fluid">

    <Edit tech={tech} edittech={edittech} services={services}/>
    
</div>
		</div>
  )
}



export default EditProfile
