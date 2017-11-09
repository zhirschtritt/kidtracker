import { observable, action, computed } from 'mobx'
import { find } from 'lodash'
import Papa from 'papaparse'
import moment from 'moment'
import axios from 'axios'

const mimeTypes = [
  'text/csv',
  'application/vnd.oasis.opendocument.spreadsheet',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel']

export class KidStore {
  @observable kids = []
  @observable state = 'loading' // 'loading' / 'done' / 'error'
  @observable uploadState = {
    state: "", // 'error', 'success'
    message: "" // "error message"
  }

  @action getAlpha(kid) {
    console.log("calcluating")
    const updated_at = new Date(kid.updated_at)
    const now = new Date()
    const calculatedOpacity = (((now - updated_at) / 1000) * (-0.45)) + 100
    const alpha = calculatedOpacity > 0 ? calculatedOpacity/100 : 0
    return alpha
  }

  @observable detailsOpen = false;
  @observable kidDetails = {
    kid: {},
    events: []
  };
  @action handleDetailsOpen = (e) => {
    const kidId = parseInt(e.currentTarget.id)
    this.getDailyEvents(kidId)
    const kid = find(this.kids, ['id', kidId])
    this.kidDetails.kid = kid
    this.detailsOpen = true
  }
  @action handleDetailsClose = () => {this.detailsOpen = false}


  @observable snackbarOpen = false;
  @action closeSnackbar = () => {this.snackbarOpen = false}

  @observable searchText = ''
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
  addKids(kid_array) {
    //kid_array should be array of arrays: [['bob', 'testface', '4/20/2010' ]]
    debugger;
  }

  @action
  parseCsv(csv) {
    if (mimeTypes.includes(csv.type)) {
      Papa.parse(csv, {
        skipEmptyLines: true,
        error: this.uploadState.state = 'error',

        complete: function(results) {
          axios.post('/api/v1/kids/new', {
            kids: results
          })
          .then(response => {
            debugger
            const kidCount = response.data.newKidCount
            console.log(`Uploaded ${kidCount} new kids`)
          })
        }
      })

    } else {
      this.uploadState.state = 'error'
      this.uploadState.message = 'File must be a .csv, .xls, .xlsx, or .ods'
      this.snackbarOpen = true
    }
  }

  @action
  getDailyEvents(kidId) {
    this.state = 'loading'
    axios.get('/api/v1/events_between', {
      params: {
          kid_id: kidId,
          begin_date: moment().startOf('day'),
          end_date: moment().endOf('day')
      }
    }).then(response => {
      this.state = 'done'
      this.kidDetails.events = response.data
    })
  }




}

export default new KidStore();
