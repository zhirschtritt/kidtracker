import { observable, action } from 'mobx';
import { find, findIndex, differenceBy, sortBy, concat, reverse } from 'lodash';
import moment from 'moment';
import Immutable from 'immutable';
import axios from 'axios';

class LocationStore {
  @observable locations = []
  @observable state = 'loading' // "loading" / "done" / "error"
  @observable defaultLocationId = ''



  @action
  updateKidTimes() {
    console.log("updating times");
    this.locations.map(location => {
      location.kids.forEach(kid => {
        const now = moment()
        const then = moment.parseZone(kid.updated_at)
        const diff = moment.duration(now.diff(then)).humanize()
        kid.timeSinceMove = `${diff} ago`
      })
    })
  }

  @action
  fetchAll() {
    this.locations = []
    this.state = 'loading'
    axios.get('/api/v1/locations')
    .then(response => {
      this.locations = response.data,
      this.state = 'done'
      this.updateKidTimes()
      this.sortKidsByUpdated()
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
  update(kid, toLocationId = this.defaultLocationId) {
    kid.updated_at = moment()

    let newLocations = Immutable.List(this.locations);
    const fromLocationId = kid.current_location != null ? kid.current_location.id : null

    if (fromLocationId != null) { //if there is a from location, remove the kid from that list
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
    this.updateKidTimes()
  }

  @action
  sortKidsByUpdated() {
    this.locations.forEach(location => {
      location.kids = reverse(sortBy(location.kids,['updated_at']))
    })
  }

}

export default new LocationStore();
