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
  font-size: 1rem;
  font-weight: bold;
}

@media (min-width: 600px) {
  .app-description {
    font-size: .875rem;
    font-weight: normal;
  }
}
</style>
