<template>
  <button
    :type="type"
    :class="styles"
    class="button"
    @click="$emit('click')"
  >
    <slot v-if="!loading" />
    <loader-component v-else />
  </button>
</template>

<script>
import LoaderComponent from '@/components/Loader'

export default {
  name: 'Button',
  components: {
    LoaderComponent
  },
  props: {
    type: {
      type: String,
      default: 'button'
    },
    pink: {
      type: Boolean,
      default: false
    },
    grey: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    styles () {
      return {
        'button--pink': this.pink,
        'button--loading': this.loading,
        'button--grey': this.grey
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .button {
    @include reset-button;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 7px 20px;
    border-radius: 10px;
    text-transform: uppercase;
    text-align: center;
    font-weight: 500;
    letter-spacing: .3px;
    cursor: pointer;
    transition: color .3s,
    border .3s,
    background .3s;

    &--pink {
      background: $pink;
      color: #fff;

      &:hover {
        background: $blue;
      }
    }

    &--loading {
      opacity: .8;
      pointer-events: none;
    }

    &--grey {
      background: #3d3d3d;
      color: white;

      &:hover {
        background: grey;
      }
    }
  }
</style>
