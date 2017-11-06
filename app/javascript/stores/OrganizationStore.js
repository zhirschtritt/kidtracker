import { observable, action } from 'mobx';
import axios from 'axios';

class OrganizationStore {
  @observable organizations = []
  @observable state = 'loading' // "loading" / "done" / "error"
  @observable defaultOrganizationId = ''

  @action
  fetchAll() {
    this.organizations = []
    this.state = 'loading'
    axios.get('/api/v1/organizations')
    .then(response => {
      this.organizations = response.data.organizations,
      this.defaultOrganizationId = response.data.default_organization.id
      this.state = 'done'
    }).catch(error => {
      this.state = 'error'
    })
  }

  @action
  setDefault(organization_id) {
    const previousDefaultId = this.defaultOrganizationId
    this.defaultOrganizationId = organization_id;
    this.state = 'loading'
    axios.patch('/api/v1/organizations/select', {
      organization_id: this.defaultOrganizationId
    }).then(response=> {
      this.state = 'done'
    }
    ).catch(error => {
      this.state = 'error'
      this.defaultOrganizationId = previousDefaultId
    })
  }

  @action
  addNew(name){
    this.state = 'loading'
    axios.post('/api/v1/organizations', {
      name
    }).then(response => {
      this.organizations = [...this.organizations, response.data]
    }).catch(errror => {this.state = 'error'})
  }

}

export default new OrganizationStore();
