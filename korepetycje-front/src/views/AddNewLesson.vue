<template>
  <div class="page-lesson">
    <GridContainer>
      <div class="page-lesson-wrapper">
        <h1>{{ title }}</h1>
        <h2>{{ subtitle }}</h2>
        <form>
          <errors-component :errors="errors" :visible="!!errors.length" />
          <form-factory v-model="model" :schema="schema" />
          <a href="">
            <img src="/svg/calendar-interface-symbol-tool.svg" class="calendar" alt="calendar">
          </a>
          <button class="plusButton">
            <img src="/svg/plus.svg" class="plus" alt="plus">
          </button>

          <ButtonComponent pink>
            {{ submitButtonText }}
          </ButtonComponent>
        </form>
        <img src="/svg/pen_purple.svg" class="pencil left" alt="some pencil">
        <img src="/svg/pen_purple.svg" class="pencil right" alt="some pencil">
      </div>
    </GridContainer>
  </div>
</template>

<script>
import ButtonComponent from '@/components/Button'
import GridContainer from '@/components/GridContainer'
import InputComponent from '@/components/Form/Input'
import TextAreaComponent from '@/components/Form/TextArea'
import CheckboxComponent from '@/components/Form/Checkbox'
import SelectComponent from '@/components/Form/Select'
import ErrorsComponent from '@/components/Form/Errors'
import {
  validateRequired,
  validateRequiredCheckbox
} from '@/assets/js/validators'
// import ERRORS from '@/assets/js/errors'

export default {
  name: 'AddNewLesson',
  components: {
    ButtonComponent,
    GridContainer,
    ErrorsComponent
  },
  data () {
    return {
      title: 'Dodaj nową lekcję',
      subtitle: 'Uzupełnij wymagane dane',
      submitButtonText: 'Dodaj nową lekcję',
      model: {
        subject: '',
        level: [],
        ratePerHour: '',
        date: '',
        startTime: '',
        time: '',
        description: ''
      },
      schema: {
        subject: {
          component: SelectComponent,
          validators: [
            validateRequired
          ],
          props: {
            placeholder: 'Wybierz przedmiot',
            forceErrors: false
          }
        },
        ratePerHour: {
          component: InputComponent,
          validators: [
            validateRequired
          ],
          props: {
            type: 'number',
            placeholder: 'Cena za godzinę',
            forceErrors: false
          }
        },
        date: {
          component: InputComponent,
          validators: [
            validateRequired
          ],
          props: {
            type: 'date',
            placeholder: 'Data',
            forceErrors: false
          }
        },
        description: {
          component: TextAreaComponent,
          props: {
            placeholder: 'Wpisz dane o lekcji'
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
    const test = this.$store.dispatch('getAll')
    console.log(test)
  }
}
</script>

<style lang="scss" scoped>
  h1 {
      font-size: 3em;
      margin: 0;
  }

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
  input[type=text] {
    width: 40%;
    height: 10%;
  }

  textarea {
    resize: none;
  }
  .calendar {
    width: 35px;
    height: 40px;
  }

  .page-lesson {
    padding: 100px 0;
  }

  .page-lesson-wrapper {
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

  .plus {
    width: 30px;
    height: 40px;
  }
  .plusButton {
    background: none;
    border: 0;
  }

  @include tablet() {
    .page-lesson-wrapper {
      width: 75%;
    }
    .pencil {
      display: none;
    }
  }

  @include mobile() {
    .page-lesson-wrapper {
      width: 100%;
    }
  }
</style>
