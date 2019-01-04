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

    }

    &__title {

    }

    &__content {

    }
  }
</style>
