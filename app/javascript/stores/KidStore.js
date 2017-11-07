import { observable, action, computed } from 'mobx';
import Papa from 'papaparse';
import axios from 'axios';

const mimeTypes = [
  'text/csv',
  'application/vnd.oasis.opendocument.spreadsheet',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel']

export class KidStore {
  @observable kids = []
  @observable state = 'loading' // 'loading' / 'done' / 'error'
  @observable searchText = ''
  @observable uploadState = {
    state: "", // 'error', 'success'
    message: "" // "error message"
  }
  @observable snackbarOpen = false;
  


  @action closeSnackbar = () => {this.snackbarOpen = false}

  @action setSearchText = (text) => {this.searchText = text}
  @action clearSearchText = () => {this.searchText = ""}

  @action
  fetchAll() {
    this.kids = []
    this.state = 'loading'
    axios.get('/api/v1/kids')
    .then(response => {
      this.kids = response.data,
      this.state = 'done'
    })
    .catch(error => {
      this.state = 'error'
    })
  }

  @action
  parseCsv(csv) {
    if (mimeTypes.includes(csv.type)) {
      Papa.parse(csv, {
        skipEmptyLines: true,
        error: this.uploadState.state = 'error',
        complete: function(results) {
          console.log("Finished:", results.data);
        }
      });
    } else {
      this.uploadState.state = 'error'
      this.uploadState.message = 'File must be a .csv, .xls, .xlsx, or .ods'
      this.snackbarOpen = true
      console.log(this.snackbarOpen);
    }
  }

  @action
  addKids(kid_array) {
    //kid_array should be array of arrays: [['bob', 'testface', '4/20/2010' ]]
  }


}

export default new KidStore();
