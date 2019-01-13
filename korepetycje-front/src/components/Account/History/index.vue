<template>
  <history-lessons class="history-lessons" />
</template>

<script>
import HistoryLessons from '@/components/HistoryLessonsComponent'
import { mapActions } from 'vuex'

export default {
  name: 'History',
  components: {
    HistoryLessons
  },
  data () {
    return {

    }
  },
  async mounted () {
    await this.fetchHistory()
  },
  methods: {
    ...mapActions(['fetchHistory'])
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
