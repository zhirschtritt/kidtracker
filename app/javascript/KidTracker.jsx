import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import Main from './components/Main';
import LogIn from './components/LogIn';
import App from './components/App';
import Admin from './components/Admin';
import { Provider } from 'mobx-react';
import kidStore from './stores/KidStore';
import locationStore from './stores/LocationStore';
import eventStore from './stores/EventStore';
import organizationStore from './stores/OrganizationStore';

const stores = { kidStore, locationStore, eventStore, organizationStore };
window._____APP_STATE_____ = stores;

const KidTracker = (props) => (
  <Provider {...stores}>
    <Router history={browserHistory}>
      <Route path='/' component={Main} >
        <IndexRoute component={App} />
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={LogIn} />
      </Route>
    </Router>
  </Provider>
);

export default KidTracker;
