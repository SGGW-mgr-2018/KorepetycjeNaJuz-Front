<template>
  <div class="history-lesson">
    <img alt="LOGO" class="avatar-img">
    <div class="history-lesson-header">Nazwa przedmiotu</div>
    <div class="history-lesson-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eleifend tempus iaculis. Praesent interdum, magna ac sagittis convallis, risus ex condimentum ipsum, sed luctus nulla ipsum ac augue. Nullam egestas nulla eu eros sagittis feugiat. Nulla eget risus eu neque ullamcorper sollicitudin. Aenean sed turpis at libero pulvinar pulvinar eget eu mi. Ut vitae eleifend ligula, at convallis massa. Aliquam erat volutpat.</div>
    <button-component class="login-modal__button set-opinion-button" pink>
      WYSTAW OPINIĘ
    </button-component>
  </div>
</template>

<script>
import ButtonComponent from '@/components/Button'
export default {
  name: 'HistoryLesson',
  components: { ButtonComponent },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  [v-cloak] {
    visibility: hidden;
  }
  .history-lesson{
    height: 15vh;
    margin-bottom: 5vh;
  }

  .avatar-img{
    width: 10vh;
    height: 10vh;
    float: left;
  }

  .history-lesson-header{
    font-family: Roboto;
    font-size: 15px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #6b52ff;
  }

  .history-lesson-description{
    font-size: 10px;
    font-family: Roboto;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: justify;
    color: gray;
    text-overflow: ellipsis;
    overflow: auto;
    height: 7vh;
  }

  .set-opinion-button{
    float: right;
    margin-top: 1vh;
    font-size: 10px;
    padding: 4px 15vh;
  }
</style>
