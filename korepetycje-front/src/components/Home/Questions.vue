<template>
  <div class="section-questions">
    <img
      src="/svg/pen_gray.svg"
      alt=""
      class="section-questions__pen section-questions__pen--left"
    >
    <img
      src="/svg/pen_gray.svg"
      alt=""
      class="section-questions__pen"
    >
    <h3 class="section-questions__title">
      Nadal masz wątpliwości?
    </h3>
    <div class="separator" />
    <p class="section-questions__text">
      Skorzystaj z
      <a href="https://samosia.pl" class="section-questions__link">
        odpowiedzi na najczęściej zadawane pytania
      </a> lub
      <a href="mailto:admin@domain.tld" class="section-questions__link">napisz do nas</a>.
      Pomożemy Ci najlepiej jak potrafimy!
    </p>
  </div>
</template>

<script>
export default {
  name: 'Questions'
}
</script>

<style lang="scss" scoped>
  .section-questions {
    position: relative;
    max-width: 920px;
    width: 100%;
    padding: 0 50px;
    margin: 0 auto;
    text-align: center;

    @include mobile {
      padding: 0 20px;
    }

    &__pen {
      position: absolute;
      top: 0;
      right: -50px;
      width: 48px;
      height: 48px;

      @include tablet {
        right: 50px;
      }

      &--left {
        width: 64px;
        height: 64px;
        top: 90px;
        right: auto;
        left: -70px;
        transform: scaleX(-1);

        @include tablet {
          left: 20px;
        }

        @include mobile {
          display: none;
        }
      }
    }

    &__title {
      position: relative;
      z-index: 2;
      font-size: 26px;
      font-weight: normal;
    }

    &__link {
      color: $violet-darker;
      text-decoration: none;

      &:hover {
        color: $pink;
      }
    }
  }

  .separator {
    width: 200px;
    height: 2px;
    margin: 10px auto 30px;
    background-color: $gray-darker;
  }
</style>
