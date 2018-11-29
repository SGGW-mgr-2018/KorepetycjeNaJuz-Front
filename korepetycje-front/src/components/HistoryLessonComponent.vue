<template>
  <div class="history-lesson">
    <img alt="LOGO" src="/img/fb_avatar.png" class="avatar-img">
    <div class="history-lesson-header">{{ header_subjectName }}, {{ header_lessonDate }}</div>
    <div class="history-lesson-description">{{ body_lessonDescription }}</div>
    <button-component class="login-modal__button set-opinion-button" :class="{'invisible': opinionSet}" pink @click="enableRating()">
      WYSTAW OPINIĘ
    </button-component>
    <div class="star-rating-div" :class="{'invisible': !opinionSet}">
      <span class="your-opinion-label">Twoja opinia: </span>
      <star-rating
        class="stars_rating"
        :increment="1"
        :max-rating="5"
        :rtl="false"
        inactive-color="white"
        border-color="#000"
        :border-width="2"
        active-color="yellow"
        :rounded-corners="true"
        :star-size="15"
        :show-rating="false"
        :rating="stars_rate"
      />
    </div>
  </div>
</template>

<script>
import ButtonComponent from '@/components/Button'
import StarRating from 'vue-star-rating'
export default {
  name: 'HistoryLesson',
  components: { ButtonComponent, StarRating },
  props: {
    subjectName: {
      type: String,
      default: ''
    },
    lessonDate: {
      type: String,
      default: ''
    },
    lessonDescription: {
      type: String,
      default: ''
    },
    isOpinionSet: {
      type: Boolean,
      default: false
    },
    starsRate: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      header_subjectName: this.subjectName,
      header_lessonDate: this.lessonDate,
      body_lessonDescription: this.lessonDescription,
      opinionSet: this.isOpinionSet,
      stars_rate: this.starsRate
    }
  },
  mounted () {
  },
  methods: {
    enableRating () {
      this.opinionSet = !this.opinionSet
      this.stars_rate = 0
    }
  }
}
</script>

<style lang="scss" scoped>
  [v-cloak] {
    visibility: hidden;
  }
  .history-lesson{
    height: 15vh;
    margin-bottom: 10vh;
    max-width: 720px;
    width: 100%;
    padding-right: 2%;
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
    font-size: 12px;
    font-family: Roboto;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: justify;
    color: gray;
    text-overflow: ellipsis;
    overflow: auto;
    max-height: 11vh;
    height: 100%;
  }

  .set-opinion-button{
    float: right;
    margin-top: 1vh;
    font-size: 10px;
    padding: 6px 15vh;
  }

  .invisible{
    display: none;
  }

  .stars_rating{
    float: left;
    padding: 7px;
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
