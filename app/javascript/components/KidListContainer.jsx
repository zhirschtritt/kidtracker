import React from 'react'
import { observer, inject } from 'mobx-react'
import { Draggable } from 'react-beautiful-dnd'
import {List, ListItem} from 'material-ui/List'
import { pinkA200 } from 'material-ui/styles/colors';


@inject('kidStore') @observer
class KidListContainer extends React.Component {
  constructor(props) {
    super(props);
  }

render() {
  const { kidStore } = this.props;

  let kidList = [];
  if (this.props.kids != {}) {
    kidList = this.props.kids.map(kid => {
      let alpha = kidStore.getAlpha(kid);
      const kidTileStyle = {
        backgroundColor: 'rgba(255, 64, 129, ' + alpha + ')'
      }

      return(
        <Draggable key={kid.id} draggableId={kid.id}>
          {(provided, snapshot) => (
            <div>
              <div
                ref={provided.innerRef}
                style={provided.draggableStyle}
                {...provided.dragHandleProps}
                >
                  <ListItem
                    style={kidTileStyle}
                    onClick={(e)=>kidStore.handleDetailsOpen(e)}
                    primaryText={kid.first_name + ' ' + kid.last_name}
                    secondaryText={kid.timeSinceMove}
                    key={kid.id}
                    value={kid}
                    id={kid.id}
                  />

                </div>
                {provided.placeHolder}
              </div>
            )}
          </Draggable>
        )
      })
  }

  return(
    <div>
      {kidList}
    </div>
    )
  }

}

export default KidListContainer;
