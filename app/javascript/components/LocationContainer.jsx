import React from 'react';

class LocationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: this.props.locations
    };
  }

  render() {
    const locations = this.state.locations.map(location => {
      return (
          <div key={location.key}>{location.name}</div>
      );
    });

    return(
      <div>
        {locations}
      </div>
    );
  }
}


export default LocationContainer;
