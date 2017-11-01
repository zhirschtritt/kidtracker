import React from 'react';
import LocationTile from './LocationTile';
import { Grid } from 'semantic-ui-react';

class LocationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: this.props.locations
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      locations: nextProps.locations
    });
  }

  render() {
    const locations = this.state.locations.map(location => {
      return (

            <Grid.Column key={location.id}>
              <LocationTile
                id={location.id}
                name={location.name}
              />
            </Grid.Column>

      );
    });

    return(
      <Grid columns='equal' >
          {locations}
      </Grid>
    );
  }
}


export default LocationContainer;
