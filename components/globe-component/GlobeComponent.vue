<template>
  <div
    class="globe-container"
    aria-hidden="true"
  >
    <div class="globe" />
  </div>
</template>

<script src="./globe-component.js"></script>

<style>
.globe-container {
  width: 100vw;
  height: 100vh;
}

@media print {
  .globe-container {
    display: none;
  }
}
</style>
