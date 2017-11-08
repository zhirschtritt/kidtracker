import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import {cyan500} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { sortBy, find } from 'lodash';
import { observer, inject } from 'mobx-react';

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

@inject('eventStore','locationStore', 'kidStore') @observer
class LocationsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd = (result) => {
    const { kidStore } = this.props;
    const { eventStore, locationStore } = this.props;
    if (!result.destination) {
      console.log("bad drop!")
    } else {
      const location_id = parseInt(result.destination.droppableId);
      const kid_id = result.draggableId;
      const kid = find(kidStore.kids, ['id', kid_id]);
      eventStore.new(kid_id, location_id);
      locationStore.update(kid, location_id);
    }
  }

  componentDidMount() {
    setInterval(()=>{this.props.locationStore.updateKidTimes()}, (60 * 1000))
  }

  handleOpen = (e) => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };


  render() {
    const { locationStore } = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />
    ];

    let locations = locationStore.locations.map(location => {
      let key = `${location.name}${location.id}`
      return(
        <Paper zDepth={2} style={styles.locationColumn} key={key}>
          <List>
            <div style={styles.title}>
              <h2>{location.name}</h2>
              <p>{location.kids.length}</p>
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
                              primaryText={kid.full_name}
                              secondaryText={kid.timeSinceMove}
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

    locations = sortBy(locations, ['key'])


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
