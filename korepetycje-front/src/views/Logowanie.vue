<template>
  <div class="page--login">
    <grid-container>
      <img src="/svg/pen_purple.svg" class="pencil left" alt="Pencil">
      <img src="/svg/pen_purple.svg" class="pencil right" alt="Pencil">
      <h1>Zaloguj się do systemu</h1>
      <h2>Wpisz swoje dane</h2>
      <div class="login-form">
        <input placeholder="LOGIN" class="login-input">
        <input placeholder="HASŁO" class="login-input">
        <router-link to="" class="forgotten-pass">
          Zapomniałeś hasła?
        </router-link>
        <br>
        <button-component pink @click="login">
          ZALOGUJ SIĘ
        </button-component>
      </div>
      <h2 class="bottom">lub zaloguj się za pomocą</h2>
      <a target="_blank" href="" class="icon">
        <img src="/svg/facebook.svg" alt="facebook" class="icon">
      </a>
      <a target="_blank" href="" class="icon">
        <img src="/svg/google-plus.svg" alt="google" class="icon">
      </a>
      <h3>Nie masz konta?</h3>
      <button-component grey>
        ZAREJESTRUJ SIĘ
      </button-component>
    </grid-container>
  </div>
</template>

<script>
import ButtonComponent from '@/components/Button'

export default {
  name: 'Logowanie',
  components: {
    ButtonComponent
  },
  data () {
    return {
    }
  },
  created () {
    this.$store.commit('SET_MENU_THEME', 'violet')
  },
  methods: {
    login () {
      this.$router.push({ name: 'moje-konto' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .page--login {
    position: relative;
    background-color: $gray-lighter;
    text-align: center;
  }

  h1, h2, h3, .login-input::placeholder, .login-input, .forgotten-pass {
    @include font-primary;
  }

  .forgotten-pass {
    text-align: right;
    font-size: 13px;
    color: #6c6c6c;
    padding: 7px 0 19.5px 0;
    display: inline-block;
  }

  h1 {
    font-size: 36px;
    color: #715aff;
    margin-bottom: 13px;
  }

  h2 {
    font-size: 18px;
    color: var(--greyish-brown);
    padding: 2px;

    &.bottom {
      padding: 36px 0 18px 0;
    }
  }

  h3 {
    font-size: 24px;
    color: #715aff;
    padding: 26px 0 20.5px 0;
    font-weight: normal;
  }

  .login-input {
    font-size: 13px;
    width: 273px;
    height: 38px;
    border: solid 1px #bfbfbf;
    padding-left: 10px;
    margin: 7.5px 0 7.5px 0;

    &::placeholder {
      color: #bdbdbd;
    }
  }

  .login-form, .login-box {
    width: 273px;
    margin-left: auto;
    margin-right: auto;
    text-align: right;
  }

  .login-box {
    width: 360px;
    text-align: center;
    display: inline-block;
    padding-top: 160.5px;
    padding-bottom: 20px;
  }

  .pencil {
    display: inline-block;
    color: #ddd8ff;
    margin: 47.5px;

    &.left {
      width: 78px;
      height: 90.5px;
      transform: scaleX(-1);
    }

    &.right {
      width: 56px;
      height: 49.5px;
      vertical-align: top;
      margin-top: 261px;
    }
  }

  @media (max-width: 700px) {
    .pencil {
      display: none;
    }
  }

  .icon {
    width: 50px;
    height: 50px;
    margin: 5px;
    display: inline-block;
  }
</style>
