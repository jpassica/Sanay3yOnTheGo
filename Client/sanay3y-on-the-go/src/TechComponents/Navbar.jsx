import React from 'react'
import { Link,useMatch,useResolvedPath } from 'react-router-dom'
import './styles/general.css'
import './styles/navbar.css'

function Navbar() {
  return (
    <nav className='navbartech'>
        <img/>
        <div className='navtech-elements'>
        <ul className='navitems'>
            <li><Link to="/" className='Home'>
                Home
            </Link></li>
            <CustomLink to="/Account">Account</CustomLink>
            <CustomLink to="/Offers">Offers</CustomLink>
            <CustomLink to="/FeaturedWork">Highlights</CustomLink>
            <CustomLink to="/Orders">Orders</CustomLink>
        </ul>
        </div>
      
    </nav>
  )
}

function CustomLink({to,children,...props})
{
    const topath=useResolvedPath(to)
    const isActive = useMatch({path: topath.pathname,end: true})
    return(
        <li className={isActive?"activate":""}>
            <Link to={to} {...props}>
                {children}
            </Link>

        </li>
    )

}

export default Navbar
