<template>
  <div class="message">
    <header class="message__header">
      <p class="message__title">{{ message.title }}</p>
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
        title: 'Tytuł wiadomości',
        date: '01/01/2019',
        content: 'To jest jakaś wiadomość. Lepiej na nią odpowiedz. Tak zrób.'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .message {
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
    }
  }
</style>
