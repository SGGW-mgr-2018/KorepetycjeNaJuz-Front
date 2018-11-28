<template>
<<<<<<< HEAD
  <history-lessons />
</template>

<script>
import HistoryLessons from '@/components/HistoryLessonsComponent'
=======
  <grid-container>
    <div class="page--account">
      <p class="page--account__title">Moje konto</p>
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
>>>>>>> 1013991a4199f3bd9450760671fd00acaaa52558

export default {
  name: 'MyAccount',
  components: {
<<<<<<< HEAD
    HistoryLessons
  }
}
</script>
=======
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

    &__title {
      @include font-primary(36px);
      color: $violet;
      font-weight: normal;
      text-align: center;
    }
  }

  .tabs-bar {

  }
</style>
>>>>>>> 1013991a4199f3bd9450760671fd00acaaa52558
