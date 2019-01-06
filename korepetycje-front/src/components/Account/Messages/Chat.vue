<template>
  <div class="chat">
    <message />
  </div>
</template>

<script>
import Message from './Message'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Chat',
  components: {
    Message
  },
  props: {
    id: {
      type: Number,
      default: -1
    }
  },
  watch: {
    id (value) {
      if (value > -1) {
        // wczytaj konwersacje
      }
    }
  },
  methods: {
    ...mapActions([''])
  }
}
</script>

<style lang="scss" scoped>

</style>
