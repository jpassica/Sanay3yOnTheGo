import React from 'react'
import '../styles/account.css'
import '../styles/editpage.css';
import Edit from '../components/Edit';



function EditProfile({edittech,techs}) {
    

  return (
    <div>
			<div class="acccontainer container-fluid">
      {techs.filter(tech => tech.logged==true).map((tech,index)=>(
            <Edit key={index} tech={tech} edittech={edittech}/>
            ))} 
    
</div>
		</div>
  )
}



export default EditProfile
