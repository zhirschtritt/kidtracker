import { observable, action, computed } from 'mobx'
import { red500, green500, pink500, grey50 } from 'material-ui/styles/colors';


class UIStore {
  @observable dialog = {
    message:'',
    type: 'NONE', // WARNING, ERROR, SUCCESS
    open: false
  }

  @action
  setDialog(props) {
    this.dialog = Object.assign({}, this.dialog, props)
  }

  @computed
  get dialogColor() {
    switch(this.dialog.type) {
      case "WARNING":
        return { color: pink500 }
        break
      case "ERROR":
        return { color: red500 }
        break
      case "SUCCESS":
        return { color: green500 }
        break
      default:
        null
    }
  }

}

export default new UIStore()
