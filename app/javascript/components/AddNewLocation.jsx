import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import RaisedButton from 'material-ui/RaisedButton';
import { observer, inject } from 'mobx-react';

const styles={
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    margin: 10
  },
  submitStyle: {
    marginLeft: 20,
    marginTop: 32,
  }
}

@inject('locationStore') @observer
class AddNewLocation extends React.Component {
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
    this.props.locationStore.addNew(name);
  }

  notifyFormError(data) {
    console.error('Form error:', data);
  }

  actions = [
    <FlatButton
      label="Close"
      secondary={true}
      onClick={()=>this.props.locationStore.toggleLocationForm()}
    />
  ];

  render() {
    const { locationStore } = this.props;
    return(
      <div style={styles.root}>
        <FlatButton
          label="Add New Location"
          primary={true}
          style={styles.button}
          onClick={()=>locationStore.toggleLocationForm()}
        />
        <Dialog
          title="Add New Location"
          actions={this.actions}
          modal={false}
          open={locationStore.formOpen}
          onRequestClose={()=>locationStore.toggleLocationForm()}
          >
            <Formsy.Form
              onValid={this.enableButton.bind(this)}
              onInvalid={this.disableButton.bind(this)}
              onValidSubmit={this.submitForm.bind(this)}
              onInvalidSubmit={this.notifyFormError}
              >
                <FormsyText
                  name="name"
                  validations="minLength:3"
                  validationError="Must be at least 3 characters long"
                  required
                  hintText="Jupiter's Orbit"
                  floatingLabelText="Location Name"
                  updateImmediately
                />
                <RaisedButton
                  style={styles.submitStyle}
                  type="submit"
                  label="Submit"
                  disabled={!this.state.canSubmit}
                />
              </Formsy.Form>
          </Dialog>

      </div>
    )
  }
}

export default AddNewLocation;
