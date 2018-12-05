<template>
  <div class="page">
    <nav-bar />
    <router-view />
    <footer-component />
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import FooterComponent from './components/Footer'

export default {
  name: 'App',
  components: {
    NavBar,
    FooterComponent
  },
  created () {
    this.$store.dispatch('tryAutoLogin')
  }
}
</script>

<style lang="scss">
  @import 'assets/sass/index';

  .page {
    background-color: $gray-lighter;
  }
</style>
