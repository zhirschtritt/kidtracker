import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import Main from './components/Main';
import LogIn from './components/LogIn';
import App from './components/App';
import Admin from './components/Admin';
import { Provider } from 'mobx-react';
import kidStore from './stores/KidStore';
import uiStore from './stores/UIStore';
import locationStore from './stores/LocationStore';
import eventStore from './stores/EventStore';
import organizationStore from './stores/OrganizationStore';
import Logs from './components/Logs';

const stores = { kidStore, locationStore, eventStore, organizationStore, uiStore };
window._____APP_STATE_____ = stores;

const KidTracker = (props) => (
  <Provider {...stores}>
    <Router history={browserHistory}>
      <Route path='/' component={Main} >
        <IndexRoute component={App} />
        <Route path="/login" component={LogIn} />
        <Route path="/admin" component={Admin} />
        <Route path="/logs" component={Logs} />
      </Route>
    </Router>
  </Provider>
);

export default KidTracker;
