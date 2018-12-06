<template>
  <div
    :class="styles"
    class="checkbox-field"
  >
    <label class="label">
      <input
        class="nativeCheckbox sr-only"
        type="checkbox"
        @change="handleChange"
        @blur="handleBlur"
      >
      <div class="checkbox" />
      <div class="text">
        <span>{{ label }}</span>
      </div>
    </label>
    <errors-component :errors="errors" :visible="errorsVisible" />
  </div>
</template>

<script>
import { input } from 'vue-form-factory'
import ErrorsComponent from '@/components/Form/Errors'

export default {
  name: 'Checkbox',
  components: {
    ErrorsComponent
  },
  mixins: [input()],
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
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
    styles () {
      return {
        'checkbox--active': this.value,
        'error': this.errorsVisible
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
    handleChange (evt) {
      const inputValue = evt.target.checked
      this.input(inputValue)
      inputValue && (this.errorsVisible = false)
    },
    handleBlur () {
      setTimeout(() => {
        this.errorsVisible = !!this.error
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
  .sr-only {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px, 1px, 1px, 1px);
  }

  .checkbox-field {
    max-width: 350px;
    margin: 16px auto 0;
  }

  .label {
    margin: 17px 0 0;
    display: flex;
    cursor: pointer;
  }

  .nativeCheckbox {
    &:focus {
      + .checkbox {
        background: $gray;
        border: 1px solid #efefef;
      }
    }

    &:checked {
      + .checkbox {
        &::before,
        &::after {
          opacity: 1;
        }
      }
    }
  }

  .checkbox {
    width: 24px;
    height: 24px;
    margin: 0 16px 0 0;
    position: relative;
    border: 1px solid rgba(61, 61, 61, 0.62);
    border-radius: 6px;
    flex-shrink: 0;
    transition: all .2s;

    .error & {
      border: 1px solid rgba(239, 83, 71, 0.5);
    }

    &::before {
      display: flex;
      justify-content: center;
      align-items: center;
      content: url('/svg/checkmark.svg');
      width: 22px;
      height: 22px;
      padding: 5px;
      color: $pink;
      background: #fff;
      opacity: 0;
      text-align: center;
      border-radius: 6px;
    }
  }

  .text {
    @include font-primary(11px);

    /deep/ a {
      color: #58627b;
    }

    /deep/ ul {
      padding: 0;

      li {
        margin: 0 0 0 15px;
      }
    }
  }
</style>
