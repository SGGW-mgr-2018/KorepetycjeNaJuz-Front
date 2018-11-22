<template>
  <div class="description">
    <h1> {{ descriptionTitle }} </h1>
    <div class="float">
      <p> {{ descriptionText1 }} </p>
      <p> {{ descriptionText2 }} <br> <span style="font-weight:500"> {{ descriptionText3 }} </span> </p>
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
.description{
  background-color: #8c7cff;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
}
h1{
  height: 23.5px;
  font-size: 24px;
  padding-top: 30px;
  padding-bottom: 34px;
  font-weight: normal;
}
p{
  font-family: Roboto;
  font-size: 15px;
  font-weight: 300;
  color: #ffffff;
}
.float{
  margin: 0px 100px 100px 100px;
  padding-bottom: 48.5px;
}
</style>
