import React from 'react';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';


const BackButton = () => {
  return(
    <RaisedButton
      onClick={browserHistory.goBack}
      label="Back"
    />
  );
};

export default BackButton;
