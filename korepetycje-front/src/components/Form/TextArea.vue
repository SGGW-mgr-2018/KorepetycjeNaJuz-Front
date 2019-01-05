<template>
  <div :class="{ 'error': errorsVisible }" class="text-area-wrapper">
    <textarea
      :placeholder="placeholder"
      :value="value"
      :class="classes"
      class="text-area"
      @input="input"
      @blur="handleBlur"
      @focus="handleFocus"
    />
    <errors-component :errors="errors" :visible="errorsVisible" />
  </div>
</template>

<script>
import { input } from 'vue-form-factory'
import ErrorsComponent from '@/components/Form/Errors'

export default {
  name: 'TextArea',
  components: {
    ErrorsComponent
  },
  mixins: [input()],
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    forceErrors: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      errorsVisible: false
    }
  },
  computed: {
    correctField () {
      return !this.error && this.value
    },
    classes () {
      return {
        'error': this.errorsVisible,
        'success': this.correctField
      }
    }
  },
  watch: {
    forceErrors (value) {
      if (value && this.error) {
        this.errorsVisible = value
      }
    }
  },
  methods: {
    handleBlur () {
      this.errorsVisible = !!this.error
    },
    handleFocus () {
      this.errorsVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .text-area-wrapper {
    max-width: 350px;
    width: 100%;
    height: 80px;
    position: relative;
    will-change: margin;
    transition: margin .3s ease-in-out;

    &.error {
      margin: 16px auto 40px;
    }
  }

  .text-area {
    @include font-primary(14px);
    max-width: 280px;
    width: 100%;
    height: 80px;
    padding: 8px 0;
    font-size: 14px;
    font-weight: 400;
    border: solid 1px #bfbfbf;
    padding-left: 10px;

    &:focus {
      border: 2px solid #ffbcdd;
    }

    &.success {
      color: #1a3b0c;
    }
  }
</style>
