import PropTypes from 'prop-types';
import React from 'react';
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
        <RaisedButton
          label="Log In with Google"
           onClick={()=>window.location='auth/google_oauth2'} syle={styles.button}
           primary={true}
         />
    </div>
  );
};


export default LogIn;
