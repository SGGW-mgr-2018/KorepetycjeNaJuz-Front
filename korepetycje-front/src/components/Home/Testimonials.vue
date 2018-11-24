<template>
  <div class="testimonials">
    <h2 class="testimonials__title">
      {{ title }}
    </h2>
    <div class="separator" />
    <div class="testimonials__wrapper">
      <div class="testimonial">
        <img :src="rejUrl" :alt="rejTitle" class="testimonials__image">
        <p class="testimonial__title"> {{ rejTitle }} </p>
        <p class="testimonial__description"> {{ rejTxt }} </p>
      </div>
      <div class="testimonial">
        <img :src="firendsUrl" :alt="friendsTitle" class="testimonials__image">
        <p class="testimonial__title"> {{ friendsTitle }} </p>
        <p class="testimonial__description"> {{ friendsTxt }} </p>
      </div>
      <div class="testimonial">
        <img :src="destinationUrl" :alt="destinationTitle" class="testimonials__image">
        <p class="testimonial__title">{{ destinationTitle }}</p>
        <p class="testimonial__description">{{ destinationTxt }}</p>
      </div>
    </div>
    <button-component pink class="button-register">
      Zarejestruj się
    </button-component>
  </div>
</template>

<script>
import ButtonComponent from '@/components/Button'

export default {
  name: 'Testimonials',
  components: {
    ButtonComponent
  },
  data () {
    return {

      title: '3 proste kroki do nowej wiedzy',

      rejUrl: 'svg/registration.svg',
      rejTitle: 'Zarejestruj się',
      rejTxt: `Wystarczy 5 minut, aby korzystać z
 pełnej oferty serwisu. Formularz zawiera
 tylko podstawowe dane.`,

      firendsUrl: 'svg/find-my-friend.svg',
      friendsTitle: 'Wybierz co chcesz dziś robić',
      friendsTxt: `Masz chęć poszerzyć swoją wiedzę?
 A może się nią podzielić?
 Wystarczy, że wpiszesz swoją lokalizację.`,

      destinationUrl: 'svg/destination.svg',
      destinationTitle: 'Staw się w umówionym miejscu',
      destinationTxt: `Po wybraniu interesującego przedmiotu,
 oczekuj podanej w ogłoszeniu godziny.
 Zabierz ze sobą pozytywne nastawienie!`
    }
  }
}

</script>

<style lang="scss" scoped>
  .testimonials {
    text-align: center;
    color: #3d3d3d;

    &__title {
      font-size: 36px;
      font-weight: 400;
      color: $gray-darker;

      @include mobile {
        font-size: 28px;
      }
    }

    &__image {
      width: 140px;
      height: 140px;
      display: block;
      margin: 0 auto;

      @include tablet {
        width: 110px;
        height: 110px;
      }

      @include mobile {
        width: 80px;
        height: 80px;
      }
    }

    &__wrapper {
      max-width: 1010px;
      width: 100%;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  .testimonials__wrapper {
    @include tablet {
        flex-flow: column;
        align-items: center;
      }
  }

  .testimonial {
    width: 260px;
    margin: 20px 35px;

    @include tablet {
      margin: 10px 30px;
    }

    &__title {
      font-size: 18px;
    }

    &__description {
      font-family: Roboto;
      font-size: 16px;
      font-weight: 400;
    }
  }

  .separator {
    width: 200px;
    height: 2px;
    margin: 10px auto 30px;
    background-color: #3d3d3d;
  }

  p {
    font-size: 16.5px;
    font-weight: 500;
  }

  .button-register {
    padding: 10px 75px;
    margin: 20px auto;
  }
</style>
