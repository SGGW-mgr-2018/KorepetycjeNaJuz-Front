<template>
  <div :class="{ 'error': errorsVisible }" class="input-wrapper">
    <input
      :type="inputType"
      :placeholder="placeholder"
      :value="value"
      :class="classes"
      class="input"
      @input="input"
      @blur="handleBlur"
      @focus="handleFocus"
    >
    <errors-component :errors="errors" :visible="errorsVisible"/>
  </div>
</template>

<script>
import { input } from 'vue-form-factory'
import ErrorsComponent from '@/components/Form/Errors'

export default {
  name: 'Input',
  components: {
    ErrorsComponent
  },
  mixins: [input()],
  props: {
    inputType: {
      type: String,
      default: 'text'
    },
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
  .input {
    &.success {
      color: #bada55;
    }
  }
</style>
