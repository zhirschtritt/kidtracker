import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {pinkA200, transparent} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import {blue300, indigo900} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  root: {
    display:'flex',
    flexDirection: 'row',
    margin: '20px',
  },
  gridItem: {
    flexGrow: 1,
    flexWrap: 'nowrap',
  },
  chip: {
    margin: 4,
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
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
  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     organizations: nextProps.organizations,
  //     selectedOrganization: nextProps.selectedOrganization,
  //   });
  // }


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
        <List key={location.id}>
          <h3>{location.name}</h3>
            {location.kids.map(kid => (
              <ListItem
                key={kid.id}
                >
                <Chip
                  onClick={e=>this.handleOpen(e)}
                  value={kid}
                  style={styles.chip}
                >
                  <Avatar size={32} color={blue300} backgroundColor={indigo900}>
                    {kid.first_name[0]}
                  </Avatar>
                  {kid.first_name + ' ' + kid.last_name}
                </Chip>
              </ListItem>
            ))}
        </List>
      );

    });
    return(
      <div style={styles.root}>
          {locations}
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
