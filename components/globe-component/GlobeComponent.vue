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

.globe-spacer {
  height: 75vh;
  width: 100vw;
  pointer-events: none;
}

.globe-spacer-goals {
  height: 65vh;
  width: 100vw;
  pointer-events: none;
}

.globe-spacer-influences {
  height: 65vh;
  width: 100vw;
  pointer-events: none;
}

.globe-spacer-keywords {
  height: 60vh;
  width: 100vw;
  pointer-events: none;
}

.globe-spacer-methodologies {
  height: 65vh;
  width: 100vw;
  pointer-events: none;
}

.globe-spacer-narrative {
  height: 65vh;
  width: 100vw;
  pointer-events: none;
}

.globe-spacer-theme {
  height: 65vh;
  width: 100vw;
  pointer-events: none;
}

.hidden {
  display: none;
}

@media print {
  .globe-container {
    display: none;
  }
}
</style>
