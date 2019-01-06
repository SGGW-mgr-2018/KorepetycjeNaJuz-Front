<template>
  <div class="chat">
    <loader v-if="loading" dark class="loader" />
    <div v-else>
      <message
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />
    </div>
  </div>
</template>

<script>
import Message from './Message'
import Loader from '@/components/Loader'
import moment from 'moment'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'Chat',
  components: {
    Message,
    Loader
  },
  props: {
    id: {
      type: Number,
      default: -1
    },
    recipientTitle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState({
      userId: state => state.auth.user.id
    }),
    ...mapGetters(['getChatMessages']),
    messages () {
      return this.getChatMessages.map(msg => ({
        id: msg.id,
        content: msg.content,
        date: moment(msg.dateOfSending).format('YYYY-MM-DD HH:mm:ss'),
        userIsAuthor: +this.userId === msg.ownerId,
        userName: +this.userId === msg.ownerId ? 'Ja' : this.recipientTitle
      }))
    }
  },
  async mounted () {
    this.loading = true
    await this.fetchChatMessages(this.id)
    this.loading = false
  },
  methods: {
    ...mapActions(['fetchChatMessages'])
  }
}
</script>

<style lang="scss" scoped>
  .loader {
    margin: 15px auto;
  }
</style>
