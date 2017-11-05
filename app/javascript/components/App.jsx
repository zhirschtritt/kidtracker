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

const dataSourceConfig = {
  text: 'first_name',
  value: 'id',
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
    console.log(this.props.locationStore);
    const locationOptions = this.props.locationStore.locations.map(location => (
      <MenuItem key={location.id} value={location.id} primaryText={location.name} />
    ));

    return (
      <div>
        <div style={styles.searchBox}>
        <Paper style={styles.paper} zDepth={1} rounded={false}>
          <AutoComplete
            style={styles.search}
            hintText="Search for Kids"
            dataSource={this.props.kidStore.kids}
            animated={true}
            searchText={this.state.searchText}
            onUpdateInput={(text)=>this.setState({searchText: text})}
            filter={AutoComplete.caseInsensitiveFilter}
            openOnFocus={true}
            dataSourceConfig={dataSourceConfig}
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
              {locationOptions}
            </DropDownMenu>
          </Paper>
        </div>
            <LocationsContainer handleNewEvent={this.handleNewEvent} locations={this.props.locationStore.locations} />
        </div>
      );
    }
}

export default App;
