<template>
  <div class="layout-section globe-header">
    <div class="layout-section__container">
      <app-description class="globe-header__description" />
      <next-event-card
        v-if="highlightedEvent && !globePositionRight"
        class="globe-header__event"
        :event="highlightedEvent"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppDescription from '~/components/app-description/AppDescription';
import NextEventCard from '~/components/next-event-card/NextEventCard';

export default {
  components: {
    AppDescription, NextEventCard,
  },
  computed: {
    ...mapState(['globePositionRight', 'highlightedEvent']),
  },
};
</script>

<style>
.globe-header {
  position: fixed;
  top: var(--main-menu-height);
  width: 100%;
  background: none;
}

.globe-header__description,
.globe-header__event {
  margin: 1rem auto 0 auto;
  max-width: 290px;
}

@media (--sm-viewport) and (--vertical-viewport) {
  .globe-header {
    top: var(--main-menu-height--tall);
  }
}

@media (--md-viewport) {
  .globe-header__event {
    margin: 1rem 0 0 0;
  }

  .globe-header__description {
    display: none;
  }
}
</style>
