
import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

const App = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const navStyle = {
    background: '#FFDD61',
    width: "1535px",
    height: "56px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };
  const switchPageStyle = {
    color: 'black',
    background: '#fff',
    width: "935px",
    height: "56px",
    margin: "0 0 0 600px",
    lineHeight: "56px",
  };
  
  return (

    <div className="App">
      {showLogin ? (
        <>
          <Login />
          <div style={navStyle}>
              <p style={switchPageStyle}>
              Don't have an account?{' '}
        
            <span onClick={toggleForm} style={{cursor: "pointer", textDecoration:'underline', fontWeight:'bold'}}>Switch to Sign Up</span>
              </p>
          </div>
        </>
      ) : (
        <>
          <SignUp />
            <div style={navStyle}>
              <p style={switchPageStyle}>
              Already have an account?{' '}
                <span onClick={toggleForm} style={{cursor: "pointer", textDecoration:'underline', fontWeight:'bold'}}>Switch to Login</span>
              </p>
            
          </div>
        </>
      )}
    </div>
  );
};

export default App;
