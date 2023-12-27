import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import ProfilePage from './ProfilePage';
const App = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [isLogInSuccess, setIsLogInSuccess] = useState(false);
  const [client_id, setClient_id] = useState('');
  const [type, setType] = useState('');

  const handleLoginSuccess = () => {
    setIsLogInSuccess(true);
    setShowLogin(true); // Reset to show the Login form after successful sign-up
  };

  const handleSignUpSuccess = () => {
    setIsSignUpSuccess(true);
    setShowLogin(false); // Reset to show the Login form after successful sign-up
  };

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const navStyle = {
    background: '#FFDD61',
    width: '1535px',
    height: '56px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  };
  const switchPageStyle = {
    color: 'black',
    background: '#fff',
    width: '935px',
    height: '56px',
    margin: '0 0 0 600px',
    lineHeight: '56px',
  };

  return (
    <div className="App">
      { isSignUpSuccess ? (
        <Login />
      ) : showLogin ? (
        <>
            <Login onLogInSuccess={handleLoginSuccess} />
            <div style={navStyle}>
                <p style={switchPageStyle}>
                  Already have an account?{' '}
                  <span onClick={toggleForm} style={{ cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }}>
                    Switch to Login
                  </span>
                </p>
              </div>
        </>
      ) :
        isLogInSuccess ? (
            <>
                let {type} = 'a';
            <ProfilePage type={'a'} id={client_id} />
          </>
        ):
          (
            <>
              <SignUp onSignUpSuccess={handleSignUpSuccess} />
              <div style={navStyle}>
                <p style={switchPageStyle}>
                  Already have an account?{' '}
                  <span onClick={toggleForm} style={{ cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }}>
                    Switch to Login
                  </span>
                </p>
              </div>
            </>
          )}
          </div>
  );

}

export default App;
