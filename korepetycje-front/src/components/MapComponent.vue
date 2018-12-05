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
      <l-tile-layer :url="url" />
      <l-marker
        v-for="item in markers"
        :key="item.id"
        :icon="item.icon"
        :lat-lng="item.latlng"
        @mouseenter="openPopup($event)"
      >
        <l-popup :content="item.content" />
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
import { mapState } from 'vuex'

Vue.use(VueResource)

export default {
  name: 'MapComponent',
  components: { LMap, LTileLayer, LPopup, LMarker },
  data () {
    return {
      zoom: 13,
      center: Leaflet.latLng(52.237049, 21.017532),
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      zoomControl: true,
      minZoom: 6,
      maxZoom: 25,
      maxNativeZoom: 18,
      map: null,
      markers: [],
      defaultIcon: Leaflet.icon({
        iconUrl: '/img/gps_icon.png',
        iconSize: [50, 60],
        iconAnchor: [34, 59],
        popupAnchor: [-10, -43]
      }),
      searchLabel: ''
    }
  },
  computed: {
    ...mapState({
      searchQuery: state => state.map.searchQuery
    })
  },
  watch: {
    searchQuery (value) {
      this.searchLabel = value
      this.loadData()
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
        position: 'bottomright'
      },
      onAdd (map) {
        const container = Leaflet.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom')
        container.style.backgroundColor = '#e34195'
        container.style.width = '40px'
        container.style.height = '40px'
        container.style.cursor = 'pointer'
        container.style.borderRadius = '50px'
        container.style.transform = 'scaleX(-1)'
        container.style.backgroundRepeat = 'no-repeat'
        container.title = 'Kliknij, aby pokazać twoją lokalizację'
        container.style.backgroundImage = 'url("https://cdn4.iconfinder.com/data/icons/tupix-1/30/direction-512.png")'
        container.style.backgroundSize = '36px 36px'
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
        content: '<p id="par">' + 'Jesteś w odlegości ' + radius + ' metrów od tego punktu' + '</p>',
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
    height: 70vh;
    margin: auto;
    width: 70%;
    padding: 60px 10px 10px 10px;
  }

  [v-cloak] {
    visibility: hidden;
  }

  // .leaflet-popup-content-wrapper{
  //   width: 1000px;
  // }
</style>
