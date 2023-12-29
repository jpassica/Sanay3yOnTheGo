import { BrowserRouter , Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBarAdmin from './NavBarAdmin';
import axios from 'axios';
import AdminHome from '../routes/AdminHome';
import FeedbacksPage from '../routes/FeedbacksPage';
import TechniciansPage from '../routes/TechniciansPage';
import CreateBundle from '../routes/CreateBundle';
import ComplainsPage from '../routes/ComplainsPage'
import { useParams } from 'react-router-dom';
function AdminApp() {
  const { id, type } = useParams();
  const adminId = id;
  return (
    <>
      <NavBarAdmin />
      <Routes>
      </Routes>
      {/* <BrowserRouter>
      <AdminProfile />
      <Routes>
      <Route exact path="/" element={<Home complaints={complaints} adminId={id} />} />
          <Route exact path="/Account" element={<AdminProfile adminId={id} />} />
        <Route exact path="/Technicians" element={<TechniciansPage technicians={technicians} adminId={id}/>} />
        <Route exact path="/EditProfile" element={<EditProfile adminId={id} />} />
        <Route exact path="/CreateBundle" element={<CreateBundle adminId={id} />} />
        <Route exact path="/Feedbacks" element={<FeedbacksPage feedbacks={feedbacks} adminId={id}/>} />                  
        <Route exact path="/Complaints" element={<ComplainsPage complaints={complaints} adminId={id}/>} />                  
      </Routes>
    </BrowserRouter> */}
      </>

  );
}

export default AdminApp;
