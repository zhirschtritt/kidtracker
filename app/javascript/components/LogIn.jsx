import PropTypes from 'prop-types';
import React from 'react';
import GoogleLogin from 'react-google-login';
import RaisedButton from 'material-ui/RaisedButton';

const LogIn = () => {

  return (
    <a href="auth/google_oauth2">
      <RaisedButton>
        Login with Google
      </RaisedButton>
    </a>
  );
};


export default LogIn;
