import React from 'react';
import {List, ListItem} from 'material-ui/List';
import KidListContainer from './KidListContainer';
import Badge from 'material-ui/Badge';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { cyan500, indigo500 } from 'material-ui/styles/colors';
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
  title: {
    color: cyan500,
    marginTop: 0,
    paddingTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    justifyContent: 'center'
  },
  closeButton: {
    top: 0,
    right: 20,
    // position: 'absolute'
  }
};

@inject('eventStore','locationStore', 'kidStore', 'uiStore') @observer
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
    const { locationStore, kidStore } = this.props;
    setInterval(()=>{
      locationStore.updateKidTimes()}, (30 * 1000)
    )
  }

  handleRemoveLoc(e) {
    const { locationStore, uiStore } = this.props;
    const locationId = parseInt(e.currentTarget.id)
    if (locationStore.isLocationEmpty(locationId)) {
      locationStore.removeLocation(locationId)
    } else {
      uiStore.setDialog({
        message: "Location must not contain kids before removing",
        type: "WARNING",
        open: true
      })
    }
  }

  render() {
    const { locationStore, uiStore } = this.props;

    let locations = locationStore.locations.map(location => {
      let key = `${location.name}${location.id}`
      return(
        <Paper zDepth={2} style={styles.locationColumn} key={key}>
          <List>
            <div style={styles.title}>
              <div id={location.id}
                onClick={(e)=>this.handleRemoveLoc(e)}>
                <IconButton
                  style={styles.closeButton}
                  tooltip="Remove Location"
                  id={location.id}
                  tooltipPosition="top-left"
                  >
                    <CloseIcon color={cyan500}/>
                  </IconButton>
              </div>
              <h2>{location.name}</h2>
              <Badge
                badgeContent={location.kids.length}
                secondary={true}
                badgeStyle={{top: 20, left: 16}}
              />
            </div>
             <Droppable droppableId={`${location.id}`}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef}
                     style={{backgroundColor: snapshot.isDraggingOver ?
                       cyan500 :''}}
                >
                <KidListContainer
                  kids={location.kids}
                  handleOpen={this.handleOpen}/>
                </div>
              )}
            </Droppable>
          </List>
        </Paper>
      );
    });

    locations = sortBy(locations, ['key'])

    return(
        <div style={styles.root}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            {locations}
          </DragDropContext>
          <Dialog
            title="Warning"
            bodyStyle={uiStore.dialogColor}
            open={uiStore.dialog.open}
            onRequestClose={()=>uiStore.setDialog({open:false})}
          >
            <strong>{uiStore.dialog.message}</strong>
          </Dialog>
        </div>
    );
  }
}

export default LocationsContainer;
