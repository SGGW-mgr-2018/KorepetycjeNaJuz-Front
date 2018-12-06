<template>
  <div class="page--register">
    <grid-container>
      <h1 class="page--register__title">
        Stwórz swoje konto
      </h1>
      <p class="page--register__title">
        Aby korzystać ze wszystkich funkcji systemu
      </p>
      <div class="wrapper">
        <form class="wrapper__left">
          <errors-component :errors="errors" :visible="!!errors.length" />
          <form-factory v-model="model" :schema="schema" />
          <button-component
            :loading="loading"
            pink
            class="button-register"
            @click="handleClick"
          >
            ZALOGUJ SIĘ
          </button-component>
        </form>
        <div class="wrapper__right">
          To jest prawy akapit
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
            placeholder: 'O mnie',
            forceErrors: false
          }
        },
        privacyPolicesConfirmed: {
          component: CheckboxComponent,
          validators: [
            validateRequiredCheckbox
          ],
          props: {
            label: 'Zaakceptuj zgodę',
            forceErrors: false
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
    async handleClick () {
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
      this.errors = errors ? ['Błąd logowania! Sprawdź wpisane dane'] : []
    }
  }
}
</script>

<style lang="scss" scoped>
  .page--register {
    padding: 100px 0 50px;

    @include mobile {
      padding: 50px 0 30px;
    }
  }
</style>
