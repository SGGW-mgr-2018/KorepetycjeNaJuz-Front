<template>

  <div class="page--home">
    <grid-container>
      <search-bar />
      <testimonials />
    </grid-container>

    <description />
    <questions />
  </div>

</template>

<script>
import SearchBar from '@/components/Home/SearchBar'
import Testimonials from '@/components/Home/Testimonials'
import Description from '@/components/Home/Description'
import Questions from '@/components/Home/Questions'

export default {
  name: 'Home',
  components: {
    SearchBar,
    Testimonials,
    Description,
    Questions
  },
  created () {
    this.$store.commit('SET_MENU_THEME', 'white')
  }
}
</script>

<style lang="scss" scoped>
  .page--home {
    padding: 200px 0 70px;
    background-image: url('/img/bg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;

    @include tablet {
      padding: 100px 0 70px;
    }

    @include mobile {
      padding: 50px 0;
    }
  }
</style>
