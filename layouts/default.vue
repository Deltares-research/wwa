<template>
  <main>
    <globe-component class="globe-component" :activeMarker="activeMarker" />
    <nuxt/>
  </main>
</template>
<script src="./default-component.js">
</script>
<style>
  @import '../components/colors/colors.css';


  html {
    padding: 0;
    margin: 0;
  }
  .globe-component {
    position: fixed;
    z-index: -1;
    top:0;
  }

  .app,
  .card-list,
  .card-list-item {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    min-height: 20rem;
    max-height: 20vh;
    color: var(--ui--text--invert);
  }

  .card-list {
    box-sizing: border-box;
    padding-top: 5rem;
    z-index: -1;
  }

  .card-list-item {
    position: static;
  }
</style>
