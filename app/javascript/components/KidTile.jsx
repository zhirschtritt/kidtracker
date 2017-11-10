import React from 'react';
import { observer, inject } from 'mobx-react';
import { ListItem } from 'material-ui/List'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';


@inject('kidStore', 'eventStore', 'locationStore') @observer
class KidTile extends React.Component {
  constructor(props) {
    super(props)
  }

  handleKidMenuAction(actionItem) {
    const { locationStore, eventStore } = this.props
    const kid = actionItem.props.kid
    const action = actionItem.props.action

    switch(action) {
      case "DELETE":
        break
      case "SIGNOUT":
        console.log("Signing Out")
        eventStore.new(kid.id, null)
        locationStore.removeFromLocation(kid, kid.current_location.id)
        break
      default:
        console.log(`"${action}" is not a valid action method`)
    }
  }


  render() {

    const { kidStore, kid, style } = this.props
    const iconButtonElement = (
      <IconButton touch={true}>
        <MoreVertIcon color={grey400} />
      </IconButton>
    );
    const rightIconMenu = (
      <IconMenu
        onItemTouchTap={(e,actionItem)=>this.handleKidMenuAction(actionItem)}
        iconButtonElement={iconButtonElement}>
        <MenuItem kid={kid} action={"SIGNOUT"}>Sign Out</MenuItem>
      </IconMenu>
    );
    return(
      <ListItem
        style={style}
        onClick={(e)=>kidStore.handleDetailsOpen(e)}
        rightIconButton={rightIconMenu}
        primaryText={kid.first_name + ' ' + kid.last_name}
        secondaryText={kid.timeSinceMove}
        key={kid.id}
        value={kid}
        id={kid.id}
      />
    )
  }



}

export default KidTile;
