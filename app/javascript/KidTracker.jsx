import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Welcome from './components/Welcome';
import LogIn from './components/LogIn';
import App from './components/App';

const KidTracker = (props) => (
  <Router>
    <Switch>
      <Route
        exact path='/'
        component={Welcome}
      />
      <Route
        path='/login'
        component={LogIn}
      />
      <Route
        path='/app'
        component={App}
      />
    </Switch>
  </Router>
);

export default KidTracker;
