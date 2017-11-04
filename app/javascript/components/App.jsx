import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import { IndexLink, Link, browserHistory } from 'react-router';
import DropDownMenu from 'material-ui/DropDownMenu';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import LocationsContainer from './LocationsContainer';
import axios from 'axios';

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      kids: [],
      location_id: '',
      locations: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleNewEvent = this.handleNewEvent.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({location_id: value});
  }

  handleNewEvent(kid_id, location_id) {
    axios.post('/api/v1/events', {
      event: {
        kid_id: kid_id,
        location_id: location_id
      }
    }).then(response => {
      console.log(response.data);
      this.setState({
        locations: response.data,
        searchText: ''
      });
    });
  }

  componentDidMount() {
    axios.get('/api/v1/locations')
    .then(response => {
      console.log(response.data);
      this.setState({
        locations: response.data,
        location_id: response.data[0].id
      });
    });

    axios.get('/api/v1/kids')
    .then(response => {
      console.log(response.data);
      this.setState({
        kids: response.data
      });
    });
  }

  render() {
    const locationOptions = this.state.locations.map(location => (
      <MenuItem key={location.id} value={location.id} primaryText={location.name} />
    ));

    return (
      <div>
        <div style={styles.searchBox}>
        <Paper style={styles.paper} zDepth={1} rounded={false}>
          <AutoComplete
            style={styles.search}
            hintText="Search for Kids"
            dataSource={this.state.kids}
            animated={true}
            searchText={this.state.searchText}
            onUpdateInput={(text)=>this.setState({searchText: text})}
            filter={AutoComplete.caseInsensitiveFilter}
            openOnFocus={true}
            dataSourceConfig={dataSourceConfig}
            onNewRequest={(kid, index) => {
              if (index != -1) {
                this.handleNewEvent(kid.id, this.state.location_id);
                }
              }}
            />
            <DropDownMenu
            style={styles.location}
            value={this.state.location_id}
            onChange={this.handleChange}
            autoWidth={false}
            >
              {locationOptions}
            </DropDownMenu>
          </Paper>
        </div>
            <LocationsContainer handleNewEvent={this.handleNewEvent} locations={this.state.locations} />
        </div>
      );
    }
}

export default App;
