import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import {cyan500} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
var _ = require('lodash');

const styles = {
  root: {
    display:'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: '20px',
  },
  locationColumn: {
    flexGrow: 1,
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
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      locations: nextProps.locations
    })
  }

  onDragEnd = (result) => {
  // dropped outside the list
    if (!result.destination) {
      console.log("bad drop!")
    } else {
      const location_id = result.destination.droppableId;
      console.log(location_id);
      const kid_id = result.draggableId;
      this.props.handleNewEvent(kid_id, location_id);
    }
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


    let locations = this.props.locations.map(location => {
      let key = `${location.name}${location.id}`
      return(
        <Paper zDepth={2} style={styles.locationColumn} key={key}>
          <List>
            <div style={styles.title}>
              <h2>{location.name}</h2>
            </div>
             <Droppable droppableId={`${location.id}`}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef}
                     style={{ backgroundColor: snapshot.isDraggingOver ? cyan500 :'' }}
                  >
                {location.kids.map(kid => (
                    <Draggable key={kid.id} draggableId={kid.id}>
                      {(provided, snapshot) => (
                        <div>
                          <div ref={provided.innerRef}
                            style={provided.draggableStyle}
                            {...provided.dragHandleProps}
                          >
                            <ListItem
                              primaryText={kid.first_name + ' ' + kid.last_name}
                              secondaryText="time since kid arrived"
                              key={kid.id}
                              onClick={e=>this.handleOpen(e)}
                              value={kid}
                            />
                          </div>
                          {provided.placeHolder}
                        </div>
                      )}
                    </Draggable>
                ))}
              </div>
              )}
            </Droppable>
          </List>
        </Paper>
      );
    });

    locations = _.sortBy(locations, ['key'])


    return(
      <div>
        <div style={styles.root}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            {locations}
          </DragDropContext>
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
