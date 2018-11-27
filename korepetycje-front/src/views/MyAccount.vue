<template>
  <grid-container>
    <div class="page--account">
      <p>Moje konto</p>
      <the-navigation class="tabs-bar" @click="manageTabs" />
      <edit-profile-component v-if="activeTab === 1" />
      <history-component v-if="activeTab === 2" />
      <calendar-component v-if="activeTab === 3" />
      <messages-component v-if="activeTab === 4" />
    </div>
  </grid-container>
</template>

<script>
import TheNavigation from '@/components/Account/TheNavigation'
import EditProfileComponent from '@/components/Account/EditProfile'
import HistoryComponent from '@/components/Account/History'
import CalendarComponent from '@/components/Account/Calendar'
import MessagesComponent from '@/components/Account/Messages'

export default {
  name: 'MyAccount',
  components: {
    TheNavigation,
    EditProfileComponent,
    HistoryComponent,
    CalendarComponent,
    MessagesComponent
  },
  data () {
    return {
      activeTab: 1
    }
  },
  created () {
    this.$store.commit('SET_MENU_THEME', 'violet')
  },
  methods: {
    manageTabs (value) {
      this.activeTab = value
    }
  }
}
</script>

<style lang="scss" scoped>
  .page--account {
    padding: 80px 0;
  }

  .tabs-bar {

  }
</style>
