import PropTypes from 'prop-types';
import React from 'react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { observer, inject } from 'mobx-react';

const styles = {
  submitStyle: {
    marginTop: 32,
    display: 'block'
  }
};

@inject('organizationStore') @observer
export default class OrganzationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false
    };
  }

  getInitialState() {
    return {
      canSubmit: false,
    };
  }

  enableButton() {
    this.setState({
      canSubmit: true,
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  }

  submitForm(data) {
    const name = data.name
    this.props.organizationStore.addNew(name);
  }

  notifyFormError(data) {
    console.error('Form error:', data);
  }

  render() {

    return (
      <div>
        <Divider />
        <h4>Add New Organzation</h4>
        <Formsy.Form
          onValid={this.enableButton.bind(this)}
          onInvalid={this.disableButton.bind(this)}
          onValidSubmit={this.submitForm.bind(this)}
          onInvalidSubmit={this.notifyFormError}
          >
            <FormsyText
              name="name"
              validations="minLength:5"
              validationError="Must be at least 5 characters long"
              required
              hintText="Example Organization Inc."
              floatingLabelText="Name"
              updateImmediately
            />
            <RaisedButton
              style={styles.submitStyle}
              type="submit"
              label="Submit"
              disabled={!this.state.canSubmit}
            />
          </Formsy.Form>
      </div>
    );
  }
}
