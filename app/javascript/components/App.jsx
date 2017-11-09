import React from 'react';
import LocationsContainer from './LocationsContainer';
import SearchBar from './SearchBar';
import KidDetails from './KidDetails';

const App = () => {

  return (
    <div>
      <SearchBar />
      <LocationsContainer />
      <KidDetails />
    </div>
  );
};

export default App;
