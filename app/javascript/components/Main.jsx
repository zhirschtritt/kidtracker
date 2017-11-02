import React from 'react';
import { Link } from 'react-router';
import NavBar from './NavBar';
import BackButton from './BackButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';
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

  // loadUser() {
  //   axios.get('/api/v1/organizations')
  //   .then(response => {
  //
  //   });
  // }

  componentDidMount() {
    this.loadOrganizations();
  }

  render() {
    return(
      <MuiThemeProvider>
        <div>
          <NavBar
            organizations={this.state.organizations}
            defaultOrganization={this.state.defaultOrganization}
          />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
