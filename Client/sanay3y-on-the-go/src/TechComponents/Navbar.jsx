import React from 'react'
import { Link,useMatch,useResolvedPath } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='navbar'>
        <img/>
        <ul className='navitems'>
            <li><Link to="/" className='Home'>
                Home
            </Link></li>
            <CustomLink to="/Account">Account</CustomLink>
            <CustomLink to="/Offers">Offers</CustomLink>
            <CustomLink to="/FeaturedWork">Highlights</CustomLink>
            <CustomLink to="/Orders">Orders</CustomLink>
        </ul>
      
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
