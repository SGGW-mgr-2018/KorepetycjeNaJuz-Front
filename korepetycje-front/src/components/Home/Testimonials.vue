<template>
  <div class="testimonials">
    <div>
      <h1> {{ title }} </h1>
      <hr>
    </div>
    <div align="center">
      <div class="float">
        <img :src="rejUrl" :alt="rejTitle">
        <p> {{ rejTitle }} </p>
        <pre> {{ rejTxt }} </pre>
      </div>
      <div class="float">
        <img :src="firendsUrl" :alt="friendsTitle">
        <p> {{ friendsTitle }} </p>
        <pre> {{ friendsTxt }} </pre>
      </div>
      <div class="float">
        <img :src="destinationUrl" :alt="destinationTitle">
        <p> {{ destinationTitle }} </p>
        <pre> {{ destinationTxt }} </pre>
      </div>
    </div>
    <div class="button">
      <button-component pink>Zarejestruj się</button-component>
    </div>
  </div>
</template>

<script>
import ButtonComponent from '@/components/Button'

export default {
  name: 'Testimonials',
  components: {
    ButtonComponent
  },
  data () {
    return {

      title: '3 proste kroki do nowej wiedzy',

      rejUrl: 'svg/registration.svg',
      rejTitle: 'Zarejestruj się',
      rejTxt: `Wystarczy 5 minut, aby korzystać z 
 pełnej oferty serwisu. Formularz zawiera
 tylko podstawowe dane.`,

      firendsUrl: 'svg/find-my-friend.svg',
      friendsTitle: 'Wybierz co chcesz dziś robić',
      friendsTxt: `Masz chęć poszerzyć swoją wiedzę?
 A może się nią podzielić?
 Wystarczy, że wpiszesz swoją lokalizację.`,

      destinationUrl: 'svg/destination.svg',
      destinationTitle: 'Staw się w umówionym miejscu',
      destinationTxt: `Po wybraniu interesującego przedmiotu,
 oczekuj podanej w ogłoszeniu godziny.
 Zabierz ze sobą pozytywne nastawienie!`
    }
  }
}

</script>

<style lang="scss" scoped>
.testimonials{
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #3d3d3d;
}
.float{
  align-content: center;
  display: inline-block;
  margin-left: 50px;
  margin-right: 50px;
}
h1{
  font-size: 25.5px;
  font-weight: 300;
}
hr{
  width: 153px;
  background-color: #3d3d3d;
  height: 2px;
}
img{
  width: 198px;
  height: 198px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  background-color: var(--cornflower);
}
p{
  height: 15.5px;
  font-size: 16.5px;
  font-weight: 500;
}
pre{
  height: 43.5px;
  font-family: Roboto;
  font-size: 13.25px;
  font-weight: 300;
}
.button{
  display: block;
  width: 235px;
  height: 26px;
  margin: auto;
  font-size: 14px;
  text-align: center;
  padding: 0px;
}
</style>
