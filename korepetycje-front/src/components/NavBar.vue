<template>
  <div class="nav" @mouseleave="showedPopup = false">
    <grid-container class="nav__wrapper">
      <img src="" alt="Logo" class="nav__logo">
      <div class="nav-links">
        <router-link to="/" class="nav-links__link">Główna</router-link>
        <router-link to="/rejestracja" class="nav-links__link">Rejestracja</router-link>
        <router-link
          to="/logowanie"
          class="nav-links__link log"
          @mouseover.native="showedPopup = true"
        >
          Logowanie
        </router-link>
      </div>
      <login-modal v-show="showedPopup" />
    </grid-container>
  </div>
</template>

<script>
import LoginModal from '@/components/Login/LoginModal'

export default {
  name: 'NavBar',
  components: {
    LoginModal
  },
  data () {
    return {
      showedPopup: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav {
    position: fixed;
    z-index: 10;
    width: 100%;

    &__wrapper {
      position: relative;
      display: flex;
      justify-content: space-between;
    }
  }

  .nav-links {
    display: flex;
    justify-content: flex-end;

    &__link {
      margin: 10px 0;
      padding: 8px 30px;
      font-size: 17px;
      font-weight: 500;
      text-decoration: none;
      color: #fff;

      &:hover,
      &:focus {
        text-decoration: underline;
      }

      &.log {
        border: 1px solid #fff;
        border-radius: 40px;

        &:hover,
        &:focus {
          text-decoration: none;
          background-color: #fff;
          color: $violet;
          border: 1px solid $violet;
        }
      }

      &.router-link-exact-active {
        font-weight: 500;
      }
    }
  }

  .login-modal {
    position: absolute;
    top: 60px;
    right: 0;
    margin-right: 60px;

    @include tablet {
      margin-right: 40px;
    }

    @include mobile {
      display: none;
    }
  }
</style>
