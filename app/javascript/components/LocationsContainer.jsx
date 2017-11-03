import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {pinkA200, transparent} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import {blue300, indigo900} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  root: {
    display:'flex',
    flexDirection: 'row',
    margin: '20px',
  },
  locationColumn: {
    flexGrow: 1,
    flexWrap: 'wrap',
    margin: 10
  },
  chip: {
    margin: 4,
  },
  title: {
    color: 'rgb(0, 188, 212)',
    display: 'flex',
    justifyContent: 'center',
  },
};

class LocationsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleOpen = (e) => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />
    ];

    const locations = this.props.locations.map(location => {
      return(
        <Paper zDepth={2} style={styles.locationColumn} key={location.id}>
          <List>
            <div style={styles.title}>
              <h2>{location.name}</h2>
            </div>
            {location.kids.map(kid => (
              <ListItem
                primaryText={kid.first_name + ' ' + kid.last_name}
                secondaryText="time since kid arrived"
                key={kid.id}
                onClick={e=>this.handleOpen(e)}
                value={kid}
              >
              </ListItem>
            ))}
          </List>
        </Paper>
      );

    });
    return(
      <div>
        <div style={styles.root}>
            {locations}
        </div>
        <Dialog
          title="Kid Info"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          >
            <h3>WOW! So much info about this kid! Just look at it all!</h3>
        </Dialog>
      </div>
    );
  }
}

export default LocationsContainer;
