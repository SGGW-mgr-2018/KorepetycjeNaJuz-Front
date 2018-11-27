<template>
  <ul class="tabs">
    <li class="tabs__item">
      <a
        href="#"
        class="tabs__link"
        @click.prevent="$emit('click', 1)"
      >
        Edytuj dane
      </a>
    </li>
    <li class="tabs__item">
      <a
        href="#"
        class="tabs__link"
        @click.prevent="$emit('click', 2)"
      >
        Historia korepetycji
      </a>
    </li>
    <li class="tabs__item">
      <a
        href="#"
        class="tabs__link"
        @click.prevent="$emit('click', 3)"
      >
        Kalendarz
      </a>
    </li>
    <li class="tabs__item">
      <a
        href="#"
        class="tabs__link"
        @click.prevent="$emit('click', 4)"
      >
        Wiadomości
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TheNavigation'
}
</script>

<style lang="scss" scoped>
  .tabs {
    max-width: 720px;
    width: 100%;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    list-style: none;
    border-radius: 20px;
    background-color: $gray-darker;

    @include mobile {
      flex-direction: column;
    }

    &__item {
      @include mobile {
        margin: 10px 0;
      }
    }

    &__link {
      padding: 10px 20px;
      text-decoration: none;
      opacity: .5;
      color: #fff;
      text-transform: uppercase;

      &:hover,
      &:focus,
      &--active {
        opacity: 1;
      }
    }
  }
</style>
