import React from 'react'
import toolimg from '../img/img1.png'
import techimg from '../img/tech.png'
import eclipse from '../img/Ellipse.png'
import '../styles/home.css'


const TechnicianHome = () => {
  return (
    <div className='home'>
        <div className='Welcome'>
        <img src={eclipse} alt="img1" height={500} width={450} style={{opacity:"1", position:"absolute", top:"-250px",left:"-770px"}}/>
            <h2>Welcome to</h2>
            <h1>Sany3y On The Go!</h1>
            <img src={toolimg} alt="img1" height="550px" width="550px" style={{opacity:"0.3", position:"absolute", top:"-200px",left:"213px",background:'transparent'}}/>
            <img src={techimg} alt="img1" height={300} width={300} style={{opacity:"0.9", position:"absolute", top:"-5px",left:"-430px",background:'transparent'}}/>
        </div>
    </div>
  )
}

export default TechnicianHome
