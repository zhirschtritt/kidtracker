import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import { IndexLink, Link, browserHistory } from 'react-router';
import DropDownMenu from 'material-ui/DropDownMenu';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import LocationsContainer from './LocationsContainer';
import axios from 'axios';
import { observer, inject } from 'mobx-react';

const styles = {
  searchBox: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    },
    search: {
      padding: 10,
    },
    location: {
      width: '30%',
      marginBottom: 0,
    },
    paper: {
      marginTop: 10,
      display: 'flex',
      justifyContent: 'center',
      width: "70%",
      flexWrap: 'wrap'
    }
};

@inject(['kidStore'],['locationStore'],['eventStore']) @observer
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.locationStore.fetchAll()
    this.props.kidStore.fetchAll()
  }

  render() {
    const { locationStore, kidStore, eventStore } = this.props;

    const locationData = locationStore.locations.map(location => (
      <MenuItem key={location.id} value={location.id} primaryText={location.name}/>
    ));

    const kidDisplayData = kidStore.kids.map(kid => {
      const currentLocationId = kid.current_location != null ?
       kid.current_location.id : null
      return (
        {
        kid: kid,
        text: kid.full_name,
        value: <MenuItem
          primaryText={kid.full_name}
          secondaryText={kid.age} />
        }
      )
    })

    return (
      <div style={styles.searchBox}>
        <Paper style={styles.paper} zDepth={1} rounded={false}>
          <AutoComplete
            style={styles.search}
            hintText="Search for Kids"
            dataSource={kidDisplayData}
            animated={true}
            searchText={kidStore.searchText}
            onUpdateInput={(text)=>kidStore.setSearchText(text)}
            filter={AutoComplete.caseInsensitiveFilter}
            openOnFocus={true}
            onNewRequest={(selection, index) => {
              if (index != -1) {
                kidStore.clearSearchText();
                locationStore.update(selection.kid, selection.kid.current_location.id);
                eventStore.new(
                  selection.kid.id,
                  locationStore.defaultLocationId
                )};
              }}
            />
            <DropDownMenu
            style={styles.location}
            value={locationStore.defaultLocationId}
            onChange={(event,key,value)=>locationStore.setDefault(value)}
            autoWidth={false}
            >
              {locationData}
            </DropDownMenu>
          </Paper>
        </div>
      );
    }
}

export default SearchBar;
