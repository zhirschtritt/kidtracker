import React from 'react';
import { Link } from 'react-router';
import NavBar from './NavBar';
import BackButton from './BackButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';
import Login from './Login';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizations: [],
      defaultOrganization: {},
      locations: [],
      user: {},
    };
    this.loadOrganizations = this.loadOrganizations.bind(this);
    this.loadUser = this.loadUser.bind(this);
  }

  loadOrganizations() {
    axios.get('/api/v1/organizations')
    .then(response => {
      this.setState({
        organizations: response.data.organizations,
        defaultOrganization: response.data.default_organization,
      });
    }).catch(err => console.log(err));
  }

  loadUser() {
    axios.get('/api/v1/user')
    .then(response => {
      this.setState({
        user: response.data,
        loggedIn: true,
      });
      this.loadOrganizations();
    }).catch(err => this.setState({ loggedIn: false }));
  }

  componentDidMount() {
    this.loadUser();
  }

  render() {
    let loadApp = <Login />;
    if (this.state.loggedIn) {
      loadApp = this.props.children;
    }

    return(
      <MuiThemeProvider>
        <div>
          <NavBar
            user={this.state.user}
            organizations={this.state.organizations}
            defaultOrganization={this.state.defaultOrganization}
          />
          {loadApp}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
