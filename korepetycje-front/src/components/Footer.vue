<template>
  <footer class="footer">
    <div class="footer__top-section">
      <div class="footer__top-section-left">
        <div class="footer__top-section-column">
          <p>ODKRYWAJ</p>
          <router-link to="/about" class="footer__link">O nas</router-link>
          <router-link to="/" class="footer__link">O projekcie</router-link>
        </div>
        <div class="footer__top-section-column">
          <p>POMOC</p>
          <router-link to="/" class="footer__link">FAQ</router-link>
          <router-link to="/" class="footer__link">Kontakt</router-link>
        </div>
      </div>
      <div class="footer__top-section-right">
        LOGO
      </div>
    </div>
    <div class="footer__bottom-section">
      <p>&copy; 2018.
        <a href="http://www.sggw.pl" class="footer__link" target="_blank">SGGW</a>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}

</script>

<style lang="scss" scoped>
  .footer {
    display: block;
    width: 100%;
    background: #3a3a3a;

    &__top-section {
      color: wheat;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #666;
      padding: 25px 105px;

      @include tablet {
        padding: 25px 40px;
      }

      @include mobile {
        padding: 20px 20px;
      }
    }

    &__top-section-left {
      display: flex;
      justify-content: space-around;
    }

    &__top-section-right {
      margin: auto 0;
    }

    &__top-section-column {
      font-family: Roboto;
      display: flex;
      flex-direction: column;
      margin: 0 35px;

      @include mobile {
        margin: 0 35px 0 0;
      }

      p {
        font-size: 15px;
        color: #fff;
        margin: 0 0 10px 0;
      }
    }

    &__link {
      text-decoration: none;
      color: $gray;
      font-weight: normal;
      margin: 4px 0;
      transition: color .2s ease-in-out;

      &:hover,
      &:focus {
        color: #fff;
      }
    }

    &__bottom-section {
      text-align: center;
      color: $gray;
      padding: 15px;

      p {
        margin: 0;
      }
    }
  }

</style>
