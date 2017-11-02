import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import { IndexLink, Link, browserHistory } from 'react-router';

const style = {
  title: {
    cursor: 'pointer'
  }
};

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      organizations: this.props.organizations,
      selectedOrganization: this.props.defaultOrganization,
    };
    this.handleTitleTouchTap = this.handleTitleTouchTap.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

    handleTitleTouchTap() {
      browserHistory.push('/');
    }

    handleToggle() {
    this.setState({ open: !this.state.open });
    }

  render() {

    const loginOut = <FlatButton label="Logout" />;

    return (
      <div>
        <AppBar
          onLeftIconButtonTouchTap={this.handleToggle}
          title={<span style={style.title}>KidTracker</span>}
          onTitleTouchTap={this.handleTitleTouchTap}
          iconElementRight={loginOut}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
        >
          <List>
            <ListItem
              containerElement={<IndexLink to="/" />}
              onClick={this.handleToggle}
              primaryText="KidTracker"
            />
            <ListItem
              containerElement={<Link to="/about" />}
              onClick={this.handleToggle}
              primaryText="About"
            />
          </List>
        </Drawer>
      </div>
    );
  }
}

export default NavBar;
