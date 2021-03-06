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
        <l-popup class="popup-content">
          <div
            v-for="lesson in item.content"
            :key="lesson.id"
            class="outside-popup-div"
          >
            <div class="subject-hour-div">{{ lesson.sub }} <br> {{ lesson.date }} {{ lesson.startDateHour }}.{{ lesson.startDateMinutes }} - {{ lesson.endDateHour }}.{{ lesson.endDateMinutes }}</div>
            <div class="lesson-description">
              <div class="user-rating">
                <p class="content-popup-name">{{ lesson.coachFirstName }} {{ lesson.coachLastName }}</p>
                <div v-if="lesson.coachRating === 0" class="rating-div">
                  brak ocen
                </div>
                <div v-else class="rating-div">
                  <star-rating
                    class="stars_rating"
                    :star-size="16"
                    :increment="0.5"
                    :max-rating="5"
                    :show-rating="false"
                    active-color="yellow"
                    border-color="#000"
                    :rating="lesson.coachRating"
                    :read-only="true"
                  />
                </div>
              </div>
              <div>
                <p class="content-popup">{{ (lesson.lessonDescription) ? lesson.lessonDescription : 'Brak opisu lekcji' }}</p>
              </div>
            </div>
            <input class="button-popup" type="button" value="ZAPISZ SIĘ NA LEKCJE" @click="setLesson(lesson.id)">
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
import StarRating from 'vue-star-rating'
import { LMap, LTileLayer, LPopup, LMarker } from 'vue2-leaflet'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import VueResource from 'vue-resource'
import { mapState } from 'vuex'
Vue.use(VueResource)
export default {
  name: 'MapComponent',
  components: { LMap, LTileLayer, LPopup, LMarker, StarRating },
  props: {
    searchMode: {
      type: Boolean,
      default: false
    },
    addMode: {
      type: Boolean,
      default: false
    }
  },
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
          const bounds = []
          var groupedLessonsByLocation = groupBy(data, function (item) {
            return [item.address.latitude, item.address.longitude]
          })
          groupedLessonsByLocation.forEach((item, index) => {
            let lessons = []
            for (let i in item) {
              const dStart = new Date(item[i].dateStart)
              const dEnd = new Date(item[i].dateEnd)
              lessons.push({
                id: item[i].id,
                sub: item[i].lessonSubject,
                startDateHour: dStart.getHours(),
                endDateHour: dEnd.getHours(),
                startDateMinutes: (dStart.getMinutes() < 10) ? ('0' + dStart.getMinutes()) : dStart.getMinutes(),
                endDateMinutes: (dEnd.getMinutes() < 10) ? ('0' + dEnd.getMinutes()) : dEnd.getMinutes(),
                date: dStart.getFullYear() + '-' + dStart.getMonth() + 1 + '-' + ((dStart.getDate() < 10) ? '0' + dStart.getDate() : dStart.getDate()),
                lessonDescription: item[i].description,
                coachFirstName: item[i].coachFirstName,
                coachLastName: item[i].coachLastName.slice(0, 1) + '.',
                coachRating: item[i].coachRating
              })
            }
            this.markers.push({
              id: index,
              latlng: Leaflet.latLng(item[0].address.latitude, item[0].address.longitude),
              content: lessons,
              icon: this.defaultIcon
            })
            // bounds.push({ 'lat': item[0].address.latitude, 'lng': item[0].address.longitude })
          })
          console.log(this.markers)
          if (this.markers.length > 0) {
            this.map.fitBounds(bounds)
            this.map.setZoom(10)
          }
        } else if (response.status === 404) {
          this.markers = []
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  created () {
    this.searchLabel = this.$route.params.searchInput
  },
  mounted () {
    this.map = this.$refs.map.mapObject
    this.map.addControl(new Leaflet.Control.Scale())
    if (this.searchMode) {
      this.map.addControl(new this.ControlGps())
      this.map.on('locationfound', this.onLocationFound)
      const provider = new OpenStreetMapProvider()
      const searchControl = new GeoSearchControl({
        provider: provider,
        showMarker: false
      })
      this.map.addControl(searchControl)
    }
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
    async setLesson (lessonId) {
      if (typeof (this.$store.state.auth.user['id']) !== 'undefined') {
        const payload = {
          coachLessonId: lessonId,
          token: localStorage.getItem('token')
        }
        this.createLesson(payload)
      } else {
        alert('Musisz być zalogowany, aby zapisać się na lekcję!')
      }
    },
    async createLesson (payload) {
      const response = await this.$store.dispatch('signUpForLesson', payload)
      if (response.status === 400) {
        alert('Jesteś już zapisany na tą lekcję.')
      } else if (response.status === 201) {
        alert('Zostaleś zapisany na lekcję')
      }
    },
    loadData () {
      this.$http.get('https://nominatim.openstreetmap.org/search/' + this.searchLabel + '?format=json&addressdetails=1&limit=1').then((response) => {
        const location = response.body
        const latLngs = [{ 'lat': location[0].lat, 'lng': location[0].lon }]
        this.map.fitBounds(latLngs)
        this.map.setZoom(14)
      }, (response) => {
        console.error(response)
      })
    },
    setLocation (lat, lon) {
      const latLngs = [{ 'lat': lat, 'lng': lon }]
      this.map.fitBounds(latLngs)
      this.map.setZoom(16)
    }
  }
}
function groupBy (array, f) {
  var groups = {}
  array.forEach(function (o) {
    var group = JSON.stringify(f(o))
    groups[group] = groups[group] || []
    groups[group].push(o)
  })
  return Object.keys(groups).map(function (group) {
    return groups[group]
  })
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
  .popup-content {
    max-height: 300px;
    overflow: auto;
  }
  .outside-popup-div{
    padding:5px;
    margin-bottom: 2em;
  }
  .subject-hour-div{
    text-align: center;
    font-family: Roboto;
    font-size: 18px;
    font-weight:normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #6b53ff;
  }
  .lesson-description {
    padding-top: 15px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
  }
  .image-popup-div{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .image-popup{
    width: 40px;
    height: 40px;
  }
  .content-popup{
    padding: 0;
    margin: 5px;
    font-family: Roboto;
    font-size: 12px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: justify;
    color: #3d3d3d;
  }
  .user-rating{
    display: flex;
    align-items: center;
  }
  .content-popup-name{
    padding: 0 0 0 5px;
    margin: 0;
    font-weight: 500
  }
  .rating-div {
    padding: 0 0 0 5px;
    font-family: Roboto;
    font-size: 12px;
    font-weight: 300;
    align-self: center;
  }
  .button-popup{
    cursor: pointer;
    color:white;
    padding: 10px;
    background: rgb(211,81,147);
    border-radius: 15px;
    margin: 0 auto;
    display: block;
    width:100%;
    margin-top: 1em;
  }
</style>
