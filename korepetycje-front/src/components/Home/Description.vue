<template>
  <div class="description">
    <div class="description__wrapper">
      <h3 class="description__title">{{ descriptionTitle }}</h3>
      <p class="description__text">{{ descriptionText1 }}</p>
      <p class="description__text"> {{ descriptionText2 }}</p>
      <p class="description__cta">{{ descriptionText3 }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Description',

  data () {
    return {
      descriptionTitle: 'Korepetycje nigdy nie były prostsze!',
      descriptionText1: `Już dziś, korzystając z lokalizacji możesz dodać nową lekcję  i dzielić się swoją wiedzą. Wybierz przedmiot i poziom nauczania, uzupełnij datę, opisz krótko lekcje. Zainteresuj swoich uczniów, a z pewnością do Ciebie wrócą.`,
      descriptionText2: `Lubisz uczyć się nowych rzeczy? Dostępne lekcje możesz filtrować po dacie, przedmiocie oraz poziomie dzięki czemu znajdziesz to co Cię interesuje.`,
      descriptionText3: 'Połącz się z korepetytorami w całym mieście!'
    }
  }
}
</script>

<style lang="scss" scoped>
  .description {
    margin: 50px 0;
    padding: 20px 0;
    background-color: #8c7cff;
    text-align: center;

    &__wrapper {
      max-width: 920px;
      width: 100%;
      margin: 0 auto;
      padding: 0 50px;

      @include mobile {
        padding: 0 20px;
      }
    }

    &__text {
      font-family: Roboto;
      font-size: 17px;
      font-weight: 300;
      color: #fff;
      text-align: left;
    }

    &__cta {
      margin: 33px 0 10px;
      font-family: Roboto;
      font-size: 17px;
      color: #fff;
      font-weight: 500;
    }
  }

  h3 {
    font-size: 26px;
    font-weight: normal;
  }
</style>
