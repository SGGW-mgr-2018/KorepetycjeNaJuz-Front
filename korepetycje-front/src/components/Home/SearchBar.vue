<template>
  <div class="search-bar">
    <div class="search-container">
      <div class="search-bar__label">Znajdź korepetycje na już</div>
      <div class="search-bar__container">
        <input
          v-model="searchContent"
          type="text"
          class="search-bar__input"
          placeholder="WPISZ SWOJĄ LOKALIZACJĘ"
        >
        <button-component class="search-bar__button" pink @click="searchLocation">
          Szukaj
        </button-component>
      </div>
      <div class="search-bar__label search-bar__label--smaller">lub</div>
      <button-component pink class="button-cta">
        Udziel korepetycji <strong>już teraz</strong>
      </button-component>
    </div>
  </div>
</template>

<script>
import ButtonComponent from '@/components/Button'

export default {
  name: 'SearchBar',
  components: {
    ButtonComponent
  },
  data () {
    return {
      searchContent: ''
    }
  },
  methods: {
    searchLocation () {
      if (this.searchContent !== '') {
        this.$router.push({
          name: 'map',
          params: { searchInput: this.searchContent }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-bar {
    width: 100%;
    margin: 0 0 100px;
    display: block;
    overflow: hidden;
    text-align: center;

    &__label {
      margin-bottom: 6vh;
      margin-top: 4vh;
      font-size: 48px;
      font-weight: 100;
      color: white;
      text-align: center;

      &--smaller {
        margin: 10vh;
      }
    }

    &__container {
      margin: 30px 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__input {
      max-width: 400px;
      width: 100%;
      padding: 8px 36px;
      border: none;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      font-size: 17px;
    }

    &__button {
      padding: 8px 36px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      font-size: 17px;
    }

    .button-cta {
      padding: 17px 36px;
    }
  }
</style>
