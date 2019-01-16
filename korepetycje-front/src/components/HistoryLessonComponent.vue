<template>
  <div class="history-lesson">
    <div class="history-lesson__details">
      <div class="history-lesson-header">{{ lesson.subjectName }}, {{ lesson.lessonLevelsName }}, {{ startDate }}</div>
      <div class="history-lesson__small"> {{ lesson.coachFirstName }} {{ lesson.coachLastName }} </div>
      <div v-if="lesson.description" class="history-lesson-description">{{ lesson.description }}</div>
    </div>

    <button-component
      :class="{'invisible': isOpinionFromAPI || ratingMode}"
      class="login-modal__button set-opinion-button"
      pink
      @click="enableRating()"
    >
      WYSTAW OPINIĘ
    </button-component>

    <div
      class="star-rating-div"
      :class="{'invisible': !ratingMode && !isOpinionFromAPI}"
    >
      <span class="your-opinion-label">Twoja opinia: </span>
      <star-rating
        class="stars_rating"
        :increment="1"
        :max-rating="5"
        :rtl="false"
        inactive-color="white"
        active-color="yellow"
        :star-size="20"
        :show-rating="false"
        :rating="lesson.ratingOfCoach"
        :read-only="isOpinionFromAPI"
        :border-width="2"
        border-color="#000"
        :rounded-corners="true"
        :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
        @rating-selected ="setRating"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import ButtonComponent from '@/components/Button'
import StarRating from 'vue-star-rating'
export default {
  name: 'HistoryLesson',
  components: { ButtonComponent, StarRating },
  props: {
    lesson: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      isOpinionFromAPI: false,
      ratingMode: false
    }
  },
  computed: {
    startDate () {
      return moment(this.lesson.dateStart).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  created () {
    this.isOpinionFromAPI = (this.lesson.ratingOfCoach !== null)
  },
  methods: {
    enableRating () {
      this.ratingMode = true
      this.lesson.ratingOfCoach = 0
    },
    async setRating (rating) {
      const payload = {
        lessonId: this.lesson.lessonId,
        rating: rating
      }
      await this.$store.dispatch('rateCoach', payload)
      this.isOpinionFromAPI = true
    }
  }
}
</script>

<style lang="scss" scoped>
  [v-cloak] {
    visibility: hidden;
  }

  .history-lesson{
    margin-bottom: 2em;
    max-width: 720px;
    width: 100%;
    padding-right: 2%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .history-lesson__details {
    flex: 1;

    @include mobile{
      flex: none;
      width: 100%;
    }
  }

  .avatar-img{
    width: 15vh;
    height: 15vh;
    float: left;
    background: grey;
    margin-right: 3%;
    border-radius: 50%;
  }

  .history-lesson-header{
    font-family: Roboto;
    font-size: 15px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #6b52ff;
    margin-bottom: 1%;
  }

  .history-lesson-description{
    font-size: 0.9rem;
    text-align: justify;
    color: gray;
    height: 100%;
    width: 90%;
    margin-top: 1em;
  }

  .set-opinion-button{
    font-size: 0.7rem;
  }

  .invisible{
    display: none;
  }

  .stars_rating{
    float: left;
    padding: 7px;

    @include mobile{
      flex: none;
      width: 100%;
    }
  }

  .your-opinion-label{
    padding: 12px 1px;
    float: left;
    font-size: 10px;
  }

  .star-rating-div{
    float: right;
  }
</style>
