import React from 'react';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { observer, inject } from 'mobx-react';
import DropZone from 'react-dropzone';

const styles = {
  root: {
    flexGrow: 1,
    maxWidth: '50%',
    margin: 10,
  },
  paper: {
    padding: '10px',
  },
  dropZone: {
    flexGrow: 1,
    minHeight: '100px',
  }
};

@inject('kidStore') @observer
class AdminKidPanel extends React.Component {
  constructor(props) {
    super(props)
  }

  onDrop(files) {
    this.props.kidStore.parseCsv(files[0])
  }

  render() {
    const { kidStore } = this.props;

    return(
      <div style={styles.root}>
        <Paper style={styles.paper}zDepth={3}>
          <h3>Kids</h3>
          <DropZone
            onDrop={this.onDrop.bind(this)}
            >
              {/* <Paper style={styles.dropZone}> */}
                <p>Drop A CSV of students here</p>
              {/* </Paper> */}
          </DropZone>
          <FloatingActionButton secondary={true} >
            <ContentAdd />
          </FloatingActionButton>
        </Paper>
        <Snackbar
          open={kidStore.snackbarOpen}
          message={kidStore.uploadState.message}
          autoHideDuration={10000}
          onRequestClose={kidStore.closeSnackbar}
          />
        </div>
    )
  }


}

export default AdminKidPanel;
