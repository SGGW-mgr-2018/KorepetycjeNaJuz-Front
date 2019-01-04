<template>
  <div class="event" :class="eventClasses">
    <p class="event__user">{{ userType }}</p>
    <h2 class="event__title">
      {{ title }}, {{ difficulty }}, {{ time }}
    </h2>
    <p class="event__description">{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'EventComponent',
  props: {
    title: {
      type: String,
      default: 'Tytuł'
    },
    difficulty: {
      type: String,
      default: 'Poziom lekcji'
    },
    time: {
      type: String,
      default: 'Brak przedziału czasowego'
    },
    userType: {
      type: String,
      default: 'Użytkownik'
    }
  },
  data () {
    return {
      description: 'To jest jakiś opis lekcji. Zapraszam na zajęcia. Poziom średnio-mistrzowski. Brak jedzenia.'
    }
  },
  computed: {
    eventClasses () {
      return {
        'event--teacher': this.isTeacher,
        'event--learner': !this.isTeacher
      }
    },
    isTeacher () {
      return this.userType === 'Korepetytor'
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
