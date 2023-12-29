import React from 'react';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Sanay3y from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Sanay3y />
    {/*
    <Sanay3y />
    <CustApp />  
    <App />  
  */}
  {/* <CustApp /> */}
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

