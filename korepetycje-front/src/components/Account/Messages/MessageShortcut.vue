<template>
  <a href="" class="message-shortcut-wrapper" @click.prevent="$emit('click')">
    <div class="message-shortcut">
      <header class="message-shortcut__header">
        <p class="message-shortcut__title">{{ message.title }}</p>
        <p class="message-shortcut__date">{{ message.date }}</p>
      </header>
      <p class="message-shortcut__content">{{ message.content }}</p>
    </div>
  </a>
</template>

<script>
export default {
  name: 'MessageShortcut',
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
