<template>
  <div class="new-message">
    <form class="wrapper">
      <errors-component :errors="errors" :visible="!!errors.length" />
      <form-factory v-model="model" :schema="schema" class="form" />
      <button-component
        :loading="loading"
        pink
        class="button-send-message"
      >
        Wyślij wiadomość
      </button-component>
    </form>
  </div>
</template>

<script>
import SelectComponent from '@/components/Form/Select'
import TextAreaComponent from '@/components/Form/TextArea'
import ErrorsComponent from '@/components/Form/Errors'
import ButtonComponent from '@/components/Button'
import { validateRequired, validateSelect } from '@/assets/js/validators'

export default {
  name: 'NewMessage',
  components: {
    ErrorsComponent,
    ButtonComponent
  },
  data () {
    return {
      model: {
        recipient: null,
        content: ''
      },
      schema: {
        recipient: {
          component: SelectComponent,
          validators: [
            validateSelect,
            validateRequired
          ],
          props: {
            placeholder: 'Wybierz odbiorcę',
            forceErrors: false,
            options: this.$store.state.subject.subjects
          }
        },
        description: {
          component: TextAreaComponent,
          validators: [
            validateRequired
          ],
          props: {
            placeholder: 'Wpisz tresć wiadomości...',
            forceErrors: false
          }
        }
      },
      errors: []
    }
  }
}
</script>

<style lang="scss" scoped>
  .new-message {
    max-width: 720px;
    width: 100%;

    .wrapper {
      max-width: 480px;
      margin: 15px auto;

      /deep/ .select {
        margin-bottom: 15px;
      }

      /deep/ .text-area-wrapper {
        max-width: 480px;
      }

      /deep/ .text-area {
        max-width: 480px;
        border-radius: 5px;
      }
    }
  }

  .button-send-message {
    margin: 30px auto 0;
    background-color: #6b53ff;
  }
</style>
