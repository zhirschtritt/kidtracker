import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import axios from 'axios';

export default class OrganzationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      sendStatus: null,
    };
    this.makeNewOrg = this.makeNewOrg.bind(this);
  }

makeNewOrg() {
  axios.post('/api/v1/organizations', {
    name: this.state.name,
    description: this.state.description
    })
    .then(response => {
      this.setState({ response: response.data, sendStatus: "SUCCESS" });
    })
    .catch(err => console.log(error));
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
    <Form success>
      <Form.Input
        label='Organzation Name'
        placeholder='Acme Kids Corp.'
        value={this.state.name}
        onChange={(e)=>this.setState({name: e.target.value })}
       />
       {sucessMessage}
      <Button type='submit' onClick={this.makeNewOrg}>Submit</Button>
    </Form>
    );
  }

}
