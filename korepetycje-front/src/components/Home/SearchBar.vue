<template>
  <div class="search-bar">
    <div class="search-bar-label">Znajdź korepetycje na już</div>
    <div class="search-container">
      <input v-model="searchContent" type="text" class="search-bar-input" placeholder="WPISZ SWOJĄ LOKALIZACJĘ">
      <button class="search-bar-button" @click="searchLocation">SZUKAJ</button>
    </div>
    <div class="search-bar-label">lub</div>
    <button class="search-bar-button button-cor">UDZIEL KOREPETYCJI TERAZ</button>
  </div>
</template>

<script>
import router from '@/router.js'
export default {
  name: 'SearchBar',
  data () {
    return {
      searchContent: ''
    }
  },
  methods: {
    searchLocation () {
      if (this.searchContent !== '') {
        router.push({ name: 'map', params: { searchInput: this.searchContent } })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
   overflow: hidden;
   display: block;
   width: 100%;
  text-align: center;
}

.search-bar-input {
  padding: 6px;
  margin-top: 8px;
  font-size: 17px;
  border: none;
  border-bottom-left-radius: 12px;
  border-top-left-radius: 12px;
  width: 80vh;
  padding-left: 28px;
}

.search-bar-button {
  // float: right;
  padding: 6px;
  padding-top: 7px;
  margin-right: 16px;
  padding-right: 30px;
  padding-left: 30px;
  font-size: 17px;
  font-family: Roboto;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: white;
  border: none;
  cursor: pointer;
  background-color: #e34195;
  border-bottom-right-radius: 12px;
  border-top-right-radius: 12px;
}

.search-bar-label {
  font-family: Roboto;
  font-size: 60px;
  font-weight: 100;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: white;
  text-align: center;
  margin-bottom: 6vh;
  margin-top: 4vh;
}

.button-cor {
  border-radius: 12px;
}
</style>
