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
import AddAdmin from './AdminView/routes/AddAdmin';

//Technician routes
import TechnicianHome from './TechView/routes/TechnicianHome';
import NavbarTechnician from './TechView/components/NavbarTechnician';
import Orders from './TechView/routes/Orders';
import Offers from './TechView/routes/Offers';
import FeaturedWork from './TechView/routes/FeaturedWork';
import AddOffer from './TechView/routes/AddOffer';
import TechNotifications from './TechView/routes/Notifications';

//Customer routes
import CustomerHome from './CustView/Routes/Home';
import Bundles from './CustView/Routes/Bundles';
import NavBarCust from './CustView/components/NavBarCust';
import TechDetails from './CustView/Routes/TechDetails';
import ReviewOrder from './CustView/Routes/ReviewOrder';
import CancelOrder from './CustView/Routes/CancelOrder';
import Wallet from './CustView/Routes/Wallet';
import Feedback from './CustView/Routes/Feedback';
import Notifications from './CustView/Routes/Notifications';
import CustomerOrders from './CustView/Routes/Orders'



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
        {/* <Route exact path={`/CreateBundle/:id`} element={<><NavBarAdmin/><CreateBundle /></>} /> */}
        <Route exact path={`/Feedbacks/:id`} element={<><NavBarAdmin/><FeedbacksPage /></>} />                  
        <Route exact path={`/Complaints/:id`} element={<><NavBarAdmin/><ComplainsPage /></>} />          
        <Route exact path={`/Services/:id`} element={<><NavBarAdmin /><ServicesPage /></>} />
        <Route exact path={`/AddAdmin/:id`} element={<><NavBarAdmin /><AddAdmin /></>} />

          {/* Technician general routes*/}
        <Route exact path={`/TechnicianHome/:id`} element={<><NavbarTechnician/><TechnicianHome /></>} />          
        <Route exact path="/Orders/:id" element={<><NavbarTechnician/><Orders /></>}/>
        <Route exact path="/Offers/:id" element={<><NavbarTechnician/><Offers/></>}/>
        <Route exact path="/FeaturedWork/:id" element={<><NavbarTechnician/><FeaturedWork /></>}/>
        <Route exact path="/AddOffer/:id" element={<><NavbarTechnician/><AddOffer/></>}/>
        <Route path="/TechNotifications/:id" element={<><NavbarTechnician/><TechNotifications /></>}/>
        <Route exact path="/TechFeedback/:id" element={<><NavbarTechnician/><Feedback/></>}/>

          {/* Customer general routes*/}
        <Route exact path={`/CustomerHome/:id`} element={<><NavBarCust/><CustomerHome /></>} />          
        {/* <Route exact path={`/Bundles/:id`} element={<><NavBarCust /><Bundles /></>} />  */}
        <Route path="/TechDetails/:id/:TechId" element={<><NavBarCust /><TechDetails  /></>}/>
        <Route exact path={`/CustomerOrders/:id`} element={<><NavBarCust /><CustomerOrders /></>} />
        <Route path="/ReviewOrder/:id/:OrderId" element={<><NavBarCust /><ReviewOrder /></>} />
        <Route path="/CancelOrder/:id/:OrderId" element={<><NavBarCust /><CancelOrder /></>} />
        <Route path="/wallet/:id" element={<><NavBarCust /><Wallet /></>}/>
        <Route path="/bundles/:id" element={<><NavBarCust /><Bundles /></>} />
        <Route path="/feedback/:id" element={<><NavBarCust /><Feedback /></>} />
        <Route path="/notifications/:id" element={<><NavBarCust /><Notifications /></>}/>
      </Routes>
      </BrowserRouter>
  );
};

export default Sanay3y;