// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import ProfilePage from './ProfilePage';

function Sanay3y() {
  const type='a';
  let id=3;
  return (
    <Router>
      <Switch>
        <Route path="/Login" element={<Login id={id} type={type}/> } />
        <Route path="/SignUP" element={<SignUp id={id} type={type}/>} />
        <Route path="/profile" element={<ProfilePage id={id} type={'a'} />} />
      </Switch>
    </Router>
  );
}

export default Sanay3y;
