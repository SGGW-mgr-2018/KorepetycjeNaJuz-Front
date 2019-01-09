<template>
  <div class="calendar">
    <button-component class="button-refresh" pink @click="refreshCalendar">
      Odśwież kalendarz
    </button-component>
    <button @click="addEvent">Dodaj event</button>
    <full-calendar
      ref="calendar"
      :config="config"
      @day-click="handleClick"
      @event-selected="eventSelected"
    />
    <div class="events-wrapper">
      <h2 class="events-wrapper__title">
        Lista korepetycji
      </h2>
      <p v-if="!getLessons" class="events-wrapper__empty-message">Pusto :(</p>
      <div v-if="selectedEvent" class="events">
        <event-component :event="selectedEvent" />
      </div>
    </div>
  </div>
</template>

<script>
import { FullCalendar } from 'vue-full-calendar'
import ButtonComponent from '@/components/Button'
import EventComponent from './EventComponent'
import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'
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
      loading: false,
      selectedEvent: null,
      config: {
        locale: 'pl',
        defaultView: 'month'
      }
    }
  },
  computed: {
    ...mapGetters(['getLessons'])
  },
  async mounted () {
    this.loading = true
    await this.fetchCalendarData()
    this.loading = false
    this.addLessons()
  },
  methods: {
    ...mapActions(['fetchCalendarData']),
    handleClick (...args) {
      console.log('Click', args)
    },
    refreshCalendar () {
      this.$refs.calendar.$emit('refresh-events')
    },
    addLessons () {
      this.getLessons.forEach(this.addEvent)
    },
    addEvent (lesson) {
      const event = {
        title: lesson.lessonSubject,
        description: lesson.description,
        levels: lesson.lessonLevels,
        ratePerHour: lesson.ratePerHour,
        userType: lesson.userType,
        start: moment(lesson.dateStart),
        end: moment(lesson.dateEnd).add(lesson.time, 'm'),
        time: lesson.time,
        coachFirstName: lesson.coachFirstName,
        coachLastName: lesson.coachLastName,
        coachId: lesson.coachId,
        studentFirstName: lesson.studentFirstName,
        studentLastName: lesson.studentLastName,
        studentId: lesson.studentId
      }
      this.$refs.calendar.$emit('render-event', event)
    },
    eventSelected (event) {
      this.selectedEvent = event
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
