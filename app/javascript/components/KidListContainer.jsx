import React from 'react';
import { observer, inject } from 'mobx-react';
import { Draggable } from 'react-beautiful-dnd';
import {List, ListItem} from 'material-ui/List';



@inject('kidStore') @observer
class KidListContainer extends React.Component {
  constructor(props) {
    super(props);
  }


render() {
  const kidList = this.props.kids.map(kid => {
    debugger;
    const handleViewDetails =
    return(
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
                onClick={e=>this.props.handleOpen(e)}
                value={kid}
              />
            </div>
            {provided.placeHolder}
          </div>
          )}
        </Draggable>
      )
    })

  console.log(kidList);

  return(
    {kidList}
  )
}




}

export default KidListContainer;
