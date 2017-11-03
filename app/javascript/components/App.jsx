import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import { IndexLink, Link, browserHistory } from 'react-router';
import DropDownMenu from 'material-ui/DropDownMenu';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import LocationsContainer from './LocationsContainer';
import axios from 'axios';

const styles = {
  root: {
    display: 'float',
    alignItems: 'center',
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
    textAlign: 'center',
    display: 'inline-block',
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
        <Paper style={styles.paper} zDepth={1} rounded={false}>
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
          </Paper>
            <LocationsContainer locations={this.state.locations} />
        </div>
      );
    }
}

export default App;
