<template>
  <div :class="{ 'error': errorsVisible }" class="datepick-wrapper">
    <date-picker
      v-model="value"
      class="input"
      lang="en"
      :type="type"
      :class="classes"
      :placeholder="placeholder"
      :format="format"
      :time-picker-options="timePickerOptions"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="input"
    />
    <errors-component :errors="errors" :visible="errorsVisible" />
  </div>
</template>

<script>
import { input } from 'vue-form-factory'
import ErrorsComponent from '@/components/Form/Errors'
import DatePicker from 'vue2-datepicker'

export default {
  name: 'DatePick',
  components: {
    DatePicker,
    ErrorsComponent
  },
  mixins: [input()],
  props: {
    type: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    format: {
      type: String,
      default: 'DD-MM-YYYY'
    },
    timePickerOptions: {
      type: Object,
      default: () => {}
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
  .datepick-wrapper {
    @include font-primary;
    max-width: 350px;
    width: 100%;
    height: 48px;
    position: relative;
    will-change: margin;
    transition: margin .3s ease-in-out;

    &.error {
      margin: 16px auto 40px;
    }
  }

  .input {
    position: relative;
    font-size: 14px;
    max-width: 280px;
    width: 100%;
    height: 38px;
    border: solid 1px #bfbfbf;
    padding-left: 10px;

    &.success {
      color: #1a3b0c;
    }
  }

  .button {
    border: none;
    background: none;
    height: 24px;
    width: 24px;
    /*position: absolute;
    top: 8px;
    right: 29px;*/
    cursor: pointer;
  }
</style>
