<template>
  <div v-cloak class="history-container">
    <history-lesson />
    <history-lesson />
  </div>
</template>

<script>
import HistoryLesson from '@/components/HistoryLessonComponent'
export default {
  name: 'HistoryLessons',
  components: { HistoryLesson },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  [v-cloak] {
    visibility: hidden;
  }
  .history-container{
    height: 60vh;
    padding-top: 10vh;
    width: 80vh;
  }
</style>
