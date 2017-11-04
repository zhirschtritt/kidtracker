import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import Main from './components/Main';
import LogIn from './components/LogIn';
import App from './components/App';
import Admin from './components/Admin';

const KidTracker = (props) => (
    <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
      <Route path='/' component={Main} >
        <IndexRoute component={App} />
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={LogIn} />
      </Route>
    </Router>
);

export default KidTracker;
