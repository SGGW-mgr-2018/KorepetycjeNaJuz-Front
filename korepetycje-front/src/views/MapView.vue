<template>
  <div id="map-div">

    <div id="div-search-panel">
      <select v-model="subject" class="select-subject" @change="searchLessons()">
        <option selected value="0">Wybierz przedmiot</option>
        <option v-for="item in subjects" :key="item.id" :value="item.id">{{ item.name }}</option>
      </select>
      <select v-model="levelId" class="select-level" @change="getLessonsByLevel">
        <option value="0">Wybierz poziom</option>
        <option value="1">Szkoła podstawowa</option>
        <option value="2">Liceum podstawa</option>
        <option value="3">Liceum rozszerzenie</option>
        <option value="4">Studia</option>
      </select>
      <date-picker v-model="date" input-class="mx-input" range :lang="lang" @change="getLessonsByDate" />
      <!-- <img id="calendarImg" src="http://wsgastro.pl/wp-content/uploads/2013/10/icon-calendar.png"> -->
    </div>

    <map-container search-mode />
  </div>
</template>

<script>
import MapContainer from '@/components/MapComponent'
// import debounce from 'lodash.debounce'
import DatePicker from 'vue2-datepicker'

export default {
  name: 'Map',
  components: {
    MapContainer,
    DatePicker
  },
  data () {
    return {
      subject: '',
      subjects: [],
      date: '',
      levelId: 0,
      lang: {
        days: ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'],
        months: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'],
        pickers: [' > 7 dni', ' > 30 dni', ' < 7 dni', ' < 30 dni'],
        placeholder: {
          date: 'Wybierz datę',
          dateRange: 'Wybierz przedzial dat'
        }
      },
      query: {}
    }
  },
  created () {
    this.$store.commit('SET_MENU_THEME', 'violet')
    this.addSubjects()
    const nowDate = new Date()
    let nextDay = new Date()
    nextDay = nextDay.setDate(nextDay.getDate() + 1)
    this.date = [nowDate, nextDay]
    this.getLessonsByDate()
  },
  methods: {
    getDate () {
      const date = this.date
      const from = (new Date(date[0]).getFullYear()) + '-' + (new Date(date[0]).getMonth() + 1) + '-' + ((new Date(date[0]).getDate() < 10) ? '0' + new Date(date[0]).getDate() : new Date(date[0]).getDate())
      const to = (new Date(date[1]).getFullYear()) + '-' + (new Date(date[1]).getMonth() + 1) + '-' + ((new Date(date[1]).getDate() < 10) ? '0' + new Date(date[1]).getDate() : new Date(date[1]).getDate())
      return [from, to]
    },
    async addSubjects () {
      this.subjects = await this.$store.dispatch('subjects', '')
    },
    async searchLessons () {
      delete this.query.subjectId
      const idSub = this.subject
      if (idSub !== 0 && idSub !== '0') {
        this.query.subjectId = idSub
        this.setQuery()
      } else {
        delete this.query.subjectId
        this.setQuery()
      }
    },
    getLessonsByDate () {
      const date = this.getDate()
      this.query.dateFrom = date[0]
      this.query.dateTo = date[1]
      this.setQuery()
    },
    getLessonsByLevel () {
      this.query.levelId = this.levelId
      this.setQuery()
    },
    async setQuery () {
      const payload = {
        params: this.query
      }
      if (this.subject === '') {
        delete payload.params.subjectId
      }

      if (this.levelId === '0') {
        delete payload.params.levelId
      }
      console.log(JSON.stringify(payload.params))
      const lessons = await this.$store.dispatch('lessonsFilter', payload)
      return lessons
    }
  }
}
</script>
<style lang="scss" scoped>
  #map-div {
    position: relative;
    padding: 140px 0;

    @include mobile {
      padding: 70px 0;
    }
  }
  .rounded {
    background: url("/img/magnifier.png") no-repeat scroll ;
    background-size: 25px 25px;
    background-position-x: 3%;
    background-position-y: 40%;
    padding-left: 4%;
    width: 27%;
    height: 31px;
    border-radius: 25px;
    box-shadow: 0px 3px 7px 0 rgba(158, 158, 158, 0.49);
    background-color: white;
    border-style: none;
    color: #c0c0c0;
    margin-right: 2%;
    @include mobile {
      display: block;
      width: 97%;
      padding-left: 10%;
      margin-bottom: 4%;
    }
  }

  .select-level, .select-subject {
    width: 32%;
    height: 31px;
    box-shadow: 0px 3px 7px 0 rgba(158, 158, 158, 0.49);
    background-color: white;
    border-style: none;
    color: #c0c0c0;
    margin-right: 2%;
    @include mobile {
      display: block;
      width: 97%;
       margin-bottom: 2%;
    }
  }

  #div-search-panel {
    margin: 0 auto;
    width: 70%;
    padding-bottom: 0%;
    display: flex;
    align-items: center;
    @include mobile {
      width: 80%;
      display: block;
    }
  }

  ::placeholder{
    color: #c0c0c0;
    opacity: 1;
  }

  :-ms-input-placeholder{
    color: #c0c0c0;
  }

  ::-ms-input-placeholder{
    color: #c0c0c0;
  }

  .div_radios{
    display: inline-block;
    margin-right: 2%;
    width: 15%;
    @include mobile {
      display: block;
      width: 100%;
      margin: auto;
      margin-bottom: 2%;
    }
  }

  label{
    font-family: Roboto;
    font-size: 12px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #838383;
  }

  .div_radios span{
    display: block;
    @include mobile {
      display: inline-block;
    }
  }

  .div_radios span input{
    padding: 0px;
  }

  // #calendarImg{
  //   width: 4%;
  //   height: 35px;
  // }
</style>
