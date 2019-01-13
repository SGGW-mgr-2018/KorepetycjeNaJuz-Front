<template>
  <div class="quick-reply">
    <transition name="fade">
      <div v-if="messageSent" class="success-message">
        Wiadomość została wysłana
      </div>
    </transition>
    <errors-component :errors="errors" :visible="!!errors.length" />
    <div class="message-wrapper">
      <text-area
        v-model="message"
        class="quick-reply__message"
        placeholder="Wpisz odpowiedź..."
        @focus="handleFocus"
      />
      <button-component
        pink
        class="quick-reply__button"
        @click="handleClick"
      >
        Wyślij
      </button-component>
    </div>
  </div>
</template>

<script>

import ButtonComponent from '@/components/Button'
import TextArea from '@/components/Form/TextArea'
import ErrorsComponent from '@/components/Form/Errors'
import { mapActions } from 'vuex'

export default {
  name: 'QuickReply',
  components: {
    ErrorsComponent,
    TextArea,
    ButtonComponent
  },
  props: {
    recipientId: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      errors: [],
      message: '',
      loading: false,
      messageSent: false
    }
  },
  methods: {
    ...mapActions(['sendEmail']),
    handleFocus () {
      this.errors = []
    },
    async handleClick () {
      if (!this.message.length) {
        this.errors.push('Wprowadź odpowiedź!')
        return
      }

      this.errors = []
      const payload = {
        id: this.recipientId,
        content: this.message
      }
      this.loading = true
      await this.sendEmail(payload)
      this.loading = false
      this.messageSent = true
      setTimeout(() => {
        this.messageSent = false
        this.message = ''
      }, 2200)
    }
  }
}
</script>

<style lang="scss" scoped>
  .quick-reply {
    margin-top: 30px;
    padding-top: 30px;
    border-top: 2px dashed #ccd3de;

    .message-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      @include mobile {
        flex-direction: column;
        align-items: center;
      }
    }

    &__message,
    /deep/ .text-area {
      max-width: 500px;

      .text-area {
        max-width: 500px;
      }
    }

    &__button {
      width: 120px;
      height: 40px;
      flex-shrink: 0;
    }
  }

  .success-message {
    margin-bottom: 20px;
    padding: 8px;
    background: #a2f9a2;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
  }
</style>
