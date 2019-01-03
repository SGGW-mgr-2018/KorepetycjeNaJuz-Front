<template>
  <div>
    Kalendarz
    <full-calendar :config="config" :events="events" />
  </div>
</template>

<script>
import { FullCalendar } from 'vue-full-calendar'
import moment from 'moment'
import 'fullcalendar/dist/fullcalendar.css'

export default {
  name: 'Calendar',
  components: {
    FullCalendar
  },
  data () {
    return {
      events: [
        {
          title: 'Test',
          allDay: true,
          start: moment(),
          end: moment().add(1, 'd')
        },
        {
          title: 'Kolejny test',
          start: moment().add(2, 'd'),
          end: moment().add(2, 'd').add(2, 'h')
        }
      ],
      config: {
        defaultView: 'month',
        eventRender (event, element) {
          console.log(event)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
