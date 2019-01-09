<template>
  <div :class="{ 'error': errorsVisible }" class="select">
    <multiselect
      v-model="value"
      :options="options"
      :allow-empty="false"
      :placeholder="placeholder"
      track-by="id"
      label="name"
      @input="input"
    >
      <span slot="noOptions">Brak rekordów</span>
    </multiselect>
  </div>
</template>

<script>
import { input } from 'vue-form-factory'

export default {
  name: 'Select',
  components: {
    // ErrorsComponent
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
    },
    options: {
      type: Array,
      default: () => []
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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>
  .select {
    @include font-primary(14px);
    font-weight: 400;
    color: $gray;
    border-radius: 4px;
  }
</style>
