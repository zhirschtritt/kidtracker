import { observable, action, computed } from 'mobx';
import axios from 'axios';

export class EventStore {
  @observable events = []
  @observable state = 'loading' // "loading" / "done" / "error"
  @computed get chartData() {
    const columnData = [
      {type: 'number', label: 'Event ID'},
      {type: 'string', label: 'Kid Name'},
      {type: 'string', label: 'Checked In Location'},
      {type: 'string', label: 'Date'},
      {type: 'string', label: 'Time'}
    ]
    const rowData = this.events.map(event =>
      [ event.id,
        event.kid_name,
        event.location_name,
        event.date_formatted,
        event.time_formatted]
    )
    const options = {
      width: '100%',
      height: '1000px'
    }
    return({
      columns: columnData,
      rows: rowData,
      options: options
    })
  }


  @action
  fetchAll() {
    this.events = []
    this.state = 'loading'
    axios.get('/api/v1/events')
    .then(response => {
      this.events = response.data[0],
      this.state = 'done'
    })
    .catch(error => {
      this.state = 'error'
    })
  }

  @action
  new(kid_id, location_id) {
    axios.post('/api/v1/events', {
      event: {
        kid_id: kid_id,
        location_id: location_id
      }
    }).then(response => {
        console.log(response.data);
    });
  }

}

export default new EventStore();
