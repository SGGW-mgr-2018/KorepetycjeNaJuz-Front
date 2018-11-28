<template>
  <div class="page-lesson">
    <grid-container>
      <p class="page-lesson__title">
        Dodaj nową lekcję
      </p>
    </grid-container>
  </div>
</template>

<script>
export default {
  name: 'AddNewLesson',
  created () {
    this.$store.commit('SET_MENU_THEME', 'violet')
  }
}
</script>

<style lang="scss" scoped>
  .page-lesson {
    padding: 100px 0;

    &__title {
      @include font-primary(24px);
    }
  }
</style>
