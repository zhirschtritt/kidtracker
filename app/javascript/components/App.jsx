import PropTypes from 'prop-types';
import React from 'react';
import OrganizationForm from './OrganizationForm';
import LocationContainer from './LocationContainer';
import axios from 'axios';
import { Form, Icon, Input, Button, Dropdown } from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizations: [],
      selectedOrganization: "",
      kids: [],
      locations: [],
      loading: true,
    };
    this.loadOrganizations = this.loadOrganizations.bind(this);
    this.loadLocations = this.loadLocations.bind(this);
    this.createNewOrg = this.createNewOrg.bind(this);
    this.setSelectedOrganization = this.setSelectedOrganization.bind(this);
  }

  createNewOrg(formPayload) {
    console.log(formPayload);
    axios.post('/api/v1/organizations', {
      formPayload
      })
      .then(response => {
        this.setState({
          organizations: response.data,
          sendStatus: "SUCCESS" });
      })
      .catch(err => console.log(error));
  }

  loadOrganizations() {
    axios.get('/api/v1/organizations')
    .then(response => {
      this.setState({ organizations: response.data, loading: false });
      }).catch(err => console.log(err));
  }

  loadLocations() {
    axios.get('/api/v1/locations')
    .then(response => {
      console.log(response.data);
      this.setState({ locations: response.data.locations });
    }).catch(err => console.log(err));
  }

  setSelectedOrganization(e, data) {
    e.preventDefault();
    let organization_id = data.value;
    axios.patch('/api/v1/organizations/select', {
      organization_id: organization_id
    }).then(response => {
      this.setState(
        { selectedOrganization: response.data.selected_organization_id});
      this.loadLocations();
    }).catch(err => console.log(err));
  }


  componentDidMount() {
    this.loadOrganizations();
  }

  render() {
    console.log(this.state);
    
    let org_form = "";
    if (!this.state.loading) {
      org_form =
      <OrganizationForm
        organizations={this.state.organizations}
        handleSubmit={this.createNewOrg}
        />;
    }

    const orgs = this.state.organizations.map(org => (
      {
        id: org.id,
        ref: org.id,
        key: org.name,
        value: org.id,
        text: org.name,
      }
    ));

    return (
       <div className='existing-orgs'>
         {org_form}
         <div>SELCT ORG:</div>
         <Dropdown placeholder="select current organization"
                 options={orgs}
                 selection
                 value={this.state.selectedOrganization}
                 onChange={this.setSelectedOrganization}
               />
         <LocationContainer locations={this.state.locations} />
       </div>
     );
  }

}

export default App;
