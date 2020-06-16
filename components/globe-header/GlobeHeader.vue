<template>
  <div class="layout-section globe-header">
    <div class="layout-section__container">
      <app-description class="globe-header__description" />
      <next-event-card class="globe-header__event" />
    </div>
  </div>
</template>

<script>
import AppDescription from '~/components/app-description/AppDescription';
import NextEventCard from '~/components/next-event-card/NextEventCard';

export default {
  components: {
    AppDescription, NextEventCard,
  },
};
</script>

<style>
.globe-header {
  position: fixed;
  top: 4rem;
  width: 100%;
}

.globe-header__description,
.globe-header__event {
  margin: 1rem auto 0 auto;
  max-width: 290px;
}

@media (min-width: 600px) {
  .globe-header {
    top: 5rem;
  }

  .globe-header__description {
    display: none;
  }

  .globe-header__event {
    margin: 1rem 0 0 0;
  }
}
</style>
