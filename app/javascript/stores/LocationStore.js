import { observable, action } from 'mobx';
import { find, findIndex, differenceBy, concat } from 'lodash';
import Immutable from 'immutable';
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
    this.defaultLocationId = location_id
  }

  @action
  update(
    kid,
    fromLocationId = null,
    toLocationId = this.defaultLocationId) {

    let newLocations = Immutable.List(this.locations);

    if (fromLocationId) { //if there is a from location, remove the kid from that list
      let fromLoc = find(this.locations, ['id', fromLocationId])
      const fromLocIndex = findIndex(this.locations, fromLoc)
      const kidIndex = findIndex(fromLoc.kids,['id', kid.id])
      fromLoc.kids.splice(kidIndex, 1)
      newLocations.set(fromLocIndex, fromLoc)
    }

    const toLoc = find(this.locations, ['id', toLocationId])
    const toLocIndex = findIndex(this.locations, toLoc)
    toLoc.kids.splice(0,1,kid); //add kid to new location list

    newLocations.set(toLocIndex, toLoc)
  }
}

export default new LocationStore();
