<template>
  <div id="map-div">

    <div id="div-search-panel">
      <input
        v-model="subject"
        class="rounded"
        placeholder="Wpisz przedmiot"
        @input="setInput"
      >
      <select class="select-level">
        <option>Wybierz poziom</option>
      </select>
      <select class="select-subject">
        <option>Wybierz przedmiot</option>
        <option v-for="item in subjects" :key="item.id" :value="item.id">{{ item.name }}</option>
      </select>
      <div class="div_radios">
        <span>
          <input id="now" type="radio" name="choose" value="0"><label for="now">Ucz się teraz </label>
        </span>
        <span>
          <input id="chooseDate" type="radio" name="choose" value="1"><label for="chooseDate">Chcę wybrać datę</label>
        </span>
      </div>
      <date-picker v-model="date" input-class="mx-input" range :lang="lang" @change="getMarkers" />
      <!-- <img id="calendarImg" src="http://wsgastro.pl/wp-content/uploads/2013/10/icon-calendar.png"> -->
    </div>

    <map-container />
  </div>
</template>

<script>
import MapContainer from '@/components/MapComponent'
import debounce from 'lodash.debounce'
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
      lang: {
        days: ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'],
        months: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'],
        pickers: [' > 7 dni', ' > 30 dni', ' < 7 dni', ' < 30 dni'],
        placeholder: {
          date: 'Wybierz datę',
          dateRange: 'Wybierz przedzial dat'
        }
      }
    }
  },
  created () {
    this.subject = this.$route.params.searchInput
    this.$store.commit('SET_MENU_THEME', 'violet')
    // this.addSubjects()
    // this.searchSubjects()
    // this.searchLessons()
  },
  methods: {
    setInput () {
      this.search(this.subject, this)
    },
    getDate () {
      const date = this.date
      const from = (new Date(date[0]).getFullYear()) + '-' + (new Date(date[0]).getMonth() + 1) + '-' + ((new Date(date[0]).getDate() < 10) ? '0' + new Date(date[0]).getDate() : new Date(date[0]).getDate())
      const to = (new Date(date[1]).getFullYear()) + '-' + (new Date(date[1]).getMonth() + 1) + '-' + ((new Date(date[1]).getDate() < 10) ? '0' + new Date(date[1]).getDate() : new Date(date[1]).getDate())
      return [from, to]
    },
    getMarkers () {
      // alert(this.getDate())
    },
    search: debounce((query, self) => {
      // self.searchLessons(query)
      // self.$store.commit('SET_SEARCH_QUERY', query)
    }, 500),
    async addSubjects () {
      const subjects = await this.$store.dispatch('subjects', '')
      // console.log(subjects)
      this.subjects = subjects
    },
    async searchSubjects () {
      const payload = {
        'name': 'Matematyka'
      }
      const subjects = await this.$store.dispatch('subjectsFilter', payload)
      console.log(subjects)
      // this.subjects = subjects
    },
    async searchLessons (subName) {
      const payload = {
        'dateStart': '2017-01-30',
        'dateEnd': '2018-12-30'
      }
      const lessons = await this.$store.dispatch('lessonsFilter', payload)
      alert(lessons)
    }
  }
}
</script>
<style lang="scss" scoped>
  #map-div {
    position: relative;
    padding: 70px 0 0 0 ;
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
  }

  .select-level, .select-subject {
    width: 25%;
    height: 31px;
    box-shadow: 0px 3px 7px 0 rgba(158, 158, 158, 0.49);
    background-color: white;
    border-style: none;
    color: #c0c0c0;
    margin-right: 2%;
  }

  #div-search-panel{
    margin: 0 auto;
    width: 70%;
    padding-bottom: 0%;
    display: flex;
    align-items: center;
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

  .select-subject{
    display: none;
  }

  .div_radios{
    display: inline-block;
    margin-right: 2%;
    width: 15%;
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
  }

  .div_radios span input{
    padding: 0px;
  }

  // #calendarImg{
  //   width: 4%;
  //   height: 35px;
  // }
</style>
