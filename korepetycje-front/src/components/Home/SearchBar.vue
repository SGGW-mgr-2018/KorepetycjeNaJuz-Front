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
          @keyup.enter="searchLocation"
        >
        <button-component class="search-bar__button" pink @click="searchLocation">
          Szukaj
        </button-component>
      </div>
      <div class="search-bar__label search-bar__label--smaller">lub</div>
      <button-component pink class="button-cta" @click="addLesson">
        Udziel korepetycji <span class="button-cta__strong">już teraz</span>
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
    },
    addLesson () {
      this.$router.push({
        name: 'nowa-lekcja'
      })
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

    @include mobile {
      margin: 0 0 50px;
    }

    &__label {
      margin-bottom: 6vh;
      margin-top: 4vh;
      font-size: 48px;
      font-weight: 100;
      color: white;
      text-align: center;

      @include tablet {
        font-size: 40px;
      }

      @include mobile {
        font-size: 28px;
      }

      &--smaller {
        margin: 50px 0;

        @include tablet {
          margin: 5vh;
        }
      }
    }

    &__container {
      margin: 30px 0;
      display: flex;
      align-items: center;
      justify-content: center;

      @include mobile {
        flex-direction: column;
      }
    }

    &__input {
      max-width: 400px;
      width: 100%;
      padding: 8px 36px;
      border: none;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      font-size: 17px;

      @include mobile {
        margin: 0 0 8px;
        border-radius: 10px;
        font-size: 15px;
        text-align: center;
      }
    }

    &__button {
      padding: 8px 36px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      font-size: 17px;

      @include mobile {
        max-width: 400px;
        width: 100%;
        border-radius: 10px;
      }
    }

    .button-cta {
      padding: 17px 36px;
      margin: 0 auto;

      &__strong {
        margin-left: 5px;
        font-weight: 700;
      }
    }
  }
</style>
