<template>
  <div class="event" :class="eventClasses">
    <p class="event__user">{{ userType }}</p>
    <h2 class="event__title">
      {{ title }}, {{ lessonLevels }}, {{ startDate }}
    </h2>
    <div class="event__description">
      <p>Czas trwania lekcji: <b>{{ time }}</b></p>
      <p>{{ description }}</p>
    </div>
    <p v-if="!isTeacher">Zajęcia prowadzone przez: <b>{{ coach }}</b></p>
    <p v-if="isTeacher">Uczeń: <b>{{ student }}</b></p>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'EventComponent',
  props: {
    event: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    eventClasses () {
      return {
        'event--teacher': this.isTeacher,
        'event--learner': !this.isTeacher
      }
    },
    title () {
      return this.event.title || 'Brak tytułu'
    },
    startDate () {
      return moment(this.event.start).format('DD-MM-YYYY HH:MM:ss')
    },
    time () {
      return this.event.time + ' minut'
    },
    lessonLevels () {
      if (!this.event.levels) return 'Brak poziomu lekcji'
      return this.event.levels.reduce((text, level) => {
        text += level.name + ', '
        return text.slice(0, -2)
      }, '')
    },
    description () {
      return this.event.description || 'Brak opisu lekcji'
    },
    userType () {
      return this.isTeacher ? 'Korepetytor' : 'Uczeń'
    },
    coach () {
      return this.event.coachFirstName + ' ' + this.event.coachLastName
    },
    student () {
      return this.event.studentFirstName + ' ' + this.event.studentLastName
    },
    isTeacher () {
      return this.event.userType === 2
    }
  },
  watch: {
    event: {
      immediate: true,
      handler (value) {
        console.log(value.userType)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .event {
    @include font-primary(16px);
    position: relative;
    max-width: 640px;
    width: 100%;
    margin-top: 40px;
    padding: 5px 25px;

    &--teacher {
      background-color: #e8e4ff;
      border-bottom: 2px solid #cdbaff;
    }

    &--learner {
      background-color: #e4f2ff;
      border-bottom: 2px solid #a8e5ff;
    }

    &__title {
      @include font-primary(18px);
      font-weight: 500;
    }

    &__user {
      position: absolute;
      top: -45px;
      right: 0;
    }
  }
</style>
