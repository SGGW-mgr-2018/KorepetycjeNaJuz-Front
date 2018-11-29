<template>
  <div class="page--user">
    <grid-container class="page-container">
      <img src="/svg/pen_purple.svg" class="pencil left" alt="Pencil">
      <img src="/svg/pen_purple.svg" class="pencil right" alt="Pencil">
      <h1>Informacje o użytkowniku</h1>
      <img :src="user.avatar" class="user-avatar" alt="Avatar">
      <div class="user-details">
        <h2>{{ user.firstName }} {{ user.lastName }}</h2>
        <div class="user-about">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eleifend tempus iaculis. Praesent interdum, magna ac sagittis convallis, risus ex condimentum ipsum, sed luctus nulla ipsum ac augue. Nullam egestas nulla eu eros sagittis feugiat. Nulla eget risus eu neque ullamcorper sollicitudin. Aenean sed turpis at libero pulvinar pulvinar eget eu mi. Ut vitae eleifend ligula, at convallis massa. Aliquam erat volutpat.
        </div>
        <div class="star-rating">
          Średnia ocena:
          <star-rating v-model="user.rating" :inline="true" :show-rating="false" read-only />
        </div>
        <div>
          <div class="active">Aktualne korepetycje:</div>
          <h2>Matematyka, 23.09.2018, 16:00-17:30</h2>
          <div class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eleifend tempus iaculis. Praesent interdum, magna ac sagittis convallis, risus ex condimentum ipsum, sed luctus nulla ipsum ac augue. Nullam egestas nulla eu eros sagittis feugiat. Nulla eget risus eu neque ullamcorper sollicitudin. Aenean sed turpis at libero pulvinar pulvinar eget eu mi. Ut vitae eleifend ligula, at convallis massa. Aliquam erat volutpat.</div>
        </div>
        <button-component pink class="button-enroll" @click="enroll">
          ZAPISZ SIĘ
        </button-component>
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
        rating: 3
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
    //text-align: center;
  }

  .page-container {
    position: relative;
    z-index: 5;
    max-width: 915px;
    margin: 0 auto;
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

  .pencil {
    position: absolute;
    top: 180px;
    z-index: 1;
    display: inline-block;
    color: #ddd8ff;

    &.left {
      top: 420px;
      left: -50px;
      width: 78px;
      height: 90px;
      transform: scaleX(-1);
    }

    &.right {
      right: -20px;
      width: 56px;
      height: 48px;
    }
  }

  .user-avatar {
    width: 93px;
    height: 93px;
    border-radius: 100%;
    position: absolute;
    display: inline;
    top: 100px;
    left: -40px;
  }

  .user-about {
    text-align: justify;
    display: inline-block;
  }

  .star-rating {
    font-weight: 500;
    color: var(--greyish-brown);
  }

  .description {
    text-align: justify;
    font-size: 14px;
    padding-bottom: 43px;
  }

  .user-details {
    padding-left: 20px;
    display: inline-block;
  }

  .active {
    font-size: 20px;
    font-weight: 500;
    color: var(--greyish-brown);
    padding-top: 43px;
  }

  @include mobile {
    .pencil {
      display: none;
    }

    .user-avatar {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  }

  .button {
    max-width: 280px;
    width: 100%;
    height: 40px;
    float: right;
  }
</style>
