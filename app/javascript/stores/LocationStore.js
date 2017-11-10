import { observable, action } from 'mobx';
import { find, findIndex, differenceBy, sortBy, concat, reverse } from 'lodash';
import moment from 'moment';
import Immutable from 'immutable';
import axios from 'axios';

class LocationStore {
  @observable locations = []
  @observable state = 'loading' // "loading" / "done" / "error"
  @observable defaultLocationId = ''
  @observable formOpen = false

  @action toggleLocationForm() {this.formOpen = !this.formOpen}

  @action
  addNew(name) {
    this.state = 'loading'
    axios.post('/api/v1/locations', {
      name: name
    })
    .then(response => {
      this.state = 'done'
      const newLocation = response.data.location
      this.fetchAll()
    })
    .catch(error => {
      this.state = 'error'
      console.log(error)
    })
  }

  @action
  updateKidTimes() {
    console.log("updating times");
    this.locations.map(location => {
      location.kids.forEach(kid => {
        const now = moment()
        const then = moment(kid.updated_at)
        kid.diff = moment.duration(now.diff(then))
        kid.timeSinceMove = `${kid.diff.humanize()} ago`
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
  removeFromLocation(kid, fromLocationId) {
    console.log("removing kid")
    let fromLoc = find(this.locations, ['id', fromLocationId])
    const fromLocIndex = findIndex(this.locations, fromLoc)
    const newFromKidList = fromLoc.kids.filter(kid_object => (
      kid_object.id !== kid.id)
    )
    fromLoc = Object.assign({}, fromLoc, { kids: newFromKidList})
    this.locations.splice(fromLocIndex,1, fromLoc)
  }

  @action
  moveToLocation(kid, toLocationId) {
    let toLoc = find(this.locations, ['id', toLocationId])
    kid.current_location = toLoc
    const toLocIndex = findIndex(this.locations, toLoc)
    const newToKidList = toLoc.kids.concat(kid)
    toLoc = Object.assign({}, toLoc, { kids: newToKidList})
    this.locations.splice(toLocIndex, 1, toLoc)
  }

  @action
  update(kid, toLocationId = this.defaultLocationId) {
    kid.updated_at = moment()
    const fromLocationId = kid.current_location != null ? kid.current_location.id : null
    if (fromLocationId != null) { //if there is a from location, remove the kid from that list
      this.removeFromLocation(kid, fromLocationId)
    }
    this.moveToLocation(kid, toLocationId)
    this.updateKidTimes()
    this.sortKidsByUpdated()
  }

  @action
  sortKidsByUpdated() {
    this.locations.forEach(location => {
      location.kids = sortBy(location.kids,['diff'])
    })
  }

}

export default new LocationStore();
