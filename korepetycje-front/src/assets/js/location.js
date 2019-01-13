// import Leaflet from 'leaflet'
import Vue from 'vue'

export default class Location extends Vue {
  constructor (map) {
    super()
    this.map = map
  }
  locate () {
    this.map.locate({ setView: true, maxZoom: 16 })
  }
}
