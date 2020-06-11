<template>
  <div class="globe-container">
    <div class="globe"></div>
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
