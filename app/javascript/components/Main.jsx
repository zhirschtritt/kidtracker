import React from 'react';
import DevTools from 'mobx-react-devtools';
import { Link } from 'react-router';
import NavBar from './NavBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';
import LogIn from './LogIn';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { observer, inject } from 'mobx-react';

@inject('organizationStore') @observer
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      kids: [],
      user: {},
    };
    this.loadUser = this.loadUser.bind(this);
  }

  loadUser() {
    axios.get('/api/v1/user')
    .then(response => {
      this.setState({
        user: response.data,
        loggedIn: true,
      });
      this.props.organizationStore.fetchAll()
    }).catch(err => {
      this.setState({ loggedIn: false })
    });
  }

  componentDidMount() {
    this.loadUser();
  }

  render() {
    const { organizationStore } = this.props;
    let loadApp = <LogIn />;
    if (this.state.loggedIn) {
      loadApp = this.props.children;
    }

    return(
      <MuiThemeProvider>
        <div>
          <DevTools />
          <NavBar
            user={this.state.user}
            organizations={organizationStore.organizations}
            defaultOrganization={organizationStore.defaultOrganizationId}
          />
          {loadApp}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
