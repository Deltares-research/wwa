<template>
  <main>
    <!--[if lte IE 12]>
    <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
    <![endif]-->
    <globe-component class="globe-component" :activeMarker="activeMarker" />
    <nuxt/>
  </main>
</template>
<script src="./default-component.js">
</script>
<style>
  html {
    padding: 0;
    margin: 0;
  }
  .globe-component {
    position: fixed;
    z-index: -1;
    top:0;
  }
</style>
