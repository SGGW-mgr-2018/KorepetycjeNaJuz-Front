<template>
  <div class="page--login">
    <grid-container class="page-container">
      <img src="/svg/pen_purple.svg" class="pencil left" alt="Pencil">
      <img src="/svg/pen_purple.svg" class="pencil right" alt="Pencil">
      <h1>Zaloguj się do systemu</h1>
      <h2>Wpisz swoje dane</h2>
      <div class="login-form">
        <form>
          <errors-component :errors="errors" :visible="!!errors.length" />
          <form-factory v-model="model" :schema="schema" />
        </form>
        <router-link to="" class="forgotten-pass">
          Zapomniałeś hasła?
        </router-link>
        <br>
        <button-component pink class="button-login" @click="login">
          ZALOGUJ SIĘ
        </button-component>
      </div>
      <h2 class="bottom">lub zaloguj się za pomocą</h2>
      <div class="social-icons">
        <a target="_blank" href="" class="icon">
          <img src="/svg/facebook.svg" alt="facebook" class="icon">
        </a>
        <a target="_blank" href="" class="icon">
          <img src="/svg/google-plus.svg" alt="google" class="icon">
        </a>
      </div>
      <h3>Nie masz konta?</h3>
      <button-component grey class="button-register">
        ZAREJESTRUJ SIĘ
      </button-component>
    </grid-container>
  </div>
</template>

<script>
import ButtonComponent from '@/components/Button'
import InputComponent from '@/components/Form/Input'
import ErrorsComponent from '@/components/Form/Errors'
import {
  validateRequired,
  validateEmail,
  validatePassword
} from '@/assets/js/validators'

export default {
  name: 'Logowanie',
  components: {
    ButtonComponent,
    ErrorsComponent
  },
  data () {
    return {
      model: {
        email: '',
        password: ''
      },
      schema: {
        email: {
          component: InputComponent,
          validators: [
            validateRequired, validateEmail
          ],
          props: {
            type: 'email',
            placeholder: 'Adres email',
            forceErrors: false
          }
        },
        password: {
          component: InputComponent,
          validators: [
            validateRequired, validatePassword
          ],
          props: {
            type: 'password',
            placeholder: 'Hasło',
            forceErrors: false
          }
        }
      },
      errors: []
    }
  },
  created () {
    this.$store.commit('SET_MENU_THEME', 'violet')
  },
  methods: {
    async login () {
      if (!this.model.$.isValid) {
        this.errors = ['Podano nieprawidłowe dane!']
        return
      }
      const payload = {
        'username': this.model.email,
        'password': this.model.password
      }
      const errors = await this.$store.dispatch('login', payload)
      this.errors = errors ? ['Błąd logowania! Sprawdź wpisane dane'] : []
    }
  }
}
</script>

<style lang="scss" scoped>
  .page--login {
    padding: 100px 0;
    text-align: center;
  }

  .page-container {
    position: relative;
    z-index: 5;
    max-width: 480px;
    margin: 0 auto;
  }

  h1, h2, h3, .login-input::placeholder, .login-input, .forgotten-pass {
    @include font-primary;
  }

  .forgotten-pass {
    text-align: right;
    font-size: 14px;
    color: #6c6c6c;
    padding: 7px 0 19px 0;
    display: inline-block;
  }

  h1 {
    font-size: 36px;
    color: #715aff;
    margin-bottom: 13px;
  }

  h2 {
    font-size: 18px;
    padding: 2px;

    &.bottom {
      padding: 36px 0 18px 0;

      @include mobile {
        padding: 20px 0 10px;
      }
    }
  }

  h3 {
    font-size: 24px;
    color: #715aff;
    padding: 26px 0 20px 0;
    font-weight: normal;

    @include mobile {
      padding: 10px 0;
    }
  }

  .login-input {
    font-size: 13px;
    max-width: 280px;
    width: 100%;
    height: 38px;
    border: solid 1px #bfbfbf;
    padding-left: 10px;
    margin: 7px 0 7px 0;

    &::placeholder {
      color: #bdbdbd;
    }
  }

  .login-form, .login-box {
    max-width: 280px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    text-align: right;
  }

  .login-box {
    width: 360px;
    text-align: center;
    display: inline-block;
    padding-top: 160px;
    padding-bottom: 20px;
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

  @include mobile {
    .pencil {
      display: none;
    }
  }

  .social-icons {
    display: flex;
    justify-content: center;
  }

  .icon {
    width: 50px;
    height: 50px;
    display: inline-block;

    & + .icon {
      margin-left: 20px;
    }
  }

  .button {
    max-width: 280px;
    width: 100%;
    height: 40px;
  }
</style>
