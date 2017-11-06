import { observable, action } from 'mobx';
import axios from 'axios';

class LocationStore {
  @observable locations = []
  @observable state = 'loading' // "loading" / "done" / "error"
  @observable defaultLocationId = ''

  @action
  fetchAll() {
    this.locations = []
    this.state = 'loading'
    axios.get('/api/v1/locations')
    .then(response => {
      this.locations = response.data,
      this.state = 'done'
      this.setDefault(response.data[0].id)
    })
    .catch(error => {
      this.state = 'error'
    })
  }

  @action
  setDefault(location_id) {
    this.defaultLocationId = location_id;
  }

}

export default new LocationStore();
