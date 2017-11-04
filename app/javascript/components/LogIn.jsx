import PropTypes from 'prop-types';
import React from 'react';
import GoogleLogin from 'react-google-login';
import { Form, Icon, Input, Button, Dropdown } from 'semantic-ui-react';

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user: this.props.current_user
    };
  }

  render() {
    let logout = "";
    if (this.state.current_user != null) (
      logout = <div>
        <a href="logout">Log Out</a>
      </div>
    );

    let login = "";
    if(this.state.current_user == null) (
      login =
      <a href="auth/google_oauth2">
        <Button color='google plus'>
          <Icon name='google' />
          Login with Google
        </Button>
      </a>
    );

    return (
      <div>
        {login}
        {logout}
      </div>
    );
  }
}
