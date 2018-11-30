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
  height: 100vh;
}

@media only screen and (min-width: 1024px) {
.globe-container--right {
    transform: translate(33%);
  }
}

@media only screen and (min-width: 1440px) {
  .globe-container--right {
    transform: translate(25%);
  }
}

.hidden {
  display: none;
}
</style>
