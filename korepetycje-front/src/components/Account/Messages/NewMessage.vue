<template>
  <div class="new-message">
    <form class="wrapper">
      <transition name="fade">
        <div v-if="messageSent" class="success-message">
          Wiadomość została wysłana
        </div>
      </transition>
      <errors-component :errors="errors" :visible="!!errors.length" />
      <p class="address-label">Do</p>
      <multiselect
        v-model="recipient"
        :options="getAddresses"
        :allow-empty="false"
        track-by="id"
        :custom-label="fullName"
        placeholder="Wybierz adresata"
        class="select"
        @input="handleInput"
      >
        <span slot="noOptions">Brak rekordów</span>
      </multiselect>
      <p class="text-label">Treść wiadomości</p>
      <form-factory v-model="model" :schema="schema" class="form" />
      <button-component
        :loading="loading"
        pink
        class="button-send-message"
        @click="handleClick"
      >
        Wyślij wiadomość
      </button-component>
    </form>
  </div>
</template>

<script>
import TextAreaComponent from '@/components/Form/TextArea'
import ErrorsComponent from '@/components/Form/Errors'
import ButtonComponent from '@/components/Button'
import { validateRequired } from '@/assets/js/validators'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'NewMessage',
  components: {
    ErrorsComponent,
    ButtonComponent
  },
  data () {
    return {
      messageSent: false,
      loading: false,
      recipient: null,
      model: {
        content: ''
      },
      schema: {
        content: {
          component: TextAreaComponent,
          validators: [
            validateRequired
          ],
          props: {
            placeholder: 'Wpisz treść wiadomości...',
            forceErrors: false
          }
        }
      },
      errors: []
    }
  },
  computed: {
    ...mapGetters(['getAddresses'])
  },
  methods: {
    ...mapActions(['sendEmail']),
    handleInput (value) {
      this.recipient = value
    },
    async handleClick () {
      if (!this.recipient || !this.model.content) {
        this.errors = ['Uzupełnij poprawnie pola!']
        return
      }
      this.errors = []
      const payload = {
        id: this.recipient.id,
        content: this.model.content
      }
      this.loading = true
      await this.sendEmail(payload)
      this.loading = false
      this.messageSent = true
      setTimeout(() => {
        this.messageSent = false
      }, 2200)
    },
    fullName ({ firstName, lastName }) {
      return `${ firstName } ${ lastName }`
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>
  .new-message {
    max-width: 720px;
    width: 100%;

    .wrapper {
      max-width: 480px;
      margin: 15px auto;

      /deep/ .select {
        @include font-primary(14px);
        margin-bottom: 15px;
        font-weight: 400;
        color: $gray;
      }

      /deep/ .text-area-wrapper {
        max-width: 480px;
      }

      /deep/ .text-area {
        max-width: 480px;
        border-radius: 5px;
      }
    }

    .address-label,
    .text-label {
      display: inline-block;
      padding: 2px 10px;
      border-radius: 5px;
      background-color: #84ef7e;
      color: #fff;
      font-size: 13px;
      font-weight: 700;
    }

    .text-label {
      background-color: #6b53ff;
    }
  }

  .button-send-message {
    margin: 30px auto 0;
    background-color: #9b14ff;
  }

  .success-message {
    padding: 8px;
    background: #a2f9a2;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
  }
</style>
