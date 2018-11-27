<template>
  <div class="page--login">
    <grid-container>
      <div class="page-background"/>
      <img src="/svg/pen_purple.svg" class="pencil left" alt="some pencil">
      <img src="/svg/pen_purple.svg" class="pencil right" alt="some pencil">
      <h1> {{ title }} </h1>
      <h2> {{ info }} </h2>
      <div class="login-form">
        <input v-model="input.username" type="text" name="username"
               placeholder="LOGIN"
               class="login-input">
        <input v-model="input.password" type="password" name="password"
               placeholder="HASŁO" class="login-input">
        <router-link to="" class="forgotten-pass">Zapomniałeś hasła?
        </router-link>
        <br>
        <button-component pink style="width: 100%" @click="login">
          ZALOGUJ SIĘ
        </button-component>
      </div>
      <h2 class="bottom"> {{ alternative }} </h2>
      <a target="_blank" href="" class="icon">
        <img src="/svg/facebook.svg" alt="facebook" class="icon">
      </a>
      <a target="_blank" href="" class="icon">
        <img src="/svg/google-plus.svg" alt="google" class="icon">
      </a>
      <h3> {{ no_account }} </h3>
      <button-component grey style="width: 273px">ZAREJESTRUJ SIĘ
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
      title: 'Zaloguj się do systemu',
      info: 'Wpisz swoje dane',
      alternative: 'lub zaloguj się za pomocą',
      no_account: 'Nie masz konta?',
      input: {
        username: '',
        password: ''
      }
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
  * {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
  }

  .page--login {
    text-align: center;
  }

  h1, h2, h3, .login-input::placeholder, .login-input, .forgotten-pass {
    font-family: Roboto;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-decoration: none;
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

  .page-background {
    background-color: $gray-lighter;
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: -1;
  }

  .icon {
    width: 50px;
    height: 50px;
    margin: 5px;
    display: inline-block;
  }
</style>
