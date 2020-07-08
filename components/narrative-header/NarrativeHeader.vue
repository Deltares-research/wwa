<template functional>
  <header class="narrative-header">
    <h1 class="narrative-header__title">{{ props.title }}</h1>
    <img
      class="narrative-header__cover"
      :src="props.cover.responsiveImage.src"
      :srcset="props.cover.responsiveImage.srcSet"
      :sizes="props.cover.responsiveImage.sizes"
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
    height: 25rem;
  }
  
  .narrative-header__title {
    font-style: normal;
    font-weight: 900;
    font-size: 2rem;
    margin-top: 2rem;
  }

  .narrative-header__cover {
    position: absolute;
  }
</style>
