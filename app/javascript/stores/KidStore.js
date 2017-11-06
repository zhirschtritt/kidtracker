import { observable, action } from 'mobx';
import axios from 'axios';

export class KidStore {
  @observable kids = []
  @observable state = 'loading' // "loading" / "done" / "error"

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
}

export default new KidStore();
