<template>
  <div :class="{ 'error': errorsVisible }" class="select">
    <multiselect
      v-model="value"
      :options="options"
      :allow-empty="false"
      :placeholder="placeholder"
    >
      <span slot="noOptions">Brak rekordów</span>
    </multiselect>
    <!--<errors-component :errors="errors" :visible="errorsVisible" />-->
  </div>
</template>

<script>
// import ErrorsComponent from '@/components/Form/Errors'

export default {
  name: 'Select',
  components: {
    // ErrorsComponent
  },
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
      errorsVisible: false,
      value: null,
      options: []
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
    color: $gray;
  }
</style>
