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
    <div class="events-wrapper">
      <h2 class="events-wrapper__title">
        Lista korepetycji
      </h2>
      <p v-if="!events" class="events-wrapper__empty-message">Pusto :(</p>
      <div v-if="events" class="events">
        <event-component />
        <event-component user-type="Korepetytor" />
      </div>
    </div>
  </div>
</template>

<script>
import { FullCalendar } from 'vue-full-calendar'
import ButtonComponent from '@/components/Button'
import EventComponent from './EventComponent'
import moment from 'moment'
import 'fullcalendar/dist/fullcalendar.css'
import 'fullcalendar/dist/locale/pl'

export default {
  name: 'Calendar',
  components: {
    FullCalendar,
    ButtonComponent,
    EventComponent
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
  .events-wrapper {
    border-top: 5px dashed $pink;
    margin-top: 30px;

    &__title {
      @include font-primary(24px);
      font-weight: 400;
    }

    &__empty-message {
      @include font-primary(43px);
      margin: 0;
      text-align: center;
      color: #d1d1d1;

      @include mobile {
        font-size: 24px;
      }
    }
  }
</style>
