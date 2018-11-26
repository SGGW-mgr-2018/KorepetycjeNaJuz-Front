<template>
  <div class="success-box">
    <div class="success-box-wrapper">
      <h1>{{ title }}</h1>
      <div class="success-box-text">{{ successText }}</div>
      <button-component pink>{{ returnButtonText }}</button-component>
      <img src="/svg/pen_purple.svg" class="pencil left" alt="some pencil">
      <img src="/svg/pen_purple.svg" class="pencil right" alt="some pencil">
    </div>
  </div>
</template>

<script>
import ButtonComponent from '@/components/Button'

export default {
  name: 'SuccessBox',
  components: {
    ButtonComponent
  },
  data () {
    return {
      title: 'Gratulacje!',
      successText: 'Na podany w formularzu adres e-mail wysłaliśmy potwierdzenie rejestracji. Znajdziesz tam wszystkie potrzebne informacje oraz link aktywujący. Po jego kliknięciu będziesz mógł korzystać z pełnej oferty systemu.',
      returnButtonText: 'POWRÓT DO STRONY GŁÓWNEJ'
    }
  }
}
</script>

<style lang="scss" scoped>
    h1, h2, h3 {
        font-family: Roboto;
        font-weight: 300;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        text-decoration: none;
        color: $violet;
    }
    h1 {
        font-size: 3em;
        margin: 0;
    }
    .success-box-wrapper {
      text-align: center;
      margin: 3em auto;
      width: 45%;
      min-height: 70vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
    }
    .success-box-text {
      margin: 1em 0;
      font-size: 1.3em;
    }
    .pencil {
      position: absolute;

      &.left {
          width: 156px;
          height: 181px;
          left: -12%;
          top: 36%;
          transform: scaleX(-1);
        }

        &.right {
          width: 112px;
          height: 99px;
          right: -10%;
          top: 46%;
        }
    }

    @include tablet() {
      .success-box-wrapper {
        width: 75%;
      }
      .pencil {
        display: none;
      }
    }

    @include mobile() {
      .success-box-wrapper {
        width: 100%;
      }
    }
</style>
