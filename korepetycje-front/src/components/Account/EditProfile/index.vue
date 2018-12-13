<template>
  <div class="page--editprofile">
    <grid-container>
      <h1 class="page--editprofile__title">
        Edytuj swój profil
      </h1>
      <div class="page--editprofile__formcontainer">
        <form class="wrapper">
          <errors-component :errors="errors" :visible="!!errors.length" />
          <form-factory v-model="model" :schema="schema" />
          <button-component
            :loading="loading"
            pink
            class="button-editprofile"
            @click="setUserData"
          >
            Edytuj dane
          </button-component>
        </form>
      </div>
    </grid-container>
  </div>
</template>

<script>
import InputComponent from '@/components/Form/Input'
import TextAreaComponent from '@/components/Form/TextArea'
import ButtonComponent from '@/components/Button'
import ErrorsComponent from '@/components/Form/Errors'
import {
  validateRequired,
  validateEmail,
  validatePhone
} from '@/assets/js/validators'
import ERRORS from '@/assets/js/errors'

export default {
  name: 'EditProfile',
  components: {
    ButtonComponent,
    ErrorsComponent
  },
  data () {
    return {
      model: {
        firstName: '',
        lastName: '',
        email: '',
        telephone: '',
        description: ''
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
        }
      },
      errors: [],
      success: false,
      loading: false
    }
  },
  created () {
    this.getUserData()
    this.$store.commit('SET_MENU_THEME', 'violet')
  },
  methods: {
    async getUserData () {
      this.loading = true
      const response = await this.$store.dispatch('getUserData')
      this.model = {
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        telephone: response.data.telephone,
        description: response.data.description
      }
      this.loading = false
    },
    async setUserData () {
      if (!this.model.$.isValid) {
        this.errors = ['Podano nieprawidłowe dane!']
        return
      }
      const payload = {
        firstName: this.model.firstName,
        lastName: this.model.lastName,
        email: this.model.email,
        telephone: this.model.telephone,
        description: this.model.description
      }
      this.loading = true
      const errors = await this.$store.dispatch('setUserData', payload)
      this.loading = false
      this.errors = errors ? [ERRORS[Object.keys(errors)[0]]] : []
    }
  }
}
</script>

<style lang="scss" scoped>
  .page--editprofile {
    padding: 0 0 50px;

    @include mobile {
      padding: 0 0 30px;
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

    &__formcontainer {
      display: flex;
      justify-content: center;
      text-align: center;
    }
  }

  .wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding-top: 35px;
    max-width: 560px;
    width: 100%;

      @include mobile {
        margin-right: 0;
      }
  }

  .input-wrapper {
    max-width: 600px;
  }

  .button-editprofile {
    width: 100%;
    margin: 10px 0;
    padding: 15px 0;
  }
</style>
