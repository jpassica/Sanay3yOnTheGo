import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//User general routes
import Login from './UserView/Login';
import SignUp from './UserView/SignUp';
import UserProfile from './UserView/UserProfile';
import EditProfile from './UserView/EditProfile';

//Admin routes
import AdminHome from './AdminView/routes/AdminHome';
import TechniciansPage from './AdminView/routes/TechniciansPage'; 
import CreateBundle from './AdminView/routes/CreateBundle';
import FeedbacksPage from './AdminView/routes/FeedbacksPage';
import ComplainsPage from './AdminView/routes/ComplainsPage';
import ServicesPage from './AdminView/routes/ServicesPage';
import NavBarAdmin from './AdminView/components/NavBarAdmin';

//Technician general routes
import TechnicianHome from './TechView/routes/TechnicianHome';
import Navbar from './TechView/components/Navbar';
import Orders from './TechView/routes/Orders';
import Offers from './TechView/routes/Offers';
import FeaturedWork from './TechView/routes/FeaturedWork';
import AddOffer from './TechView/routes/AddOffer';

//Customer general routes
import CustomerHome from './CustView/Routes/Home';
import Bundles from './CustView/Routes/Bundles';
import NavBarCust from './CustView/components/NavBarCust';
import TechDetails from './CustView/Routes/TechDetails';
import ReviewOrder from './CustView/Routes/ReviewOrder';
import CancelOrder from './CustView/Routes/CancelOrder';
import Wallet from './CustView/Routes/Wallet';
import Feedback from './CustView/Routes/Feedback';
import Notifications from './CustView/Routes/Notifications';



const Sanay3y = () => {
  return (
      <BrowserRouter>
      <Routes>
          {/* User general routes*/}
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route exact path={`/Account/:id`} element={<UserProfile/>} />
        <Route exact path={`/EditProfile/:id`} element={<EditProfile/>} />
        
          {/* Admin routes*/}
        <Route exact path={`/AdminHome/:id`} element={<><NavBarAdmin /><AdminHome /></>} />
        <Route exact path="/Technicians/:id" element={<><NavBarAdmin/><TechniciansPage/></>} />
        <Route exact path={`/CreateBundle/:id`} element={<><NavBarAdmin/><CreateBundle /></>} />
        <Route exact path={`/Feedbacks/:id`} element={<><NavBarAdmin/><FeedbacksPage /></>} />                  
        <Route exact path={`/Complaints/:id`} element={<><NavBarAdmin/><ComplainsPage /></>} />          
        <Route exact path={`/Services/:id`} element={<><NavBarAdmin /><ServicesPage /></>} />

          {/* Technician general routes*/}
        <Route exact path={`/TechnicianHome/:id`} element={<><Navbar/><TechnicianHome /></>} />          
        <Route exact path="/Orders/:id" element={<><Navbar/><Orders /></>}/>
        <Route exact path="/Offers/:id" element={<><Navbar/><Offers/></>}/>
        <Route exact path="/FeaturedWork/:id" element={<><Navbar/><FeaturedWork /></>}/>
        <Route exact path="/AddOffer/:id" element={<><Navbar/><AddOffer/></>}/>

          {/* Customer general routes*/}
        <Route exact path={`/CustomerHome/:id`} element={<><NavBarCust/><CustomerHome /></>} />          
        <Route exact path={`/Bundles/:id`} element={<><NavBarCust /><Bundles /></>} /> 
        <Route path="/TechDetails/id:/:orderId" element={<><NavBarCust /><TechDetails  /></>}/>
        <Route path={`/Orders/:id`} element={<><NavBarCust /><Orders /></>} />
        <Route path="/ReviewOrder//:id/:orderId" element={<><NavBarCust /><ReviewOrder /></>} />
        <Route path="/CancelOrder/:id" element={<><NavBarCust /><CancelOrder /></>} />
        <Route path="/wallet/:id" element={<><NavBarCust /><Wallet /></>}/>
        <Route path="/bundles/:id" element={<><NavBarCust /><Bundles /></>} />
        <Route path="/feedback/:id" element={<><NavBarCust /><Feedback /></>} />
        <Route path="/notifications/:id" element={<><NavBarCust /><Notifications /></>}/>
      </Routes>
      </BrowserRouter>
  );
};

export default Sanay3y;
