<template>
  <div class="search-bar">
    <div class="search-bar__label">Znajdź korepetycje na już</div>
    <div class="search-bar__container">
      <input type="text" class="search-bar__input" placeholder="WPISZ SWOJĄ LOKALIZACJĘ">
      <button-component class="search-bar__button" pink>
        Szukaj
      </button-component>
    </div>
    <div class="search-bar__label">lub</div>
    <button-component pink>
      Udziel korepetycji <strong>już teraz</strong>
    </button-component>
  </div>
</template>

<script>
import ButtonComponent from '@/components/Button'

export default {
  name: 'SearchBar',
  components: {
    ButtonComponent
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
      font-size: 48px;
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

    &__container {
      margin: 30px 0;
    }

    &__input {
      max-width: 400px;
      width: 100%;
      padding: 7px 28px;
      border: none;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      font-size: 17px;
    }

    &__button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      font-size: 17px;
    }
  }
</style>
