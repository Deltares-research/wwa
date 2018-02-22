<template>
  <div class="globe-container">
    <div class="globe">
      <div class="fallback hidden">
        <div>backup globe</div>
      </div>
    </div>
  </div>

</template>
<script src="./globe-component.js"></script>
<style scoped>
  .globe-container {
    width: 100vw;
    height: 100vh;
  }
  .hidden {
    display: none;
  }
</style>
