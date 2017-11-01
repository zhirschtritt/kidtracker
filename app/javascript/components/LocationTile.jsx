import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';

function LocationTile(props){

  return (
    <Segment><h3>{props.name}</h3></Segment>
  );

}

export default LocationTile;
