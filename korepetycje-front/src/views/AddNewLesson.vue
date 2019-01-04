<template>
  <div class="page-lesson">
    <GridContainer>
      <div class="page-lesson-wrapper">
        <h1>{{ title }}</h1>
        <h2>{{ subtitle }}</h2>
        <form>
          <errors-component :errors="errors" :visible="!!errors.length" />
          <successes-component :successes="success" :visible="!!success.length" />
          <form-factory v-model="model" :schema="schema" class="page-lesson__form" />

          <ButtonComponent pink @click="getLocation">
            {{ showMapPreviewText }}
          </ButtonComponent>
          <map-container ref="miniMap" add-mode />

          <ButtonComponent
            pink
            :loading="loading"
            @click="createLesson"
          >
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
import CheckboxListComponent from '@/components/Form/CheckboxList'
import SelectComponent from '@/components/Form/Select'
import DatePickComponent from '@/components/Form/DatePick'
import ErrorsComponent from '@/components/Form/Errors'
import SuccessesComponent from '@/components/Form/Success'
import MapContainer from '@/components/MapComponent'
import {
  validateRequired,
  validateSelect,
  validateCheckboxList,
  validateDatePicker
} from '@/assets/js/validators'

export default {
  name: 'AddNewLesson',
  components: {
    MapContainer,
    ButtonComponent,
    GridContainer,
    ErrorsComponent,
    SuccessesComponent
  },
  data () {
    return {
      title: 'Dodaj nową lekcję',
      subtitle: 'Uzupełnij wymagane dane',
      submitButtonText: 'Dodaj nową lekcję',
      showMapPreviewText: 'Pokaż lokalizację',
      model: {
        lessonSubject: '',
        lessonLevels: [],
        ratePerHour: '',
        dateStart: '',
        dateEnd: '',
        time: '',
        locationQuery: '',
        address: {
          latitude: 0,
          longitude: 0,
          city: '',
          street: ''
        }
      },
      schema: {
        lessonSubject: {
          component: SelectComponent,
          validators: [
            validateSelect
          ],
          props: {
            placeholder: 'Wybierz przedmiot',
            forceErrors: false,
            options: this.$store.state.subject.subjects
          }
        },
        lessonLevels: {
          component: CheckboxListComponent,
          validators: [
            validateCheckboxList
          ],
          props: {
            checkboxList: [
              {
                'id': 1,
                'name': 'Szkoła podstawowa'
              },
              {
                'id': 2,
                'name': 'Liceum podstawa'
              },
              {
                'id': 3,
                'name': 'Liceum rozszerzenie'
              },
              {
                'id': 4,
                'name': 'Studia'
              }
            ],
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
        dateStart: {
          component: DatePickComponent,
          validators: [
            validateDatePicker
          ],
          props: {
            type: 'datetime',
            placeholder: 'Data rozpoczęcia lekcji',
            format: 'DD-MM-YYYY [o] HH:mm',
            timePickerOptions: { start: '00:00', step: '00:30', end: '23:30' },
            forceErrors: false
          }
        },
        dateEnd: {
          component: DatePickComponent,
          props: {
            type: 'datetime',
            placeholder: 'Data zakończenia lekcji',
            format: 'DD-MM-YYYY [o] HH:mm',
            timePickerOptions: { start: '00:00', step: '00:30', end: '23:30' },
            forceErrors: false
          }
        },
        time: {
          component: InputComponent,
          validators: [
            validateRequired
          ],
          props: {
            type: 'number',
            placeholder: 'Czas trwania 1 lekcji',
            forceErrors: false
          }
        },
        locationQuery: {
          component: InputComponent,
          validators: [
            validateRequired
          ],
          props: {
            type: 'text',
            placeholder: 'Adres',
            forceErrors: false
          }
        }
      },
      errors: [],
      success: [],
      loading: false
    }
  },
  created () {
    this.$store.commit('SET_MENU_THEME', 'violet')
    if (this.$store.state.subject.subjects.length < 1) {
      this.getSubjects()
    }
  },
  methods: {
    async getSubjects () {
      const subjects = await this.$store.dispatch('getAllSubjects')
      return subjects
    },
    async createLesson () {
      if (!this.model.$.isValid) {
        this.errors = ['Sprawdź, czy na pewno poprawnie wypełniono wszystkie pola']
        return
      }
      await this.getLocation()

      const payload = {
        coachId: this.$store.state.auth.user.id,
        lessonLevels: this.model.lessonLevels,
        lessonSubjectId: this.model.lessonSubject.id,
        ratePerHour: this.model.ratePerHour,
        dateStart: this.model.dateStart.toISOString(),
        dateEnd: this.model.dateEnd.toISOString(),
        time: this.model.time,
        address: {
          latitude: this.model.address.latitude,
          longitude: this.model.address.longitude,
          city: this.model.address.city,
          street: this.model.address.street
        }
      }

      this.loading = true
      const errors = await this.$store.dispatch('createLesson', payload)
      this.loading = false
      if (errors.status === 201) {
        this.success = ['Pomyślnie dodano lekcję!']
      } else {
        this.errors = errors ? ['Coś poszło nie tak, spróbuj ponownie później!'] : []
      }
    },
    async getLocation () {
      const location = await this.$store.dispatch('getLocation', this.model.locationQuery)
      this.model.address.latitude = location.latitude
      this.model.address.longitude = location.longitude
      this.model.address.city = location.city
      this.model.address.street = location.street

      this.$refs.miniMap.setLocation(location.latitude, location.longitude)
    }
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

  form {
    width: 100%;
    justify-content: center;
    flex-direction: column;
    display: flex;
    align-items: center;
  }

  .map-container {
    z-index: 1;
    margin-top: 2em;

    @include mobile {
      width: 100%;
    }
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

  .page-lesson__form {
    min-width: 300px;
  }

  .button {
    margin: 0 auto;
    margin-top: 1em;
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
