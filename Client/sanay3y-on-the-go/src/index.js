import React from 'react';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import TechApp from './TechApp';
<<<<<<< Updated upstream

=======
import CustApp from './CustApp';
import Login from './Login';
>>>>>>> Stashed changes

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  
  <React.StrictMode>
    <App/>
     {/*
    <CustApp />
  <BrowserRouter>
  </BrowserRouter>
<<<<<<< Updated upstream
     {/* <App/> */}
=======
  
      <App />
      
      */}
>>>>>>> Stashed changes
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

