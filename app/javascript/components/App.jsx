import PropTypes from 'prop-types';
import React from 'react';
import OrganizationForm from './OrganizationForm';
import LocationContainer from './LocationContainer';
import NavBar from './NavBar';
import axios from 'axios';
import { Form, Icon, Input, Button, Dropdown } from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizations: [],
      selectedOrganization: {},
      kids: [],
      locations: [],
      user: {},
      loadedOrgs: false,
      loadedLocations: false,
    };
    this.loadOrganizations = this.loadOrganizations.bind(this);
    this.loadLocations = this.loadLocations.bind(this);
    this.createNewOrg = this.createNewOrg.bind(this);
    this.setSelectedOrganization = this.setSelectedOrganization.bind(this);
  }

  createNewOrg(formPayload) {
    axios.post('/api/v1/organizations', {
      formPayload
      }).then(response => {
        this.setState({
          organizations: response.data,
          sendStatus: "SUCCESS" });
      }).catch(err => console.log(error));
  }

  loadOrganizations() {
    axios.get('/api/v1/organizations')
    .then(response => {
      console.log("LOADED ORGANIZATIONS: ");
      console.log(response);
      this.setState({
        organizations: response.data.organizations,
        selectedOrganization: response.data.default_organization,
        loadedOrgs: true });
      }).catch(err => console.log(err));
  }

  loadLocations() {
    axios.get('/api/v1/locations')
    .then(response => {
      console.log("LOADED LOCATIONS: ");
      console.log(response);
      this.setState({ locations: response.data.locations });
    }).catch(err => console.log(err));
  }

  setSelectedOrganization(e, data) {
    let organization_id = data.value;
    axios.patch('/api/v1/organizations/select', {
      organization_id: organization_id
    }).then(response => {
      this.loadLocations();
      console.log("SET SELECTED ORG: ");
      console.log(response.data);
      this.setState(
        { selectedOrganization: response.data.selected_organization});
    }).catch(err => console.log(err));
  }

  componentDidMount() {
    this.loadOrganizations();
    if (!this.state.loadedLocations) {
      this.loadLocations();
      this.setState({ loadedLocations: true });
    }
  }

  render() {
    let org_form = "";
    if (this.state.loadedOrgs) {
      org_form =
      <OrganizationForm
        organizations={this.state.organizations}
        handleSubmit={this.createNewOrg}
        />;
    }

    const organizations = this.state.organizations.map(org => (
      {
        id: org.id,
        key: org.name,
        value: org.id,
        text: org.name,
      }
    ));

    const selectedOrganization = this.state.selectedOrganization;
    const displayOrganization =
      {
        id: selectedOrganization.id,
        value: selectedOrganization.id,
        text: selectedOrganization.name
      };



    return (
       <div>
         <NavBar
           organizations = {this.state.organizations}
           selectedOrganization = {this.state.selectedOrganization}
           users={this.state.user}
           setSelectedOrganization={this.setSelectedOrganization}
         />
         {org_form}
         <LocationContainer locations={this.state.locations} />
       </div>
     );
  }

}

export default App;
