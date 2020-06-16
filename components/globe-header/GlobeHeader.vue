<template>
  <div class="globe-header">
    <app-description class="globe-header__description" />

    <!-- TODO: add event card -->
  </div>
</template>

<script>
import AppDescription from '~/components/app-description/AppDescription';

export default {
  components: {
    AppDescription,
  },
};
</script>

<style>
.globe-header {
  position: fixed;
  top: 5.5rem;
  padding: 0 3rem;
}

@media (min-width: 600px) {
  .globe-header__description {
    display: none;
  }
}
</style>
