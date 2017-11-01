import React, { Component } from 'react';
import { Dropdown, Icon, Menu, Segment } from 'semantic-ui-react';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organizations: props.organizations,
      selectedOrganization: props.selectedOrganization,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      organizations: nextProps.organizations,
      selectedOrganization: nextProps.selectedOrganization,
    });
  }

  render() {
    const organizations = this.state.organizations.map(org => (
      <Dropdown.Item
        onClick={this.props.setSelectedOrganization}
        key={org.id}
        id={org.id}
        value={org.id}
        color='teal'
        active={this.state.selectedOrganization.id === org.id}
        >{org.name}
      </Dropdown.Item>
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
        <Menu attached='top'>
          <Dropdown item icon='wrench' simple>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Icon name='dropdown' />
                <span className='text'>Select Organization</span>
                <Dropdown.Menu
                  selection={displayOrganization}
                  selected={displayOrganization}
                >
                  <Dropdown.Item>
                    <span className='text'>New Organization</span>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  {organizations}
              </Dropdown.Menu>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>Export</Dropdown.Header>
              <Dropdown.Item>Share</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Item name='selectedOrganization'>
            {this.state.selectedOrganization.name}
          </Menu.Item>

          <Menu.Menu position='right'>
            <Menu.Item name="logout">
              <a href="logout">Log Out</a>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default NavBar;
