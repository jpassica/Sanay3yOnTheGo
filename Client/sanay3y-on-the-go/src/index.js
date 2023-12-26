import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import TechApp from './TechView/components/TechApp';
import CustApp from './CustView/components/CustApp';
import AdminApp from './AdminView/components/AdminApp';
import Sanay3y from './ProfilePage';


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <TechApp/>
    {/* <CustApp /> */}
    {/*
    <Sanay3y />
    <AdminApp />
    <CustApp />  
    <App />  
    */}
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

