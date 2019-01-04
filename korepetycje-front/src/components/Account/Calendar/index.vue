<template>
  <div class="calendar">
    <full-calendar
      :config="config"
      :events="events"
      @day-click="handleClick"
    />
  </div>
</template>

<script>
import { FullCalendar } from 'vue-full-calendar'
import moment from 'moment'
import 'fullcalendar/dist/fullcalendar.css'
import 'fullcalendar/dist/locale/pl'

export default {
  name: 'Calendar',
  components: {
    FullCalendar
  },
  data () {
    return {
      events: [
        {
          title: 'Test 1',
          start: moment(),
          end: moment().add(1, 'd')
        },
        {
          title: 'Test 2',
          start: moment().add(1, 'h'),
          end: moment().add(1, 'd').add(1, 'h')
        },
        {
          title: 'Kolejny test',
          start: moment().add(2, 'd'),
          end: moment().add(2, 'd').add(2, 'h')
        }
      ],
      config: {
        locale: 'pl',
        defaultView: 'month',
        eventRender (event, element) {
          // console.log(event)
        }
      }
    }
  },
  methods: {
    handleClick (event) {
      console.log(event)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
