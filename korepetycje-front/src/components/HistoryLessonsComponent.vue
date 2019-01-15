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

const tab = [
  {
    id: 1,
    sub_name: 'Język Angielski',
    less_date: '24.05.2018 18:00-19:00',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eleifend tempus iaculis. Praesent interdum, magna ac sagittis convallis, risus ex condimentum ipsum, sed luctus nulla ipsum ac augue. Nullam egestas nulla eu eros sagittis feugiat. Nulla eget risus eu neque ullamcorper sollicitudin. Aenean sed turpis at libero pulvinar pulvinar eget eu mi',
    opinion_set: true,
    stars_rate: 3
  },
  {
    id: 2,
    sub_name: 'Biologia',
    less_date: '01.03.2017 12:00-13:00',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eleifend tempus iaculis. Praesent interdum, magna ac sagittis convallis, risus ex condimentum ipsum, sed luctus nulla ipsum ac augue. Nullam egestas nulla eu eros sagittis feugiat. Nulla eget risus eu neque ullamcorper sollicitudin. Aenean sed turpis at libero pulvinar pulvinar eget eu mi',
    opinion_set: false,
    stars_rate: 3
  }
]
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
