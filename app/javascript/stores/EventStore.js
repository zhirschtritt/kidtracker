import { observable, action } from 'mobx';
import axios from 'axios';

export class EventStore {
  @observable events = []
  @observable state = 'loading' // "loading" / "done" / "error"

  @action
  fetchAll() {
    this.events = []
    this.state = 'loading'
    axios.get('/api/v1/events')
    .then(response => {
      this.events = response.data,
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
