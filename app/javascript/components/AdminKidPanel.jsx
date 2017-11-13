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
    padding: 20,
    border: '1px solid',
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
    const { kidStore } = this.props
    const status = kidStore.parseCsv(files[0], kidStore.addKids)
    console.log(status)
  }

  render() {
    const { kidStore } = this.props;
    const csv = "https://s3.amazonaws.com/kidtracker-data/test_kid_template.csv"

    return(
      <div style={styles.root}>
        <Paper style={styles.paper}zDepth={3}>
          <h3>Kids</h3>
          <DropZone
            style={styles.dropZone} className="dropzone"
            onDrop={this.onDrop.bind(this)
            }
            >
            <p>Drop A CSV of students here</p>
          </DropZone>
          <p><a href={csv}>Download CSV Template</a></p>
          <FloatingActionButton secondary={true} style={{marginTop: 30}} >
            <ContentAdd />
          </FloatingActionButton>
        </Paper>
        <Snackbar
          open={kidStore.snackbar.open}
          message={kidStore.snackbar.message}
          autoHideDuration={10000}
          onRequestClose={()=>kidStore.snackbar.open = false}
          />
        </div>
    )
  }


}

export default AdminKidPanel;
