<template>
  <a href="" class="message-shortcut-wrapper" @click.prevent="$emit('click')">
    <div class="message-shortcut">
      <header class="message-shortcut__header">
        <p class="message-shortcut__title">Czat z: {{ title }}</p>
        <p class="message-shortcut__date">{{ date }}</p>
      </header>
      <p class="message-shortcut__content">{{ content }}</p>
    </div>
  </a>
</template>

<script>
import moment from 'moment'

export default {
  name: 'MessageShortcut',
  props: {
    message: {
      type: Object,
      default: () => ({
        firstName: 'Imię',
        lastName: 'Nazwisko',
        content: 'To jest jakaś wiadomość. Lepiej na nią odpowiedz. Tak zrób.'
      })
    }
  },
  computed: {
    title () {
      return this.message.firstName + ' ' + this.message.lastName
    },
    date () {
      return moment(this.message.lastMessage.dateOfSending).format('YYYY-MM-DD HH:mm:ss')
    },
    content () {
      return this.message.lastMessage.content
    }
  }
}
</script>

<style lang="scss" scoped>
  .message-shortcut-wrapper {
    color: inherit;
    text-decoration: none;
    transition: color .1s ease-in-out;

    &:focus,
    &:hover {
      color: #6038ff;
    }
  }

  .message-shortcut {
    max-width: 480px;
    width: 100%;
    margin: 20px auto 40px;
    border-bottom: 1px dashed #818181;

    &__header {
      display: flex;
      justify-content: space-between;
    }

    &__title,
    &__date {
      @include font-primary(16px);
      margin: 2px 0;
      font-weight: 500;
    }

    &__content {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
