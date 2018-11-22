<template>
  <div v-cloak class="map-container">
    <l-map
      ref="map"
      :zoom="zoom"
      :zoom-control="zoomControl"
      :min-zoom="minZoom"
      :max-zoom="maxZoom"
      :center="center"
      :max-native-zoom="maxNativeZoom"
    >
      <l-tile-layer :url="url"/>
      <l-marker
        v-for="item in markers"
        :key="item.id"
        :icon="item.icon"
        :lat-lng="item.latlng"
        @mouseenter="openPopup($event)"
        @mouseout="closePopup($event)"
      >
        <l-popup :content="item.content"/>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import Vue from 'vue'
import Leaflet from 'leaflet'
import Location from '@/assets/js/location.js'
import { LMap, LTileLayer, LPopup, LMarker } from 'vue2-leaflet'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import VueResource from 'vue-resource'

Vue.use(VueResource)

export default {
  name: 'MapComponent',
  components: { LMap, LTileLayer, LPopup, LMarker },
  data () {
    return {
      zoom: 13,
      center: Leaflet.latLng(52.237049, 21.017532),
      url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoomControl: true,
      minZoom: 6,
      maxZoom: 25,
      maxNativeZoom: 18,
      map: null,
      markers: [],
      defaultIcon: Leaflet.icon({
        iconUrl: 'http://downloadicons.net/sites/default/files/gps-id-icon-94414.png',
        iconSize: [50, 60],
        iconAnchor: [34, 59],
        popupAnchor: [-10, -43]
      }),
      searchLabel: ''
    }
  },
  created () {
    this.searchLabel = this.$route.params.searchInput
  },
  mounted () {
    this.map = this.$refs.map.mapObject
    this.map.addControl(new Leaflet.Control.Scale())
    this.map.addControl(new this.ControlGps())
    this.map.on('locationfound', this.onLocationFound)
    const provider = new OpenStreetMapProvider()
    const searchControl = new GeoSearchControl({
      provider: provider,
      showMarker: false,
      searchLabel: 'Wpisz adres'
    })
    this.map.addControl(searchControl)
    this.loadData()
  },
  methods: {
    ControlGps: Leaflet.Control.extend({
      options: {
        position: 'topleft'
      },
      onAdd (map) {
        const container = Leaflet.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom')
        container.style.backgroundColor = 'white'
        container.style.width = '34px'
        container.style.height = '34px'
        container.style.cursor = 'pointer'
        container.title = 'Kliknij, aby pokazać twoją lokalizację'
        container.style.backgroundImage = 'url("https://image.freepik.com/free-icon/gps-map-location_318-9071.jpg")'
        container.style.backgroundSize = '30px 30px'
        container.onclick = () => {
          const location = new Location(map)
          location.locate()
        }
        return container
      }
    }),

    onLocationFound (e) {
      const radius = e.accuracy / 2
      this.markers = []
      console.log(e.latlng.lat + ' : ' + e.latlng.lng)
      this.markers.push({
        id: 1,
        latlng: Leaflet.latLng(e.latlng.lat, e.latlng.lng),
        content: 'Jesteś w odlegości ' + radius + ' metrów od tego punktu',
        icon: this.defaultIcon
      })
    },
    openPopup (event) {
      Vue.nextTick(() => {
        event.target.openPopup()
      })
    },
    closePopup (event) {
      Vue.nextTick(() => {
        event.target.closePopup()
      })
    },
    loadData () {
      // https://nominatim.openstreetmap.org/search/Warszawa?format=json&addressdetails=1&limit=100
      // https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=52.2021169&lon=20.94776
      this.$http.get('https://nominatim.openstreetmap.org/search/' + this.searchLabel + '?format=json&addressdetails=1&limit=1').then((response) => {
        const location = response.body
        const latLngs = [{ 'lat': location[0].lat, 'lng': location[0].lon }]
        this.map.fitBounds(latLngs)
        this.map.setZoom(14)
      }, (response) => {
        console.error(response)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .map-container,
  #map {
    position: relative;
    padding: 0;
    height: 70vh;
  }

  [v-cloak] {
    visibility: hidden;
  }
</style>
