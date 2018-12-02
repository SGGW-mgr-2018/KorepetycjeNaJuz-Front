<template>
  <div id="map-div">
    <input v-model="subject" class="Prostoktzaokrglony" placeholder="Wpisz przedmiot">
    <map-container />
  </div>
</template>

<script>
import MapContainer from '@/components/MapComponent'

export default {
  name: 'Map',
  components: {
    MapContainer
  }
}
</script>
<style lang="scss" scoped>
  #map-div {
    position: relative;
    padding: 70px 0 0 0 ;
  }
  .Prostoktzaokrglony {
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
