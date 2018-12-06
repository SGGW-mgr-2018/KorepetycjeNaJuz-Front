<template>
  <div class="page--register">
    <grid-container>
      <h1 class="page--register__title">
        Stwórz swoje konto
      </h1>
      <p class="page--register__subtitle">
        Aby korzystać ze wszystkich funkcji systemu
      </p>
      <div class="wrapper">
        <form class="wrapper-left">
          <errors-component :errors="errors" :visible="!!errors.length" />
          <form-factory v-model="model" :schema="schema" />
          <button-component
            :loading="loading"
            pink
            class="button-register"
            @click="handleRegister"
          >
            Zarejestruj się
          </button-component>
        </form>
        <div class="wrapper-right">
          <p class="wrapper-right__title">
            Co zyskujesz rejestrując się w systemie?
          </p>
          <ul class="wrapper-list">
            <li class="wrapper-list__item">
              Możliwość zapisywania się na lekcje, a także dodawania
              swoich lekcji
            </li>
            <li class="wrapper-list__item">
              Ocena uczniów i korepetytorów
            </li>
            <li class="wrapper-list__item">
              Historia korepetycji i rozbudowany kalendarz wydarzeń
            </li>
            <li class="wrapper-list__item">
              Powiadomienia o zbliżających się lekcjach
            </li>
          </ul>
          <p class="wrapper-right__title">
            Nie chcesz uzupełniać formularza?
          </p>
          <p>Zaloguj się korzystając z Facebooka lub Google</p>
          <div class="social-icons">
            <a target="_blank" href="" class="icon">
              <img src="/svg/facebook.svg" alt="facebook" class="icon">
            </a>
            <a target="_blank" href="" class="icon">
              <img src="/svg/google-plus.svg" alt="google" class="icon">
            </a>
          </div>
        </div>
      </div>
    </grid-container>
    <transition name="fade">
      <success-box v-if="success" />
    </transition>
  </div>
</template>

<script>
import InputComponent from '@/components/Form/Input'
import TextAreaComponent from '@/components/Form/TextArea'
import CheckboxComponent from '@/components/Form/Checkbox'
import ButtonComponent from '@/components/Button'
import ErrorsComponent from '@/components/Form/Errors'
import {
  validateRequired,
  validateEmail,
  validatePassword,
  validatePhone,
  validateRequiredCheckbox
} from '@/assets/js/validators'
import SuccessBox from '@/components/Register/SuccessBox'
import ERRORS from '@/assets/js/errors'

export default {
  name: 'Rejestracja',
  components: {
    SuccessBox,
    ButtonComponent,
    ErrorsComponent
  },
  data () {
    return {
      model: {
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        telephone: '',
        description: '',
        privacyPolicesConfirmed: false
      },
      schema: {
        firstName: {
          component: InputComponent,
          validators: [
            validateRequired
          ],
          props: {
            placeholder: 'Imię',
            forceErrors: false
          }
        },
        lastName: {
          component: InputComponent,
          validators: [
            validateRequired
          ],
          props: {
            placeholder: 'Nazwisko',
            forceErrors: false
          }
        },
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
        },
        telephone: {
          component: InputComponent,
          validators: [
            validateRequired,
            validatePhone
          ],
          props: {
            type: 'phone',
            placeholder: 'Telefon',
            forceErrors: false
          }
        },
        description: {
          component: TextAreaComponent,
          props: {
            placeholder: 'O mnie'
          }
        },
        privacyPolicesConfirmed: {
          component: CheckboxComponent,
          validators: [
            validateRequiredCheckbox
          ],
          props: {
            label: 'Wyrażam zgodę na przetwarzanie moich danych osobowych w celach...'
          }
        }
      },
      errors: [],
      success: false,
      loading: false
    }
  },
  created () {
    this.$store.commit('SET_MENU_THEME', 'violet')
  },
  methods: {
    async handleRegister () {
      if (!this.model.$.isValid) {
        this.errors = ['Podano nieprawidłowe dane!']
        return
      }
      const payload = {
        firstName: this.model.firstName,
        lastName: this.model.lastName,
        password: this.model.password,
        email: this.model.email,
        telephone: this.model.telephone,
        description: this.model.description,
        privacyPolicesConfirmed: this.model.privacyPolicesConfirmed
      }
      this.loading = true
      const errors = await this.$store.dispatch('register', payload)
      this.loading = false
      this.errors = errors ? [ERRORS[Object.keys(errors)[0]]] : []
    }
  }
}
</script>

<style lang="scss" scoped>
  .page--register {
    padding: 100px 0 50px;

    @include mobile {
      padding: 80px 0 30px;
    }

    &__title {
      @include font-primary(36px);
      margin: 5px 0;
      font-weight: 400;
      text-align: center;
      color: $violet;

      @include mobile {
        @include font-primary(28px);
        font-weight: 400;
      }
    }

    &__subtitle {
      @include font-primary(18px);
      margin: 7px 0;
      font-weight: 400;
      text-align: center;
      color: $gray;
    }
  }

  .wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding-top: 35px;

    &-left {
      max-width: 280px;
      width: 100%;
      margin-right: 60px;

      @include mobile {
        margin-right: 0;
      }
    }

    &-right {
      max-width: 450px;
      width: 100%;
      margin-bottom: 40px;
      text-align: center;

      @include mobile {
        margin-top: 40px;
      }

      &__title {
        @include font-primary(18px);
        margin-top: 0;
        color: #000;
        font-weight: 400;
      }
    }
  }

  .wrapper-list {
    margin-bottom: 40px;
    margin-left: 25px;
    text-align: left;

    @include mobile {
      margin-left: 0;
    }

    &__item {
      margin: 10px 0;
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

  .button-register {
    width: 100%;
    padding: 15px 0;
  }
</style>
