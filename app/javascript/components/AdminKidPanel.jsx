import React from 'react';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { observer, inject } from 'mobx-react';
import DropZone from 'react-dropzone';

const styles = {
  paper: {
    flexGrow: 1,
    maxWidth: '50%',
    margin: 10,
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

  onDrop(acceptedFiles, rejectedFiles) {
    debugger;
  }

  render() {
    return(
      <Paper style={styles.paper}zDepth={3}>
        <h3>Kids</h3>89
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
    )
  }


}

export default AdminKidPanel;
