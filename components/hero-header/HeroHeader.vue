<template>
  <header
    class="hero-header hero-header--gradient"
    :class="`hero-header--show-${showHeroHeader}`"
    @click="showHeroHeader = false"
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
  width: 100vw;
  padding-top: 4rem;
  text-align: center;
  z-index: 0;
  transition: transform 300ms ease-in-out;
  cursor: pointer;
}
.hero-header--show-false {
  transform: translateY(-100%);
}
.hero-header--gradient::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
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
  max-height: 4.7rem;
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
  }
}
</style>
