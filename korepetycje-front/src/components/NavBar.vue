<template>
  <div class="nav">
    <grid-container class="nav__wrapper">
      <img src="" alt="Logo" class="nav__logo">
      <div class="nav-links">
        <router-link to="/" class="nav-links__link">Główna</router-link>
        <router-link to="/rejestracja" class="nav-links__link">Rejestracja</router-link>
        <router-link to="/logowanie" class="nav-links__link log" @click="seen = !seen">Logowanie</router-link>
      </div>
    </grid-container>
    <grid-container>
      <login-modal :show="seen" />
    </grid-container>
  </div>
</template>

<script>
import LoginModal from '@/components/Login/LoginModal'
export default {
  name: 'NavBar',
  components: {
    LoginModal
  }
}
</script>

<style lang="scss" scoped>
  .nav {
    position: fixed;
    z-index: 10;
    width: 100%;

    &__wrapper {
      display: flex;
      justify-content: space-between;
    }
  }

  .nav-links {
    display: flex;
    justify-content: flex-end;
    &__link {
      margin: 10px 0px;
      padding: 10px 40px;
      font-size: 17px;
      text-decoration: none;
      color: #fff;

      &.log {
        border: 1px solid #fff;
        border-radius: 40px;
      }

      &.router-link-exact-active {
        font-weight: 500;
      }
    }
  }
</style>
