<template>
  <div
    ref="navbar"
    :class="{ 'violet': isViolet }"
    class="nav"
    @mouseleave="showedPopup = false"
  >
    <grid-container class="nav__wrapper">
      <img src="" alt="Logo" class="nav__logo">
      <div class="nav-links">
        <router-link to="/" class="nav-links__link">Główna</router-link>
        <router-link to="/rejestracja" class="nav-links__link">Rejestracja
        </router-link>
        <router-link
          to="/logowanie"
          class="nav-links__link log"
          @mouseover.native="showedPopup = true"
        >
          Logowanie
        </router-link>
      </div>
      <transition name="fade">
        <login-modal v-show="showedPopup" />
      </transition>
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
  props: {
    violet: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      showedPopup: false,
      savedPosition: 0
    }
  },
  computed: {
    navHeight () {
      return this.$refs.navbar.clientHeight + 100
    },
    isViolet () {
      return this.$store.state.global.menuTheme === 'violet'
    }
  },
  mounted () {
    document.addEventListener('scroll', this.manageNavBar)
  },
  beforeDestroy () {
    document.removeEventListener('scroll', this.manageNavBar)
  },
  methods: {
    manageNavBar () {
      const windowScrollY = window.scrollY
      if (windowScrollY <= this.navHeight) {
        this.$refs.navbar.classList.remove('sticky')
        this.$refs.navbar.classList.remove('slide-up')
        this.savedPosition = 0
        return
      }
      if (windowScrollY < this.savedPosition) {
        this.$refs.navbar.classList.add('sticky')
        this.$refs.navbar.classList.remove('slide-up')
      } else {
        if (this.$refs.navbar.classList.contains('sticky')) {
          this.$refs.navbar.classList.add('slide-up')
        }
        this.$refs.navbar.classList.remove('sticky')
      }
      this.savedPosition = windowScrollY
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav {
    position: absolute;
    z-index: 10;
    width: 100%;
    transition: .2s ease-in-out;

    &.slide-up {
      position: fixed;
      animation: slide-up .2s;
      animation-fill-mode: forwards;
    }

    &.sticky {
      position: fixed;
      background-color: #fff;
      color: $violet;
      animation: slide-down .2s;
      animation-fill-mode: forwards;
    }

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

      .sticky &,
      .violet &{
        color: $violet;
      }

      &:hover,
      &:focus {
        text-decoration: underline;
      }

      &.log {
        border: 1px solid #fff;
        border-radius: 40px;

        .sticky &,
        .violet & {
          border: 1px solid $violet;
        }

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

  @keyframes slide-down {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0%);
    }
  }

  @keyframes slide-up {
    0% {
      transform: translateY(0%);
    }
    100% {
      transform: translateY(-100%);
    }
  }
</style>
