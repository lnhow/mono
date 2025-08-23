import GUI from 'lil-gui'

export default class Debug {
  active = false
  ui?: GUI
  constructor() {
    this.active = window.location.hash === '#debug'
    if (!this.active) {
      return
    }

    this.ui = new GUI({
      title: 'Debug'
    })
  }
}