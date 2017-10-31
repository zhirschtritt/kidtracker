import PropTypes from 'prop-types';
import React from 'react';
import OrganizationForm from './OrganizationForm';
import axios from 'axios';
import { Form, Icon, Input, Button, Dropdown } from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizations: [],
      kids: [],
      locations: []
    };
  }

  componentDidMount() {
    axios.get('/api/v1/organizations')
    .then(response => {
      this.setState(
        { organizations: response.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const orgs = this.state.organizations.map(org => (
        <div key={org.name}>{org.name}</div>
    ));

    return (
       <div className=''>
         HI FROM APP COMPONENT
         EXISTINGS ORGS: {orgs}
         <OrganizationForm params={this.state.organizations} />
         <div className=''>
            {this.props.children}
         </div>
       </div>
     );
  }

}

export default App;
