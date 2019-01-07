<template>
  <transition name="fade">
    <div v-if="visible" class="success">
      {{ success }}
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Successes',
  props: {
    successes: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    success () {
      return this.successes[0] || ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .success {
    @include font-primary;
    margin: 10px 0;
    padding: 7px 16px;
    background: rgba(128, 180, 107, 0.1);
    border-radius: 6px;
    text-align: center;
  }
</style>
