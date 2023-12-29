import React from 'react'
import { NavLink } from "react-router-dom";
import '../../AdminView/styles/navAdmin.css'
import { useParams } from 'react-router-dom';
import '../styles/navbar.css'
const Navbar=()=> {
    const { id } = useParams();
    const techId = id;
    <nav className="navbar">
    
        <div className="container">
            <div className='nav-list'>
                <ul className='navitems'>
                    <li>
                        <NavLink to={`/TechnicianHome/${techId}`}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={`/Offers/${techId}`}>Offers</NavLink>
                    </li>
                    <li>
                        <NavLink to={`/FeaturedWork/${techId}`}>Highlights</NavLink>
                    </li>
                    <li>
                        <NavLink to={`/Orders/${techId}`}>Orders</NavLink>
                    </li>
                    <li>
                        <NavLink to={`/Account/${techId}`}>Account</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>   
}    
export default Navbar
// )
// const { id } = useParams();
// const techId = id;
// return (
    
//     <nav className="navbar">
    
//         <div className="container">
//     <div className='nav-list'>
//         <ul className='navitems'>
//         <li>
//             <NavLink to={`/TechnicianHome/${techId}`}>Home</NavLink>
//         </li>
//         <li>
//             <NavLink to={`/Offers/${techId}`}>Offers</NavLink>
//         </li>
//         <li>
//             <NavLink to={`/FeaturedWork/${techId}`}>Highlights</NavLink>
//         </li>       
//         <li>
//             <NavLink to={`/Orders/${techId}`}>Orders</NavLink>
//         </li>   
//         <li>
//             <NavLink to={`/Account/${techId}`}>Account</NavLink>
//         </li>                     
//         </ul>
//     </div>
//     </div>
// </nav>
// )
// }


// export default Navbar
