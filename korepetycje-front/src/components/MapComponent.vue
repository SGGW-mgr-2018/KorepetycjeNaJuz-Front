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
        @click="openPopup($event)"
      >
        <l-popup>
          <div class="outside-popup-div">
            <div class="subject-hour-div">{{ item.content.sub }} {{ item.content.startDateHour }}.{{ item.content.startDateMinutes }} - {{ item.content.endDateHour }}.{{ item.content.endDateMinutes }}</div>
            <div>
              <div class="image-popup-div">
                <img class="image-popup" src="/img/personIcon.png">
              </div>
              <div>
                <p class="content-popup">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus porro sunt possimus fugit maiores earum! Obcaecati tempore molestiae quae consequatur. Obcaecati tempore molestiae quae consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus porro sunt possimus fugit maiores earum! Obcaecati tempore molestiae quae consequatur. Obcaecati tempore molestiae quae consequatur.</p>
              </div>
            </div>
            <input class="button-popup" type="button" value="ZAPISZ SIĘ NA LEKCJE" @click="setLesson($event, item.id)">
          </div>
        </l-popup>
      </l-marker>
      <l-marker
        v-for="item in markersLocation"
        :key="item.id"
        :icon="item.icon"
        :lat-lng="item.latlng"
        @click="openPopup($event)"
      >
        <l-popup>
          <p>{{ item.content }}</p>
        </l-popup>
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
      markersLocation: [],
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
    }),
    ...mapState({
      getMarkers: state => state.map.markers
    })
  },
  watch: {
    searchQuery (value) {
      this.searchLabel = value
      this.loadData()
    },
    getMarkers (response) {
      try {
        if (response.status === 200) {
          const data = response.data
          this.markers = []
          console.log('Ilość lekcji : ' + data.length)
          for (var i = 0; i < data.length; i++) {
            const dStart = new Date(data[i].dateStart)
            const dEnd = new Date(data[i].dateEnd)
            this.markers.push({
              id: data[i].id,
              latlng: Leaflet.latLng(data[i].address.latitude, data[i].address.longitude),
              content: {
                sub: data[i].lessonSubject,
                startDateHour: dStart.getHours(),
                endDateHour: dEnd.getHours(),
                startDateMinutes: (dStart.getMinutes() < 10) ? ('0' + dStart.getMinutes()) : dStart.getMinutes(),
                endDateMinutes: (dEnd.getMinutes() < 10) ? ('0' + dEnd.getMinutes()) : dEnd.getMinutes()
              },
              icon: this.defaultIcon
            })
          }
        }
      } catch (error) {
        console.log('Error getting lessons')
      }
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
      // const radius = e.accuracy / 2
      this.markersLocation = []
      console.log(e.latlng.lat + ' : ' + e.latlng.lng)
      this.markersLocation.push({
        id: 1,
        latlng: Leaflet.latLng(e.latlng.lat, e.latlng.lng),
        content: 'Jesteś w punkcie : ' + '(' + e.latlng.lat + ',' + e.latlng.lng + ')'
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
    async setLesson (event, id) {
      if (typeof (this.$store.state.auth.user['id']) !== 'undefined') {
      } else {
        alert('Musisz być zalogowany, aby zapisać się na lekcję!')
      }
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
    padding-top: 10px;
    z-index: -1;
    @include mobile {
      display: block;
      width: 100%;
    }
  }

  [v-cloak] {
    visibility: hidden;
  }

  .outside-popup-div{
    padding:5px;
  }

  .subject-hour-div{
    text-align: center;
    font-family: Roboto;
    font-size: 24px;
    font-weight:normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #6b53ff;
  }

  .image-popup-div{
    width: 20%;
    float: left;
  }

  .image-popup{
    max-width: 100%;
    max-height: 100%;
    padding-right: 10px;
  }

  .content-popup{
    font-family: Roboto;
    font-size: 9px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: justify;
    color: #3d3d3d;
  }

  .button-popup{
    color:white;
    padding:10px;
    background: rgb(211,81,147);
    border-radius: 15px;
    margin: 0 auto;
    display: block;
    width:100%;
  }
</style>
