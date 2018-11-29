<template>
  <div v-cloak class="history-container-out">
    <div v-cloak class="history-container">
      <history-lesson
        v-for="item in dataContainer"
        :key="item.id"
        :subject-name="item.sub_name"
        :lesson-date="item.less_date"
        :lesson-description="item.desc"
        :is-opinion-set="item.opinion_set"
        :stars-rate="item.stars_rate"
      />
    </div>
  </div>
</template>

<script>
import HistoryLesson from '@/components/HistoryLessonComponent'
export default {
  name: 'HistoryLessons',
  components: { HistoryLesson },
  data () {
    return {
      dataContainer: tab
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
  },
  {
    id: 3,
    sub_name: 'Geografia',
    less_date: '18.03.2018 09:00-11:00',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eleifend tempus iaculis. Praesent interdum, magna ac sagittis convallis, risus ex condimentum ipsum, sed luctus nulla ipsum ac augue. Nullam egestas nulla eu eros sagittis feugiat. Nulla eget risus eu neque ullamcorper sollicitudin. Aenean sed turpis at libero pulvinar pulvinar eget eu mi',
    opinion_set: false,
    stars_rate: 0
  },
  {
    id: 4,
    sub_name: 'Geografia',
    less_date: '18.03.2018 09:00-11:00',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eleifend tempus iaculis. Praesent interdum, magna ac sagittis convallis, risus ex condimentum ipsum, sed luctus nulla ipsum ac augue. Nullam egestas nulla eu eros sagittis feugiat. Nulla eget risus eu neque ullamcorper sollicitudin. Aenean sed turpis at libero pulvinar pulvinar eget eu mi',
    opinion_set: false,
    stars_rate: 0
  }
]
</script>

<style lang="scss" scoped>
  [v-cloak] {
    visibility: hidden;
  }

  .history-container{
    max-height: 60vh;
    max-width: 720px;
    overflow-y: scroll;
  }

  .history-container-out{
    max-height: 60vh;
    padding-top: 10vh;
    max-width: 720px;
    overflow: hidden;
  }
</style>
