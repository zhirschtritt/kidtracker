import PropTypes from 'prop-types';
import React from 'react';
import { Form, Input, Button, Dropdown } from 'semantic-ui-react'

export default class HelloWorld extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = { name: this.props.name };
  }

  updateName = (name) => {
    this.setState({ name });
  };

  render() {
    const stateOptions = [ { key: 'AL', value: 'AL', text: 'Alabama' },  { key: 'AL', value: 'AL', text: 'Alabama' }, ]
    return (
      <div>
        <h3>
          Hello, {this.state.name}!
        </h3>
        <hr />
        <form >
          <label htmlFor="name">
            Say hello to:
          </label>
          <Input
            placeholder="Type here..."
            id="name"
            type="text"
            value={this.state.name}
            onChange={(e) => this.updateName(e.target.value)}
          />

          <Button
             color='red'
             content='Like'
             icon='heart'
             label={{ basic: true, color: 'red', pointing: 'left', content: '2,048' }}
           />
           <Form.Input label='Enter Password' type='password' />
           <Dropdown placeholder='State' search selection options={stateOptions} />
        </form>
      </div>
    );
  }
}
