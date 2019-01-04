<template>
  <div>
    <div class="messages">
      <message-shortcut
        v-for="number in 3"
        :key="number"
        @click="goToMessage(number)"
      />
    </div>
    <div class="message-wrapper">
      <button class="arrow-back" @click="showMessagesList">&larr;</button>
      <message />
    </div>
  </div>
</template>

<script>
import MessageShortcut from './MessageShortcut'
import Message from './Message'
export default {
  name: 'Messages',
  components: {
    Message,
    MessageShortcut
  },
  methods: {
    goToMessage (id) {
      console.log('message ID', id)
    },
    showMessagesList () {
      console.log('Show messages list')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
