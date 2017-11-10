import PropTypes from 'prop-types';
import React from 'react';
import GoogleLogin from 'react-google-login';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  root: {
    display: 'flex',
    marginTop: 100,
    justifyContent: 'center',
    alignContent: 'center',
  },
  button: {
    padding: 10
  }
}

const LogIn = () => {

  return (
    <div style={styles.root}>
      <a href="auth/google_oauth2">
        <RaisedButton syle={styles.button} primary={true}>
          Login with Google
        </RaisedButton>
      </a>
    </div>
  );
};


export default LogIn;
