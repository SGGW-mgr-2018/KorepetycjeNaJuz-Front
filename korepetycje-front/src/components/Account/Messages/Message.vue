<template>
  <div :class="classes" class="message">
    <header class="message__header">
      <p class="message__title">{{ message.userName }}</p>
      <p class="message__date">{{ message.date }}</p>
    </header>
    <p class="message__content">{{ message.content }}</p>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    message: {
      type: Object,
      default: () => ({
        id: 0,
        content: 'Treść wiadomości',
        date: '01/01/2018',
        userIsAuthor: false,
        userName: 'Jan Kowalski'
      })
    }
  },
  computed: {
    classes () {
      return {
        'message--author': this.message.userIsAuthor
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .message {
    max-width: 480px;
    margin: 15px 0;

    &--author {
      margin: 15px 0 15px auto;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      font-weight: 500;
      font-size: 17px;
      margin-top: 10px;
    }

    &__content {
      padding: 20px 0;
      margin: 0;
      border-top: 2px solid $pink;

      .message--author & {
        border-top: 2px solid $blue;
      }
    }
  }
</style>
