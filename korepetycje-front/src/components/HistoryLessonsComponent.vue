<template>
  <div v-cloak class="history-container">
    <history-lesson
      v-for="lesson in lessons"
      :key="lesson.id"
      :lesson="lesson"
    />
  </div>
</template>

<script>
import HistoryLesson from '@/components/HistoryLessonComponent'
export default {
  name: 'HistoryLessons',
  components: { HistoryLesson },
  props: {
    lessons: {
      type: Array,
      default: () => []
    }
  },
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

  .history-container {
    max-height: 700px;
    max-width: 720px;
    width: 100%;
    overflow-y: scroll;
  }
</style>
