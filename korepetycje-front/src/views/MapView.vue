<template>
  <div id="map-div">
    <input
      v-model="subject"
      class="rounded"
      placeholder="Wpisz przedmiot"
      @input="setInput"
    >
    <map-container />
  </div>
</template>

<script>
import MapContainer from '@/components/MapComponent'
import debounce from 'lodash.debounce'

export default {
  name: 'Map',
  components: {
    MapContainer
  },
  data () {
    return {
      subject: ''
    }
  },
  created () {
    this.subject = this.$route.params.searchInput
    this.$store.commit('SET_MENU_THEME', 'violet')
  },
  methods: {
    setInput () {
      this.search(this.subject, this)
    },
    search: debounce((query, self) => {
      self.$store.commit('SET_SEARCH_QUERY', query)
    }, 500)
  }
}
</script>
<style lang="scss" scoped>
  #map-div {
    position: relative;
    padding: 70px 0 0 0 ;
  }
  .rounded {
    background: url("/img/magnifier.png") no-repeat scroll ;
    background-size: 60px 64px;
    padding-left: 70px;
    width: 440px;
    height: 64px;
    border-radius: 26.4px;
    box-shadow: 0px 3px 7px 0 rgba(158, 158, 158, 0.49);
    background-color: var(--white);
  }
</style>
