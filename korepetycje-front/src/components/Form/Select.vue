<template>
  <div class="select">
    <multiselect
      v-model="value"
      :options="options"
      :allow-empty="false"
    >
      <span slot="noOptions">Brak rekordów</span>
    </multiselect>
  </div>
</template>

<script>
export default {
  name: 'Select',
  data () {
    return {
      value: null,
      options: []
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
