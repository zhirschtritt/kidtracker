import PropTypes from 'prop-types'
import React from 'react'
import FormsyDate from 'formsy-material-ui/lib/FormsyDate'
import FormsyText from 'formsy-material-ui/lib/FormsyText'
import Divider from 'material-ui/Divider'
import moment from 'moment'
import RaisedButton from 'material-ui/RaisedButton'
import { observer, inject } from 'mobx-react'

const styles = {
  submitStyle: {
    marginTop: 32,
    display: 'block'
  }
};

@inject('kidStore') @observer
export default class NewKidForm extends React.Component {
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
    const { kidStore } = this.props
    let { first_name, last_name, dob } = data
    dob = moment(dob).format('MM/DD/YYYY')
    const kidArray= [
      ["first name", "last name", "dob"],
      [first_name, last_name, dob]
    ]
    kidStore.addKids(kidArray)
  }

  notifyFormError(data) {
    console.error('Form error:', data);
  }

  render() {

    return (
      <div>
        <Divider />
        <h4>Add individual kids</h4>
        <Formsy.Form
          onValid={this.enableButton.bind(this)}
          onInvalid={this.disableButton.bind(this)}
          onValidSubmit={this.submitForm.bind(this)}
          onInvalidSubmit={this.notifyFormError}
          >
            <FormsyText
              name="first_name"
              required
              hintText="First Name"
              floatingLabelText="First Name"
              updateImmediately
            />
            <FormsyText
              name="last_name"
              required
              hintText="Last Name"
              floatingLabelText="Last Name"
              updateImmediately
            />
            <FormsyDate
              name="dob"
              openToYearSelection={true}
              maxDate={new Date()}
              required
              floatingLabelText="Date of Birth"
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
