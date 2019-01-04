<template>
  <div class="calendar">
    <button-component class="button-refresh" pink @click="refreshCalendar">
      Odśwież kalendarz
    </button-component>
    <button @click="addEvent">Dodaj event</button>
    <full-calendar
      ref="calendar"
      :config="config"
      :events="events"
      @day-click="handleClick"
      @event-selected="eventSelected"
    />
    div.events-list
  </div>
</template>

<script>
import { FullCalendar } from 'vue-full-calendar'
import ButtonComponent from '@/components/Button'
import moment from 'moment'
import 'fullcalendar/dist/fullcalendar.css'
import 'fullcalendar/dist/locale/pl'

export default {
  name: 'Calendar',
  components: {
    FullCalendar,
    ButtonComponent
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
    },
    refreshCalendar () {
      this.$refs.calendar.$emit('refresh-events')
    },
    addEvent () {
      const event = {
        title: 'Losowy event',
        description: 'To jest opis',
        start: moment().add(2, 'h'),
        end: moment().add(5, 'h')
      }
      this.$refs.calendar.$emit('render-event', event)
    },
    eventSelected (event) {
      console.log(event)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
