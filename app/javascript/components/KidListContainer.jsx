import React from 'react'
import KidTile from './KidTile'
import { observer, inject } from 'mobx-react'
import { Draggable } from 'react-beautiful-dnd'
import { List } from 'material-ui/List'
import { pinkA200 } from 'material-ui/styles/colors'


@inject('kidStore') @observer
class KidListContainer extends React.Component {
  constructor(props) {
    super(props)
  }

render() {
  const { kidStore } = this.props;

  let kidList = [];
  if (this.props.kids != {}) {
    kidList = this.props.kids.map(kid => {
      let alpha = kidStore.getAlpha(kid)
      const style = {
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
                  <KidTile kid={kid} style={style}/>

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
