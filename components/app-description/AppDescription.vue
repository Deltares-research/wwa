<template>
  <div class="app-description">
    {{ description }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['description']),
  },
};
</script>

<style>
.app-description {
  padding-left: .5rem;
  border-left: 2px solid var(--orange);
  font-weight: 500;
}

@media (--sm-viewport) {
  .app-description {
    font-weight: normal;
  }
}
</style>
