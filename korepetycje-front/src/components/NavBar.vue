<template>
  <div
    ref="navbar"
    :class="{ 'violet': isViolet }"
    class="nav"
    @mouseleave="showedPopup = false"
  >
    <grid-container class="nav__wrapper">
      <img src="" alt="Logo" class="nav__logo">
      <div ref="navbarDesktop" class="nav-links">
        <router-link to="/" class="nav-links__link">Główna</router-link>
        <router-link to="/rejestracja" class="nav-links__link">Rejestracja
        </router-link>
        <router-link
          to="/logowanie"
          class="nav-links__link login"
          @mouseover.native="showedPopup = true"
        >
          Logowanie
        </router-link>
      </div>
      <div ref="navbarMobile">
        <div class="nav-burger">
          <input type="checkbox">
          <span />
          <span />
          <span />
          <ul class="menu-burger">
            <router-link to="/" class="menu-burger__link">Główna</router-link> <br>
            <router-link to="/rejestracja" class="menu-burger__link">Rejestracja</router-link> <br>
            <router-link to="/logowanie" class="menu-burger__link">Logowanie</router-link>
          </ul>
        </div>
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
    this.showHideBurgerMenu()
    window.addEventListener('resize', this.showHideBurgerMenu)
    window.addEventListener('scroll', this.manageNavBar)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.showHideBurgerMenu)
    window.removeEventListener('scroll', this.manageNavBar)
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
    },
    showHideBurgerMenu () {
      const width = window.innerWidth
      console.log(width)
      let desktop = this.$refs.navbarDesktop
      let mobile = this.$refs.navbarMobile
      if (width > 1000) {
        desktop.style.display = 'flex'
        mobile.style.display = 'none'
      } else {
        desktop.style.display = 'none'
        mobile.style.display = 'flex'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav {
    padding: 20px 0px 20px;
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

      &.login {
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

  .nav-burger {
    display: block;
    position: absolute;
    right: 50px;
    z-index: 1;
    -webkit-user-select: none;
    user-select: none;
  }

  .nav-burger input {
    display: block;
    width: 40px;
    height: 32px;
    position: absolute;
    top: -7px;
    left: -5px;
    cursor: pointer;
    opacity: 0;
    z-index: 2;
    -webkit-touch-callout: none;
  }

  .nav-burger span {
    display: block;
    width: 33px;
    height: 4px;
    margin-bottom: 5px;
    position: relative;
    background: #000;
    border-radius: 3px;
    z-index: 1;
    transform-origin: 4px 0px;
    transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0), background 0.5s cubic-bezier(0.77,0.2,0.05,1.0), opacity 0.55s ease;
}

  .nav-burger span:first-child {
    transform-origin: 0% 0%;
  }

  .nav-burger span:nth-last-child(2) {
    transform-origin: 0% 100%;
  }

  .nav-burger input:checked ~ span {
    opacity: 1;
    transform: rotate(45deg) translate(-2px, -1px);
    background: #fff;
  }

  .nav-burger input:checked ~ span:nth-last-child(3) {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
  }

  .nav-burger input:checked ~ span:nth-last-child(2) {
    transform: rotate(-45deg) translate(0px, -1px);
  }

  .nav-burger input:checked ~ ul {
    transform: scale(1.0, 1.0);
    opacity: 1;
  }

  .menu-burger {
    position: absolute;
    width: 300px;
    margin: -100px 0 0 0px;
    padding: 50px;
    padding-top: 125px;
    right: -100px;
    background: #36383F;
    list-style-type: none;
    -webkit-font-smoothing: antialiased;
    transform-origin: 0% 0%;
    transform: translate(100%, 0);
    transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
    display: flex;
    flex-direction: column;
    justify-content: spance-around;

    &__link {
      font-size: 17px;
      font-weight: 500;
      text-decoration: none;
      color: #fff;

      &:hover,
      &:focus {
        text-decoration: underline;
      }
    }
  }

  .menu-burger li {
    padding: 10px 0;
    font-size: 22px;
  }
</style>
