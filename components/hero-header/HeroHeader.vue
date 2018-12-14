<template>
  <header class="hero-header hero-header--gradient">
    <div class="hero-header__container">
      <h1 class="hero-header__title">World Water <br /> Atlas</h1>
      <p class="hero-header__intro">
        The World Water Atlas is a platform where we <br /> collect stories about water. Stories from people <br /> all over the world.
      </p>
    </div>
  </header>
</template>

<script>
export default {

}
</script>

<style>
.hero-header {
  position: absolute;
  width: 100vw;
  padding-top: 56px;
  text-align: center;
  z-index: 0;
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
  max-width: 950px;
  margin: 0 auto;
}
.hero-header__title {
  font-size: 2rem;
  font-weight: 500;
  line-height: 1;
}
.hero-header__intro {
  font-size: 0.875rem;

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
