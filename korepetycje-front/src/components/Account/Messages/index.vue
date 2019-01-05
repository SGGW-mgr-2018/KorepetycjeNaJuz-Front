<template>
  <div class="mailbox-panel">
    <transition name="fade" mode="out-in">
      <div v-if="activeStep === 0" key="list" class="inbox">
        <header class="inbox__header">
          <button-component
            class="button--new-message"
            pink
            @click="newMessage"
          >
            + Nowa wiadomość
          </button-component>
        </header>
        <div class="inbox__list">
          <message-shortcut
            v-for="number in 3"
            :key="number"
            @click="goToMessage(number)"
          />
        </div>
      </div>
      <div v-if="activeStep === 1" key="message" class="message-wrapper">
        <button class="arrow-back" @click="showMessagesList">&larr;</button>
        <div v-if="action === 'newMessage'">
          <new-message />
        </div>
        <div v-else>
          <message />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import MessageShortcut from './MessageShortcut'
import Message from './Message'
import NewMessage from './NewMessage'
import ButtonComponent from '@/components/Button'

export default {
  name: 'Messages',
  components: {
    Message,
    MessageShortcut,
    ButtonComponent,
    NewMessage
  },
  data () {
    return {
      activeStep: 0,
      action: 'newMessage'
    }
  },
  methods: {
    goToMessage (id) {
      this.action = 'showMessage'
      this.activeStep = 1
      console.log('message ID', id)
    },
    showMessagesList () {
      this.activeStep = 0
    },
    newMessage () {
      this.activeStep = 1
      this.action = 'newMessage'
    }
  }
}
</script>

<style lang="scss" scoped>
  .mailbox-panel {
    max-width: 720px;
    width: 100%;
    margin: 0 auto;
  }

  .inbox {
    &__header {
      margin-bottom: 35px;
    }
  }

  .arrow-back {
    width: 60px;
    border: 2px solid black;
    border-radius: 15px;
    font-size: 20px;
    color: #262626;
    cursor: pointer;
  }
</style>
