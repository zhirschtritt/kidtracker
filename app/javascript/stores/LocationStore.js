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
  update(kid, toLocationId = this.defaultLocationId) {
    kid.updated_at = moment()

    const fromLocationId = kid.current_location != null ? kid.current_location.id : null

    if (fromLocationId != null) { //if there is a from location, remove the kid from that list
      let fromLoc = find(this.locations, ['id', fromLocationId])
      const fromLocIndex = findIndex(this.locations, fromLoc)
      const newFromKidList = fromLoc.kids.filter(kid_object => (
        kid_object.id !== kid.id)
      )
      fromLoc = Object.assign({}, fromLoc, { kids: newFromKidList})
      this.locations.splice(fromLocIndex, 1, fromLoc)
    }

    let toLoc = find(this.locations, ['id', toLocationId])
    const toLocIndex = findIndex(this.locations, toLoc)
    const newToKidList = toLoc.kids.concat(kid)
    toLoc = Object.assign({}, toLoc, { kids: newToKidList})

    this.locations.splice(toLocIndex, 1, toLoc)
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
