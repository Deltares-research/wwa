<template functional>
  <header class="narrative-header">
    <h1 class="narrative-header__title">
      {{ props.title }}
    </h1>

    <img
      v-if="props.cover"
      class="narrative-header__cover"
      :src="`${props.cover.imgixHost}${props.cover.value.path}?auto=compress&w=700`"
      alt=""
    >
  </header>
</template>

<script>
  export default {
    title: String,
    cover: Object,
  };
</script>

<style>
  .narrative-header {
    position: relative;
    z-index: 1;
    height: 25rem;
  }

  .narrative-header:before {
    z-index: 2;
    content: '';
    position: absolute;
    display: block;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(180deg, rgba(8, 8, 8, 0) 0%, rgba(8, 8, 8, 0.7) 84%, var(--black-primary) 100%);
  }

  .narrative-header__title {
    z-index: 3;
    position: absolute;
    padding: 0 1rem;
    top: 5rem;
    max-width: 44rem;
    font-style: normal;
    font-weight: 900;
    font-size: 2rem;
  }

  @media (--md-viewport) {
    .narrative-header__title {
      padding: 0;
      left: 50%;
      width: 100%;
      transform: translateX(-50%);
      font-size: 3.75rem;
      line-height: 1.1;
    }
  }

  @media (--lg-viewport) {
    .narrative-header__title {
      padding: 2rem;
      width: 100%;
    }
  }

  .narrative-header__cover {
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
</style>
