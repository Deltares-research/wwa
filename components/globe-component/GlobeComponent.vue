<template>
  <div class="globe-container globe-container--right">
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
  .globe-container--right {
    width: 33vw;
    right: 0;
  }

  @media only screen and (min-width: 1024px) {
  .globe-container--right {
    width: 33vw;
  }
}

@media only screen and (min-width: 1440px) {
  .globe-container--right {
    width: 50vw;
  }
}

  .hidden {
    display: none;
  }
</style>
