<template>
  <div id="map-div">

    <div id="input-div">
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
      <span>
        <datepicker v-model="date" />
      </span>
      <img id="calendarImg" src="http://wsgastro.pl/wp-content/uploads/2013/10/icon-calendar.png">
    </div>

    <map-container />
  </div>
</template>

<script>
import MapContainer from '@/components/MapComponent'
import debounce from 'lodash.debounce'
import datepicker from 'vue-date'

export default {
  name: 'Map',
  components: {
    MapContainer,
    datepicker
  },
  data () {
    return {
      subject: '',
      subjects: [],
      date: '2016-10-16'
    }
  },
  created () {
    this.subject = this.$route.params.searchInput
    this.$store.commit('SET_MENU_THEME', 'violet')
    this.addSubjects()
    // this.searchSubjects()
  },
  methods: {
    setInput () {
      this.search(this.subject, this)
    },
    search: debounce((query, self) => {
      self.$store.commit('SET_SEARCH_QUERY', query)
    }, 500),
    async addSubjects () {
      const subjects = await this.$store.dispatch('subjects', '')
      console.log(subjects)
      this.subjects = subjects
    },
    async searchSubjects () {
      const payload = {
        'name': 'Matematyka'
      }
      const subjects = await this.$store.dispatch('subjectsFilter', payload)
      console.log(subjects)
      // this.subjects = subjects
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
    width: 25%;
    height: 31px;
    border-radius: 25px;
    box-shadow: 0px 3px 7px 0 rgba(158, 158, 158, 0.49);
    background-color: white;
    border-style: none;
    color: #c0c0c0;
  }

  .select-level, .select-subject {
    width: 20%;
    height: 31px;
    box-shadow: 0px 3px 7px 0 rgba(158, 158, 158, 0.49);
    background-color: white;
    border-style: none;
    margin-left: 2%;
    color: #c0c0c0;
  }

  #input-div{
    margin: 0 auto;
    width: 70%;
    padding-bottom: 0%;
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

  .date-picker{
    width: 20%;
    height: 35px;
    box-shadow: 0px 3px 7px 0 rgba(158, 158, 158, 0.49);
    background-color: white;
    border-style: none;
    margin-left: 2%;
    color: #c0c0c0;
    display: inline-block;
  }

  .div_radios{
    display: inline-block;
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
    margin: 0px 10px;
  }

  #calendarImg{
    width: 35px;
    height: 35px;
  }

</style>
