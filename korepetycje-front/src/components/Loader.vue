<template>
  <img :src="src" alt="Wczytywanie" class="img">
</template>

<script>
export default {
  props: {
    dark: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    src () {
      return this.dark ? '/svg/loader_dark.svg' : '/svg/loader.svg'
    }
  }
}
</script>

<style lang="scss" scoped>
  @keyframes rotate360 {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .img {
    display: block;
    animation: rotate360 2s linear infinite;
  }
</style>
