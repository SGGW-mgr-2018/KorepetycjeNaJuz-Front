<template>
  <div class="page--user">
    <grid-container class="page-container">
      <h1 class="main-header">Informacje o użytkowniku</h1>
      <div class="content-container">
        <img :src="user.avatar" class="user-avatar" alt="Avatar">
        <div class="user-details">
          <h2 class="user-name">{{ user.firstName }} {{ user.lastName }}</h2>
          <div class="user-about">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eleifend tempus iaculis. Praesent interdum, magna ac sagittis convallis, risus ex condimentum ipsum, sed luctus nulla ipsum ac augue. Nullam egestas nulla eu eros sagittis feugiat. Nulla eget risus eu neque ullamcorper sollicitudin. Aenean sed turpis at libero pulvinar pulvinar eget eu mi. Ut vitae eleifend ligula, at convallis massa. Aliquam erat volutpat.
          </div>
          <div class="star-rating">
            <span>Średnia ocena:</span>
            <star-rating
              v-model="user.rating"
              :inline="true"
              :show-rating="false"
              :border-width="2"
              :border-color="'#000'"
              :star-size="30"
              read-only
            />
          </div>
          <div>
            <div class="active">Aktualne korepetycje:</div>
            <div v-for="lesson in user.lessons" :key="lesson.id" class="lesson">
              <h2 class="lesson-title">{{ lesson.lessonSubject }}, {{ lesson.date }}, {{ lesson.time }}</h2>
              <div class="description">{{ lesson.description }}</div>
              <button-component pink class="button-enroll" @click="enroll">
                ZAPISZ SIĘ
              </button-component>
            </div>
          </div>
        </div>
      </div>
    </grid-container>
  </div>
</template>

<script>
import ButtonComponent from '@/components/Button'
import StarRating from 'vue-star-rating'
export default {
  name: 'UserAbout',
  components: {
    ButtonComponent,
    StarRating
  },
  data () {
    return {
      user: {
        id: 1,
        firstName: 'Jan',
        lastName: 'Kowalski',
        avatar: 'https://www.shareicon.net/download/2017/02/05/878221_user_512x512.png',
        rating: 3,
        lessons: [
          {
            id: 5,
            lessonSubject: 'Matematyka',
            date: '23.09.2018',
            time: '16:00-17:30',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eleifend tempus iaculis. Praesent interdum, magna ac sagittis convallis, risus ex condimentum ipsum, sed luctus nulla ipsum ac augue. Nullam egestas nulla eu eros sagittis feugiat. Nulla eget risus eu neque ullamcorper sollicitudin. Aenean sed turpis at libero pulvinar pulvinar eget eu mi. Ut vitae eleifend ligula, at convallis massa. Aliquam erat volutpat.'
          }
        ]
      }
    }
  },
  created () {
    this.$store.commit('SET_MENU_THEME', 'violet')
  },
  methods: {
    enroll () {
      console.log('Kliknięto Zapisz się')
    }
  }
}
</script>

<style lang="scss" scoped>
  .page--user {
    padding: 100px 0;
  }

  .page-container {
    position: relative;
    max-width: 915px;
    margin: 0 auto;

    &:before {
      content: '';
      background: url("/svg/pen_purple.svg") no-repeat;
      width: 93px;
      height: 120px;
      background-size: contain;
      position: absolute;
      transform: scaleX(-1);
      bottom: 0;
      left: 60px;

      @include mobile() {
        display: none;
      }
    }

    &:after {
      content: '';
      background: url("/svg/pen_purple.svg") no-repeat;
      width: 78px;
      height: 90px;
      background-size: contain;
      position: absolute;
      top: 148px;
      right: 10px;

      @include mobile() {
        display: none;
      }
    }
  }

  .main-header {
    padding-left: 93px;

    @include mobile() {
      padding-left: 0;
      text-align: center;
    }
  }

  .content-container {
    display: flex;
    position: relative;
    z-index: 1;

    @include mobile() {
      flex-direction: column;

      .user-details {
        padding-left: 0;
        margin-top: 15px;
      }
    }
  }

  .lesson {
    clear: both;
    margin-bottom: 45px;
  }

  .user-name {
    padding-top: 0;
    margin-top: 0;
  }

  h1, h2, h3 {
    @include font-primary;
    font-family: Roboto;
    font-size: 72px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #6b52ff;
  }

  h1 {
    font-size: 36px;
    color: #715aff;
    margin-bottom: 36px;
  }

  h2 {
    font-size: 18px;
    display: inline-block;
    text-align: left;
    font-weight: 500;

    &.bottom {
      padding: 36px 0 18px 0;

      @include mobile {
        padding: 20px 0 10px;
      }
    }
  }

  .user-avatar {
    width: 93px;
    height: 93px;
    border-radius: 100%;

    @include mobile() {
      margin: auto;
    }
  }

  .user-about {
    text-align: justify;
    display: inline-block;
  }

  .star-rating {
    font-weight: 500;
    color: var(--greyish-brown);
    display: flex;
    align-items: center;
    margin-top: 15px;

    > span {
      display: inline-block;
      margin-right: 15px;
    }
  }

  .lesson-title {
    font-weight: normal;
    margin-bottom: 0;
  }

  .description {
    text-align: justify;
    font-size: 14px;
    padding-bottom: 20px;
  }

  .user-details {
    padding-left: 30px;
    display: inline-block;
  }

  .active {
    font-size: 20px;
    font-weight: 500;
    color: var(--greyish-brown);
    padding-top: 43px;
  }

  .button {
    max-width: 280px;
    width: 100%;
    height: 40px;
    float: right;
  }
</style>
