import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, Message, Dropdown } from 'semantic-ui-react';
import axios from 'axios';

export default class OrganzationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      sendStatus: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    //validate handleOrgSelect
    let formPayload = {
      name: this.state.name,
      description: this.state.description
    };
    this.props.handleSubmit(formPayload);
    this.form.reset();
  }

  render() {

    let sucessMessage = "";
    if (this.state.sendStatus == "SUCCESS") {
      sucessMessage =
      <Message
        success
        header='Boom!'
        content="You made a new organzation!"
      />;
    }

    return (
      <div>
        <Form success ref="form">
          <Form.Input
            label='Organzation Name'
            placeholder='Acme Kids Corp.'
            value={this.state.name}
            onChange={e=>this.setState({name: e.target.value })}
           />
           {sucessMessage}
          <Button type='submit' onClick={this.handleSubmit}>Submit</Button>
        </Form>

      </div>
    );
  }

}
