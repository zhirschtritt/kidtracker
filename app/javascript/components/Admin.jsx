import React from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: '20px'
  },
  paper: {
    flexGrow: 1,
    margin: 10
  }
};


class Admin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
 
  return (
    <div style={styles.root}>
      <Paper style={styles.paper} zDepth={3}>
        HERES A PAPER CONTAINTER

      </Paper>
    </div>
  );

}




}

export default Admin;
