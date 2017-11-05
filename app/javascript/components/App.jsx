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
    alignContent: 'center'
  },
  search: {
    padding: 10,
  },
  location: {
    width: 200,
    marginBottom: 0,
  },
  paper: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    width: "75%"
  }
};


@inject(['kidStore'],['locationStore'],['eventStore']) @observer
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  componentDidMount() {
    this.props.locationStore.fetchAll()
    this.props.kidStore.fetchAll()
  }

  render() {
    const { locationStore, kidStore } = this.props;

    const locationData = locationStore.locations.map(location => (
      <MenuItem key={location.id} value={location.id} primaryText={location.name}/>
    ));

    const kidDisplayData = kidStore.kids.map(kid => ({
      text: kid.full_name,
      value: (
        <MenuItem key={kid.id}
          value={kid.id}
          primaryText={kid.full_name}
          secondaryText={kid.location.name}
          />
      )
    }))

    return (
      <div>
        <div style={styles.searchBox}>
        <Paper style={styles.paper} zDepth={1} rounded={false}>
          <AutoComplete
            style={styles.search}
            hintText="Search for Kids"
            dataSource={kidDisplayData}
            animated={true}
            searchText={this.state.searchText}
            onUpdateInput={(text)=>this.setState({searchText: text})}
            filter={AutoComplete.caseInsensitiveFilter}
            openOnFocus={true}
            onNewRequest={(kid, index) => {
              if (index != -1) {
                this.props.eventStore.new(
                  kid.id,
                  this.props.locationStore.defaultLocationId
                )}
              }}
            />
            <DropDownMenu
            style={styles.location}
            value={this.props.locationStore.defaultLocationId}
            onChange={(event,key,value)=>this.props.locationStore.setDefault(value)}
            autoWidth={false}
            >
              {locationData}
            </DropDownMenu>
          </Paper>
        </div>
            <LocationsContainer />
        </div>
      );
    }
}

export default App;
