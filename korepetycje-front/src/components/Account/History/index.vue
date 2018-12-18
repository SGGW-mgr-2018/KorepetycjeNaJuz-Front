<template>
  <history-lessons class="history-lessons" />
</template>

<script>
import HistoryLessons from '@/components/HistoryLessonsComponent'
export default {
  name: 'History',
  components: {
    HistoryLessons
  }
}
</script>

<style lang="scss" scoped>
  .history-lessons{
    margin: 0 auto;
    max-width: 720px;
    width: 100%;
  }
</style>
