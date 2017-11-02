import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import { IndexLink, Link, browserHistory } from 'react-router';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import LocationsContainer from './LocationsContainer';
import axios from 'axios';

const styles = {
  root: {
    display: 'grid',
    gridColumnTemplate: '2fr 2fr 1fr 2fr'
  },
  search: {
    gridColumn: 2/3,
    marginLeft: "30%"
  },
  location: {
    gridColumn: 3/4,
    width: 200
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
      location: '',
      locations: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({location: value});
  }

  componentDidMount() {
    axios.get('/api/v1/locations')
    .then(response => {
      console.log(response.data);
      this.setState({
        locations: response.data,
        location: response.data[0].id
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
      <div style={styles.root}>
        <AutoComplete
          style={styles.search}
          hintText="Search for Kids"
          dataSource={this.state.kids}
          animated={true}
          filter={AutoComplete.caseInsensitiveFilter}
          openOnFocus={true}
          dataSourceConfig={dataSourceConfig}
          onNewRequest={(chosenRequest, index) => {
            if (index != -1) { //not just a random 'enter'
              onSelect(kid);
              }
            }}
          />
          <DropDownMenu
          style={styles.location}
          value={this.state.location}
          onChange={this.handleChange}
          autoWidth={false}
          >
            {locationOptions}
          </DropDownMenu>
          <LocationsContainer locations={this.state.locations} />
        </div>
      );
    }
}

export default App;
