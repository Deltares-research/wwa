<template>
  <header
    class="hero-header hero-header--gradient"
    :class="{ 'hero-header--hidden' : !showHeroHeader }"
    @click="$emit('hideHeroHeader')"
    role="button"
  >
    <div class="hero-header__container">
      <h1 class="hero-header__title" >
        World Water <br /> Atlas
      </h1>
      <section v-if="body.length > 0" class="hero-header__intro" v-html="body" ></section>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    body: {
      type: String,
      default: ''
    },
    showHeroHeader: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style>
.hero-header {
  position: absolute;
  top: 4rem;
  width: 100%;
  padding-top: 4rem;
  text-align: center;
  z-index: 0;
  transition: transform 300ms ease-in-out;
  cursor: pointer;
}
.hero-header--hidden {
  transform: translateY(-100%);
}
.hero-header--gradient::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100vw - 40px);
  height: 130%;
  opacity: 0.75;
  background-image: linear-gradient(to bottom, #00002a, #00002a 52%, rgba(0, 0, 42, 0));
  z-index: -1;
  pointer-events: none;
}
.hero-header__container {
  max-width: 350px;
  margin: 0 auto;
}
.hero-header__title {
  font-size: 2rem;
  font-weight: 500;
  line-height: 1;
  margin-bottom: 0.5rem;
}
.hero-header__intro {
  font-size: 0.875rem;
  max-height: 4.4rem;
  overflow: hidden;
}
@media (min-width: 600px) {
  .hero-header {
    padding-top: 2rem;
  }
}
@media (min-width: 768px) {
  .hero-header__title {
    font-size: 3.5rem;
  }
  .hero-header__intro {
    font-size: 1rem;
    max-height: 5rem;
  }
}
</style>
