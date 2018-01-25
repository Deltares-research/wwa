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
<style>
  .globe-container {
    width: 100vw;
    min-height: 50vh;
    max-height: 50vh;
  }
  .hidden {
    display: none;
  }
</style>
