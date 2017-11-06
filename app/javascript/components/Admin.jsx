import React from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import OrganizationForm from './OrganizationForm';
import AdminKidPanel from './AdminKidPanel';
import { observer, inject } from 'mobx-react';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: '20px'
  },
  paper: {
    flexGrow: 1,
    maxWidth: '50%',
    margin: 10,
    padding: '10px',
  },
  selectField: {
    marginBottom: '20px',
  }
};

@inject('organizationStore') @observer
class Admin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { organizationStore } = this.props;
    const organizations = organizationStore.organizations.map(org => {
      return(
          <MenuItem key={org.id} value={org.id} primaryText={org.name} />
      )
    })

    return (
      <div style={styles.root}>
        <Paper style={styles.paper} zDepth={3}>
          <h3>Your Organizations</h3>
          <SelectField
          style={styles.selectField}
          value={organizationStore.defaultOrganizationId}
          onChange={(event,key,value)=>organizationStore.setDefault(value)}
          floatingLabelText="Set Default Organization"
          >
            {organizations}
          </SelectField>
          <OrganizationForm />
        </Paper>
        <AdminKidPanel />
      </div>
    );
  }
}

export default Admin;
