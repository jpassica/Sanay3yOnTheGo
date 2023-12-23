import React from 'react'
import OfferCard from '../components/OfferCard'
import UploadOffer from '../components/UploadOffer'
import '../styles/offers.css'
import { Link,useMatch,useResolvedPath } from 'react-router-dom'


const Offers = ({offersdata,OnDelete,OnAdd}) => {
  return (
    <>
    <CustomLink to="/AddOffer"><button className='offerbtn'>Add New Offer</button></CustomLink>
    
    <div className='cards'>
      {offersdata.map((item,index)=>
      (<OfferCard key={index} offer={item} OnDelete={OnDelete}/>)
      )}</div>
    </>
  )
}

function CustomLink({to,children,...props})
{
    const topath=useResolvedPath(to)
    const isActive = useMatch({path: topath.pathname,end: true})
    return(
        <div className={isActive?"activate":""}>
            <Link to={to} {...props}>
                {children}
            </Link>

        </div>
    )

}

export default Offers