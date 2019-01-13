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
          <button-component
            class="button--refresh"
            @click="refreshMessages"
          >
            Odśwież
          </button-component>
        </header>
        <div v-if="!loading" class="inbox__list">
          <message-shortcut
            v-for="conversation in getConversations"
            :key="conversation.userId"
            :message="conversation"
            @click="goToChat(conversation)"
          />
        </div>
        <loader v-if="loading" dark class="loader" />
      </div>
      <div v-if="activeStep === 1" key="message" class="message-wrapper">
        <button class="arrow-back" @click="showMessagesList">&larr;</button>
        <new-message v-if="action === 'newMessage'" />
        <chat
          v-else
          :id="chatId"
          :recipient-title="recipient"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import MessageShortcut from './MessageShortcut'
import Loader from '@/components/Loader'
import Chat from './Chat'
import NewMessage from './NewMessage'
import ButtonComponent from '@/components/Button'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Messages',
  components: {
    MessageShortcut,
    Chat,
    ButtonComponent,
    NewMessage,
    Loader
  },
  data () {
    return {
      chatId: -1,
      recipient: 'Imię Nazwisko',
      activeStep: 0,
      action: 'newMessage',
      chats: [{
        id: 0,
        lastMessage: {}
      }],
      loading: false
    }
  },
  computed: {
    ...mapGetters(['getConversations'])
  },
  async mounted () {
    this.fetchCalendarData()
    this.loading = true
    await this.fetchAllConversations()
    this.loading = false
  },
  methods: {
    ...mapActions(['fetchCalendarData', 'fetchAllConversations']),
    goToChat (conversation) {
      this.chatId = conversation.userId
      this.recipient = conversation.firstName + ' ' + conversation.lastName
      this.activeStep = 1
      this.action = 'showMessage'
    },
    showMessagesList () {
      this.activeStep = 0
    },
    newMessage () {
      this.activeStep = 1
      this.action = 'newMessage'
    },
    async refreshMessages () {
      this.loading = true
      await this.fetchAllConversations()
      this.loading = false
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
      display: flex;
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

  .loader {
    margin: 0 auto;
  }

  .button--refresh {
    background-color: #66a6e3;
    color: #fff;
    margin-left: 15px;

    &:hover {
      background-color: #40b0ff;
    }
  }
</style>
