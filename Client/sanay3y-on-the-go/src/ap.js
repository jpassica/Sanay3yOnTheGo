// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import ProfilePage from './ProfilePage';

function Sanay3y() {
  return (
    <Router>
      <Switch>
        <Route path="/Login" component={LoginPage} />
        <Route path="/SignUP" component={HomePage} />
        <Route path="/profile/:type" component={ProfilePage} />
      </Switch>
    </Router>
  );
}

export default Sanay3y;
