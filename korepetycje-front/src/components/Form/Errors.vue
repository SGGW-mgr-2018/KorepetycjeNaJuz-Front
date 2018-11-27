<template>
  <transition name="fade">
    <div v-if="visible" class="errors">
      {{ error }}
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Errors',
  props: {
    errors: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    error () {
      return this.errors[0] || ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .errors {
    @include font-primary;
    margin: 10px 0;
    padding: 7px 16px;
    background: rgba(239, 83, 71, 0.1);
    border-radius: 6px;
    text-align: center;
  }
</style>
