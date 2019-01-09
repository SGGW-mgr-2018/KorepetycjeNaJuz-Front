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
    <button
      v-if="showSwitcher"
      type="button"
      class="button-switch"
      @click.prevent="handleSwitcherClick"
    >
      <img :src="passwordIcon" alt="">
    </button>
    <errors-component :errors="errors" :visible="errorsVisible" />
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
    type: {
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
      inputType: this.type,
      errorsVisible: false,
      passwordShowed: false,
      passwordIcon: '/svg/show_pass.svg'
    }
  },
  computed: {
    correctField () {
      return !this.error && this.value
    },
    showSwitcher () {
      return this.inputType === 'password' || this.passwordShowed
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
    },
    handleSwitcherClick () {
      this.inputType = this.passwordShowed ? 'password' : 'text'
      this.passwordIcon = this.passwordShowed ? '/svg/show_pass.svg' : '/svg/hide_pass.svg'
      this.passwordShowed = !this.passwordShowed
    }
  }
}
</script>

<style lang="scss" scoped>
  .input-wrapper {
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
    border: solid 1px #d0d0d0;
    border-radius: 4px;
    padding-left: 10px;

    &.success {
      color: #1a3b0c;
    }
  }

  .button-switch {
    border: none;
    background: none;
    height: 24px;
    width: 24px;
    position: absolute;
    top: 8px;
    right: 29px;
    cursor: pointer;
  }
</style>
