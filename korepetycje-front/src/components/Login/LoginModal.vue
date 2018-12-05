<template>
  <div class="login-modal">
    <div class="login-modal__wrapper">
      <form>
        <errors-component :errors="errors" :visible="!!errors.length" />
        <form-factory v-model="model" :schema="schema" />
      </form>
      <router-link to="/" class="login-modal__link">
        Zapomniałeś hasła?
      </router-link>
      <button-component class="login-modal__button" pink @click="login">
        Zaloguj się
      </button-component>
      <div class="social-buttons">
        <img src="/svg/facebook_icon.svg" alt="Facebook" class="social-buttons__button">
        <img src="/svg/google_plus_icon.svg" alt="Google+" class="social-buttons__button">
      </div>
    </div>
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
  name: 'LoginModal',
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
  .login-modal {
    width: 200px;
    padding-top: 10px;

    &__wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 15px 8px;
      background-color: #fff;
      border-radius: 5px;
    }

    &__input {
      max-width: 400px;
      width: 100%;
      padding: 7px;
      border: 1px solid #bfbfbf;
      font-size: 14px;
      margin-bottom: 8px;
    }

    &__link {
      text-decoration: none;
      color: #6c6c6c;
      font-size: 12px;
      font-weight: normal;
      text-align: center;
    }

    &__button {
      font-size: 14px;
      padding: 8px 30px;
      margin: 9px auto;
    }

    .social-buttons {
      display: flex;
      justify-content: space-around;
      margin: 0 50px;

      &__button {
        width: 30px;
        height: 30px;
        cursor: pointer;

        &:hover {
          opacity: .8;
        }
      }
    }
  }

  /deep/ .errors {
    margin: 5px 0;
    padding: 4px 10px;
  }
</style>
